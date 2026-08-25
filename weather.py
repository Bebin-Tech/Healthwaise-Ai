from environment_data import default_district, find_district

CITY_WEATHER = {
    "chennai": {"temperature_c": 34, "humidity": 72, "condition": "humid"},
    "coimbatore": {"temperature_c": 30, "humidity": 64, "condition": "normal"},
    "madurai": {"temperature_c": 35, "humidity": 55, "condition": "hot"},
    "delhi": {"temperature_c": 33, "humidity": 48, "condition": "hot"},
    "mumbai": {"temperature_c": 31, "humidity": 78, "condition": "humid"},
    "bangalore": {"temperature_c": 27, "humidity": 58, "condition": "normal"},
    "kolkata": {"temperature_c": 32, "humidity": 75, "condition": "humid"},
    "hyderabad": {"temperature_c": 32, "humidity": 45, "condition": "normal"}
}


def normalize_weather(payload):
    location = (payload.get("location") or "Chennai").strip()
    district = find_district(location) or default_district()
    if district:
        base = {
            "temperature_c": district["temperature_c"],
            "humidity": district["humidity"],
            "condition": district["condition"]
        }
    else:
        base = None
    city_key = location.lower().split(",")[0].strip()
    base = base or CITY_WEATHER.get(city_key, {"temperature_c": 30, "humidity": 60, "condition": "normal"})

    temperature = _number(payload.get("temperature_c"), base["temperature_c"])
    humidity = _number(payload.get("humidity"), base["humidity"])
    condition = (payload.get("condition") or base["condition"]).strip().lower()

    if condition not in {"hot", "humid", "rainy", "cool", "normal"}:
        if temperature >= 34:
            condition = "hot"
        elif humidity >= 70:
            condition = "humid"
        elif temperature <= 22:
            condition = "cool"
        else:
            condition = "normal"

    result = {
        "location": location,
        "temperature_c": round(temperature, 1),
        "humidity": round(max(0, min(100, humidity)), 1),
        "condition": condition,
        "risk_level": weather_risk(temperature, humidity, condition)
    }
    if district:
        result.update({
            "district": district["district"],
            "region": district["region"],
            "rainfall_mm": district["rainfall_mm"],
            "soil_type": district["soil_type"],
            "wind_kph": district["wind_kph"],
            "uv_index": district["uv_index"],
            "air_quality": district["air_quality"],
            "agro_zone": district["agro_zone"],
            "water_stress": district["water_stress"]
        })
    return result


def weather_risk(temperature_c, humidity, condition):
    heat_index_score = 0
    if temperature_c >= 36:
        heat_index_score += 3
    elif temperature_c >= 32:
        heat_index_score += 2
    elif temperature_c >= 29:
        heat_index_score += 1

    if humidity >= 80:
        heat_index_score += 2
    elif humidity >= 65:
        heat_index_score += 1

    if condition == "rainy":
        heat_index_score += 1
    if condition == "cool":
        heat_index_score -= 1

    if heat_index_score >= 4:
        return "high"
    if heat_index_score >= 2:
        return "moderate"
    return "low"


def _number(value, fallback):
    try:
        if value in (None, ""):
            return float(fallback)
        return float(value)
    except (TypeError, ValueError):
        return float(fallback)
