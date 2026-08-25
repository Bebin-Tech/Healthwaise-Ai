import json
from pathlib import Path

DISTRICTS_PATH = Path(__file__).parent / "data" / "tamil_nadu_districts.json"


def all_districts():
    return json.loads(DISTRICTS_PATH.read_text(encoding="utf-8"))


def district_names():
    return [item["district"] for item in all_districts()]


def find_district(name):
    if not name:
        return None
    needle = str(name).strip().lower()
    for item in all_districts():
        if item["district"].lower() == needle:
            return item
    return None


def default_district():
    return find_district("Chennai")
