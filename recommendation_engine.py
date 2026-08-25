import json
from pathlib import Path

from i18n import t
from weather import normalize_weather

FOODS_PATH = Path(__file__).parent / "data" / "foods.json"

ACTIVITY_MULTIPLIERS = {
    "sedentary": 1.2,
    "light": 1.375,
    "moderate": 1.55,
    "active": 1.725,
    "athlete": 1.9
}

DIET_COMPATIBILITY = {
    "vegetarian": {"vegetarian", "vegan"},
    "vegan": {"vegan"},
    "eggetarian": {"vegetarian", "vegan", "eggetarian"},
    "non_vegetarian": {"vegetarian", "vegan", "eggetarian", "non_vegetarian", "pescatarian"},
    "pescatarian": {"vegetarian", "vegan", "pescatarian"}
}


def build_plan(profile):
    normalized = _normalize_profile(profile)
    weather = normalize_weather(normalized)
    bmi = _bmi(normalized["weight_kg"], normalized["height_cm"])
    bmr = _bmr(normalized)
    tdee = round(bmr * ACTIVITY_MULTIPLIERS.get(normalized["activity_level"], 1.375))
    language = normalized["language"]
    hydration = _hydration_target(normalized, weather, language)
    foods = _rank_foods(normalized, weather, language)

    return {
        "profile": normalized,
        "weather": weather,
        "metrics": {
            "bmi": round(bmi, 1),
            "bmi_category": _bmi_category(bmi),
            "bmr_calories": round(bmr),
            "daily_energy_estimate": tdee,
            "sleep_score": _sleep_score(normalized["sleep_hours"]),
            "activity_score": _activity_score(normalized["exercise_minutes"], normalized["activity_level"])
        },
        "recommendations": {
            "hydration": {
                "title": t(language, "hydration_title"),
                "target_liters": hydration["target_liters"],
                "current_liters": normalized["water_intake_liters"],
                "progress_percent": hydration["progress_percent"],
                "message": hydration["message"]
            },
            "foods": {
                "title": t(language, "food_title"),
                "items": foods
            },
            "hygiene": {
                "title": t(language, "hygiene_title"),
                "tips": _hygiene_tips(normalized, weather, foods, language)
            },
            "activity": {
                "title": t(language, "activity_title"),
                "tips": _activity_tips(normalized, weather)
            },
            "sleep": {
                "title": t(language, "sleep_title"),
                "tips": _sleep_tips(normalized)
            },
            "weather": {
                "title": t(language, "weather_title"),
                "tips": _weather_tips(weather, language)
            },
            "disclaimer": t(language, "disclaimer")
        }
    }


def _normalize_profile(profile):
    allergies = _list(profile.get("allergies"))
    conditions = _list(profile.get("conditions"))
    return {
        "name": str(profile.get("name") or "Guest").strip(),
        "age": _num(profile.get("age"), 25, 1, 110),
        "gender": str(profile.get("gender") or "other").lower(),
        "height_cm": _num(profile.get("height_cm"), 165, 80, 230),
        "weight_kg": _num(profile.get("weight_kg"), 65, 20, 250),
        "activity_level": str(profile.get("activity_level") or "light").lower(),
        "diet": str(profile.get("diet") or "vegetarian").lower(),
        "allergies": allergies,
        "conditions": conditions,
        "sleep_hours": _num(profile.get("sleep_hours"), 7, 0, 16),
        "exercise_minutes": _num(profile.get("exercise_minutes"), 30, 0, 300),
        "water_intake_liters": _num(profile.get("water_intake_liters"), 1.5, 0, 12),
        "location": str(profile.get("location") or "Chennai").strip(),
        "temperature_c": profile.get("temperature_c"),
        "humidity": profile.get("humidity"),
        "condition": profile.get("condition"),
        "language": str(profile.get("language") or "en").lower()
    }


def _num(value, fallback, low, high):
    try:
        number = float(value)
    except (TypeError, ValueError):
        number = float(fallback)
    return max(low, min(high, number))


def _list(value):
    if not value:
        return []
    if isinstance(value, list):
        items = value
    else:
        items = str(value).replace(";", ",").split(",")
    return [item.strip().lower().replace(" ", "_") for item in items if item.strip()]


def _bmi(weight_kg, height_cm):
    height_m = height_cm / 100
    return weight_kg / (height_m * height_m)


def _bmi_category(bmi):
    if bmi < 18.5:
        return "underweight"
    if bmi < 25:
        return "healthy"
    if bmi < 30:
        return "overweight"
    return "obesity_range"


def _bmr(profile):
    base = 10 * profile["weight_kg"] + 6.25 * profile["height_cm"] - 5 * profile["age"]
    if profile["gender"] == "female":
        return base - 161
    if profile["gender"] == "male":
        return base + 5
    return base - 78


