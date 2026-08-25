import json
import mimetypes
import os
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse
from urllib.parse import parse_qs

from database import init_db, recent_plans, save_plan
from environment_data import all_districts, find_district
from recommendation_engine import build_plan

ROOT = Path(__file__).resolve().parent.parent
FRONTEND = ROOT / "frontend"


class HealthWiseHandler(BaseHTTPRequestHandler):
    server_version = "HealthWiseAI/1.0"

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == "/api/health":
            self._json({"status": "ok", "service": "HealthWise AI"})
            return
        if parsed.path == "/api/plans":
            self._json({"plans": recent_plans()})
            return
        if parsed.path == "/api/districts":
            self._json({"districts": all_districts()})
            return
        if parsed.path == "/api/environment":
            query = parse_qs(parsed.query)
            district = find_district((query.get("district") or ["Chennai"])[0])
            if not district:
                self._json({"error": "District not found"}, status=404)
                return
            self._json({"environment": district})
            return
        self._static(parsed.path)

    def do_POST(self):
        parsed = urlparse(self.path)
        if parsed.path != "/api/recommend":
            self._json({"error": "Not found"}, status=404)
            return
        try:
            body = self.rfile.read(int(self.headers.get("Content-Length", 0)))
            payload = json.loads(body.decode("utf-8") or "{}")
            plan = build_plan(payload)
            plan["id"] = save_plan(plan)
            self._json(plan)
        except Exception as exc:
            self._json({"error": str(exc)}, status=400)

    def _static(self, path):
        if path in {"/", ""}:
            path = "/index.html"
        target = (FRONTEND / path.lstrip("/")).resolve()
        if FRONTEND.resolve() not in target.parents and target != FRONTEND.resolve():
            self._json({"error": "Invalid path"}, status=403)
            return
        if not target.exists() or not target.is_file():
            self._json({"error": "Not found"}, status=404)
            return
        content_type = mimetypes.guess_type(target.name)[0] or "application/octet-stream"
        data = target.read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def _json(self, payload, status=200):
        data = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)


def run(host="127.0.0.1", port=8000):
    init_db()
    httpd = ThreadingHTTPServer((host, port), HealthWiseHandler)
    print(f"HealthWise AI running at http://{host}:{port}")
    httpd.serve_forever()


if __name__ == "__main__":
    run(port=int(os.environ.get("PORT", "8000")))
