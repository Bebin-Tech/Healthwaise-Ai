# HealthWise AI

HealthWise AI is a personalized daily wellness assistant based on the Innovision 2.0 PPT brief. It does not use LLMs or generative AI models. The recommendation engine uses transparent, classical AI techniques:

- rule-based expert logic
- weighted food scoring
- BMI and Mifflin-St Jeor BMR/TDEE formulas
- weather risk categorization
- hydration adjustment heuristics
- multilingual rule templates

## Features

- React frontend with a health profile form for age, gender, height, weight, activity, diet, allergies, conditions, sleep, exercise, water intake, and location
- Sidebar navigation with separate Input Details, Generated Plan, and Engine Logic modules
- Automatic navigation from the input module to the generated plan module after recommendation generation
- Searchable Tamil Nadu district location field with all 38 districts
- Automatic district-based environmental details, including temperature, humidity, rainfall, soil type, wind, UV index, air quality, agro zone, and water stress
- Custom HealthWise AI SVG logo asset
- Weather-aware recommendations using deterministic local weather estimates, with optional manual override
- Personalized hydration target and progress tracking
- Healthy food recommendations filtered by preferences, allergies, health conditions, and weather
- Food hygiene guidance
- Activity and sleep guidance
- English, Tamil, and Hindi UI content
- SQLite storage for generated plans
- No backend package installation required; React is loaded from the official UMD browser build CDN for the static frontend

## Run

```powershell
python backend/app.py
```

If `python` is not on PATH in this Codex desktop environment, use the bundled runtime:

```powershell
& "C:\Users\bbebi\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe" backend/app.py
```

Then open:

```text
http://127.0.0.1:8000
```

If port `8000` is already busy:

```powershell
$env:PORT="8001"
& "C:\Users\bbebi\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe" backend/app.py
```

## Test

```powershell
python -m unittest discover -s tests
```

Bundled-runtime alternative:

```powershell
& "C:\Users\bbebi\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe" -m unittest discover -s tests
```

## Project Structure

```text
backend/
  app.py                    API server and static file serving
  database.py               SQLite persistence
  recommendation_engine.py  Classical recommendation logic
  weather.py                Weather estimate and normalization
  i18n.py                   English/Tamil/Hindi messages
  data/foods.json           Food knowledge base
frontend/
  index.html
  styles.css
  app.js
tests/
  test_recommendation_engine.py
```

## Notes

This is a wellness guidance prototype for education and hackathon demonstration. It is not a medical diagnosis tool and should not replace professional medical advice.
