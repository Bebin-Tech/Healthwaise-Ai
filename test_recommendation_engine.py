import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "backend"))

from recommendation_engine import build_plan


class RecommendationEngineTests(unittest.TestCase):
    def test_hot_weather_increases_hydration(self):
        mild = build_plan({
            "weight_kg": 70,
            "height_cm": 170,
            "exercise_minutes": 30,
            "temperature_c": 25,
            "humidity": 45,
            "condition": "normal"
        })
        hot = build_plan({
            "weight_kg": 70,
            "height_cm": 170,
            "exercise_minutes": 30,
            "temperature_c": 36,
            "humidity": 80,
            "condition": "hot"
        })
        self.assertGreater(
            hot["recommendations"]["hydration"]["target_liters"],
            mild["recommendations"]["hydration"]["target_liters"]
        )

    def test_allergy_filter_removes_foods(self):
        plan = build_plan({
            "diet": "vegetarian",
            "allergies": "dairy",
            "conditions": "hypertension"
        })
        names = [food["name"].lower() for food in plan["recommendations"]["foods"]["items"]]
        self.assertFalse(any("curd" in name or "paneer" in name for name in names))

    def test_language_falls_back_to_english(self):
        plan = build_plan({"language": "unknown"})
        self.assertEqual(plan["recommendations"]["hydration"]["title"], "Hydration plan")


if __name__ == "__main__":
    unittest.main()