def _hydration_target(profile, weather, language):
    target = profile["weight_kg"] * 0.035
    target += profile["exercise_minutes"] * 0.012
    if profile["activity_level"] in {"active", "athlete"}:
        target += 0.35
    if weather["temperature_c"] >= 34:
        target += 0.6
    elif weather["temperature_c"] >= 30:
        target += 0.3
    if weather["humidity"] >= 70:
        target += 0.25
    if "kidney_disease" in profile["conditions"]:
        target = min(target, 2.0)

    target = round(max(1.4, min(5.0, target)), 1)
    progress = round(min(100, (profile["water_intake_liters"] / target) * 100))
    remaining = round(max(0, target - profile["water_intake_liters"]), 1)
    message = t(language, "hydration_message", target=target, remaining=remaining)
    if weather["risk_level"] == "high":
        message += t(language, "hydration_caution")
    return {"target_liters": target, "progress_percent": progress, "message": message}


def _rank_foods(profile, weather, language):
    foods = json.loads(FOODS_PATH.read_text(encoding="utf-8"))
    allowed_diets = DIET_COMPATIBILITY.get(profile["diet"], DIET_COMPATIBILITY["vegetarian"])
    ranked = []
    for food in foods:
        if not allowed_diets.intersection(food["diet"]):
            continue
        if set(profile["allergies"]).intersection(food["avoid_allergens"]):
            continue

        score = 20
        if weather["condition"] in food["weather_good_for"]:
            score += 12
        if weather["risk_level"] == "high" and "hydrating" in food["tags"]:
            score += 8
        if "diabetes" in profile["conditions"] and "low_glycemic" in food["tags"]:
            score += 12
        if "hypertension" in profile["conditions"] and "heart_friendly" in food["tags"]:
            score += 10
        if "weight_management" in profile["conditions"] and ("low_carb" in food["tags"] or "light" in food["tags"]):
            score += 10
        if profile["activity_level"] in {"active", "athlete"} and food["protein_g"] >= 20:
            score += 8
        if food["calories"] > 520 and _bmi(profile["weight_kg"], profile["height_cm"]) >= 25:
            score -= 8

        ranked.append({
            "name": t(language, f"food_{_slug(food['name'])}"),
            "score": score,
            "calories": food["calories"],
            "protein_g": food["protein_g"],
            "why": _food_reason(food, profile, weather, language),
            "hygiene": t(language, f"food_hygiene_{_slug(food['name'])}")
        })

    return sorted(ranked, key=lambda item: item["score"], reverse=True)[:4]


def _food_reason(food, profile, weather, language):
    reasons = []
    if weather["condition"] in food["weather_good_for"]:
        reasons.append(t(language, "reason_weather", condition=weather["condition"]))
    if "diabetes" in profile["conditions"] and "low_glycemic" in food["tags"]:
        reasons.append(t(language, "reason_glucose"))
    if "hypertension" in profile["conditions"] and "heart_friendly" in food["tags"]:
        reasons.append(t(language, "reason_heart"))
    if food["protein_g"] >= 20:
        reasons.append(t(language, "reason_protein"))
    return ", ".join(reasons) or t(language, "reason_balanced")


def _hygiene_tips(profile, weather, foods, language):
    tips = [
        t(language, "hygiene_basic"),
        t(language, "hygiene_storage")
    ]
    if weather["condition"] == "rainy":
        tips.append(t(language, "rainy_weather"))
    if weather["temperature_c"] >= 32:
        tips.append(t(language, "hygiene_warm"))
    if foods:
        tips.append(foods[0]["hygiene"])
    return tips


def _activity_tips(profile, weather):
    language = profile["language"]
    tips = []
    if weather["risk_level"] == "high":
        tips.append(t(language, "activity_high_heat"))
    elif weather["condition"] == "cool":
        tips.append(t(language, "activity_cool"))
    else:
        tips.append(t(language, "activity_normal"))

    if profile["exercise_minutes"] < 20:
        tips.append(t(language, "activity_low"))
    elif profile["exercise_minutes"] >= 45:
        tips.append(t(language, "activity_high"))
    return tips


def _sleep_tips(profile):
    language = profile["language"]
    if profile["sleep_hours"] < 6:
        return [t(language, "sleep_low")]
    if profile["sleep_hours"] > 9:
        return [t(language, "sleep_high")]
    return [t(language, "sleep_good")]


def _weather_tips(weather, language):
    tips = []
    if weather["condition"] == "hot":
        tips.append(t(language, "hot_weather"))
    if weather["condition"] == "humid":
        tips.append(t(language, "humid_weather"))
    if weather["condition"] == "rainy":
        tips.append(t(language, "rainy_weather"))
    if weather["condition"] == "cool":
        tips.append(t(language, "cool_weather"))
    if not tips:
        tips.append(t(language, "normal_weather"))
    return tips


def _slug(value):
    return value.lower().replace(" ", "_").replace("-", "_")


def _sleep_score(hours):
    if 7 <= hours <= 9:
        return 100
    if 6 <= hours < 7 or 9 < hours <= 10:
        return 75
    if 5 <= hours < 6:
        return 55
    return 35


def _activity_score(minutes, level):
    score = min(100, round((minutes / 45) * 70))
    if level in {"moderate", "active", "athlete"}:
        score += 20
    return min(100, score)
