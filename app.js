const { createElement: h, useEffect, useMemo, useState } = React;

const initialProfile = {
  name: "Janakiram",
  location: "Chennai",
  age: "20",
  gender: "male",
  height_cm: "172",
  weight_kg: "68",
  activity_level: "moderate",
  diet: "vegetarian",
  allergies: "",
  conditions: "",
  sleep_hours: "7",
  exercise_minutes: "35",
  water_intake_liters: "1.2",
  condition: "",
  temperature_c: "",
  humidity: "",
  language: "en"
};

const labels = {
  en: {
    appName: "HealthWise AI",
    team: "Team Health Wings",
    demo: "Innovision 2.0 project demo",
    language: "Language",
    english: "English",
    tamil: "Tamil",
    hindi: "Hindi",
    inputNav: "Input Data",
    resultsNav: "Generated Plan",
    engineNav: "Engine Logic",
    module01: "Input Data",
    module02: "Module 02",
    reference: "Reference",
    resultsLocked: "Generate a plan to unlock results.",
    awaitingInput: "Awaiting input",
    planGenerated: "Plan generated",
    readyForLocation: location => `${location} wellness plan is ready.`,
    awaitingMessage: "Complete Module 01 to produce personalized results.",
    submit: "Generate plan",
    loading: "Generating plan...",
    inputTitle: "Health profile input",
    inputSubtitle: "Capture personal, lifestyle, food, and weather details for the rule-based wellness engine.",
    resultsTitle: "Generated wellness plan",
    resultsSubtitle: "A clear daily plan created from classical AI rules, scoring, and health formulas.",
    engineTitle: "AI engine",
    engineSubtitle: "This project uses explainable algorithms instead of LLM models.",
    emptyTitle: "No plan generated yet",
    emptySubtitle: "Complete the input module and click Generate to view personalized recommendations.",
    goInput: "Go to input module",
    planTitle: name => `${name}'s daily wellness plan`,
    planSubtitle: "Generated from health profile, lifestyle, food preference, and weather.",
    waterTarget: "water target",
    downloadReport: "Download report",
    reportFileName: name => `healthwise-report-${safeFileName(name)}.html`,
    reportGeneratedOn: "Generated on",
    generatedFor: "Generated for",
    profileSummary: "Profile summary",
    inputStep: "Enter required details",
    autoOpen: "The app will automatically open Module 02 after generation.",
    inputCoverage: "Input coverage",
    districtEnvironment: "District environment",
    autoDetected: "Automatically detected from selected Tamil Nadu district",
    oneProfile: "One profile, one daily plan",
    coverageItems: ["Personal and body metrics", "Lifestyle, sleep, and activity", "Diet preference, allergies, conditions", "Location and weather conditions"],
    personalDetails: "Personal details",
    bodyLifestyle: "Body and lifestyle",
    foodHealth: "Food and health",
    name: "Name",
    age: "Age",
    gender: "Gender",
    male: "Male",
    female: "Female",
    other: "Other",
    location: "Location",
    selectDistrict: "Select Tamil Nadu district",
    height: "Height (cm)",
    weight: "Weight (kg)",
    activityLevel: "Activity level",
    sedentary: "Sedentary",
    light: "Light",
    moderate: "Moderate",
    active: "Active",
    athlete: "Athlete",
    exercise: "Exercise today (minutes)",
    sleep: "Sleep (hours)",
    waterTaken: "Water taken (liters)",
    foodPreference: "Food preference",
    vegetarian: "Vegetarian",
    vegan: "Vegan",
    eggetarian: "Eggetarian",
    nonVegetarian: "Non-vegetarian",
    pescatarian: "Pescatarian",
    allergies: "Allergies",
    allergiesPlaceholder: "dairy, egg, fish",
    healthConditions: "Health conditions",
    conditionsPlaceholder: "diabetes, hypertension, weight management",
    weather: "Weather",
    autoEstimate: "Auto estimate",
    normal: "Normal",
    hot: "Hot",
    humid: "Humid",
    rainy: "Rainy",
    cool: "Cool",
    temperature: "Temperature (C)",
    humidity: "Humidity (%)",
    rainfall: "Rainfall",
    soilType: "Soil type",
    wind: "Wind",
    uvIndex: "UV index",
    airQuality: "Air quality",
    agroZone: "Agro zone",
    waterStress: "Water stress",
    region: "Region",
    noEnvironment: "Select a district to load environmental details.",
    rainfallUnit: value => `${value} mm/year`,
    windUnit: value => `${value} km/h`,
    bmi: "BMI",
    energy: "Energy",
    weatherRisk: "Weather risk",
    sleepScore: "Sleep score",
    kcalDay: "kcal/day estimate",
    hours: value => `${value} hours`,
    ranked: "Ranked by suitability score",
    options: count => `${count} options`,
    calories: value => `${value} kcal`,
    protein: value => `${value} g protein`,
    noDetails: "No details yet.",
    engineCards: [
      ["Profile formulas", ["BMI category", "Mifflin-St Jeor BMR", "Activity-adjusted TDEE"]],
      ["Hydration rules", ["Weight-based baseline", "Exercise adjustment", "Temperature and humidity adjustment", "Condition-aware upper cap"]],
      ["Food scoring", ["Diet compatibility", "Allergy filtering", "Condition matching", "Weather suitability"]],
      ["Weather logic", ["Location estimate", "Manual override", "Risk classification", "Advice template selection"]]
    ]
  },
  ta: {
    appName: "ஹெல்த்வைஸ் AI",
    team: "டீம் ஹெல்த் விங்ஸ்",
    demo: "இன்னோவிஷன் 2.0 திட்ட விளக்கம்",
    language: "மொழி",
    english: "ஆங்கிலம்",
    tamil: "தமிழ்",
    hindi: "இந்தி",
    inputNav: "உள்ளீட்டு தரவு",
    resultsNav: "உருவாக்கப்பட்ட திட்டம்",
    engineNav: "எஞ்சின் தர்க்கம்",
    module01: "உள்ளீட்டு தரவு",
    module02: "தொகுதி 02",
    reference: "குறிப்பு",
    resultsLocked: "முடிவுகளைத் திறக்க முதலில் திட்டத்தை உருவாக்கவும்.",
    awaitingInput: "உள்ளீடு காத்திருக்கிறது",
    planGenerated: "திட்டம் உருவாக்கப்பட்டது",
    readyForLocation: location => `${location} நலவாழ்வு திட்டம் தயாராக உள்ளது.`,
    awaitingMessage: "தனிப்பயன் முடிவுகளை உருவாக்க தொகுதி 01 ஐ நிறைவு செய்யவும்.",
    submit: "திட்டம் உருவாக்கு",
    loading: "திட்டம் உருவாக்கப்படுகிறது...",
    inputTitle: "உடல்நல சுயவிவர உள்ளீடு",
    inputSubtitle: "விதி-அடிப்படையிலான நலவாழ்வு எஞ்சினுக்காக தனிப்பட்ட, வாழ்க்கை முறை, உணவு, மற்றும் வானிலை விவரங்களை பதிவு செய்யுங்கள்.",
    resultsTitle: "உருவாக்கப்பட்ட நலவாழ்வு திட்டம்",
    resultsSubtitle: "பாரம்பரிய AI விதிகள், மதிப்பெண் கணக்கீடு, மற்றும் உடல்நல சூத்திரங்களால் உருவாக்கப்பட்ட தெளிவான தினசரி திட்டம்.",
    engineTitle: "AI எஞ்சின்",
    engineSubtitle: "இந்த திட்டம் LLM மாதிரிகளுக்கு பதிலாக விளக்கக்கூடிய அல்காரிதங்களைப் பயன்படுத்துகிறது.",
    emptyTitle: "இன்னும் திட்டம் உருவாக்கப்படவில்லை",
    emptySubtitle: "உள்ளீட்டு தொகுதியை நிரப்பி Generate ஐ அழுத்தி தனிப்பயன் பரிந்துரைகளைப் பார்க்கவும்.",
    goInput: "உள்ளீட்டு தொகுதிக்கு செல்லவும்",
    planTitle: name => `${name} அவர்களின் தினசரி நலவாழ்வு திட்டம்`,
    planSubtitle: "உடல்நல சுயவிவரம், வாழ்க்கை முறை, உணவு விருப்பம் மற்றும் வானிலை அடிப்படையில் உருவாக்கப்பட்டது.",
    waterTarget: "நீர் இலக்கு",
    downloadReport: "அறிக்கையை பதிவிறக்கு",
    reportFileName: name => `healthwise-report-${safeFileName(name)}.html`,
    reportGeneratedOn: "உருவாக்கப்பட்ட தேதி",
    generatedFor: "உருவாக்கப்பட்டது",
    profileSummary: "சுயவிவர சுருக்கம்",
    inputStep: "தேவையான விவரங்களை உள்ளிடவும்",
    autoOpen: "உருவாக்கிய பிறகு பயன்பாடு தானாக தொகுதி 02 ஐ திறக்கும்.",
    inputCoverage: "உள்ளீட்டு உள்ளடக்கம்",
    districtEnvironment: "மாவட்ட சுற்றுச்சூழல்",
    autoDetected: "தேர்ந்தெடுக்கப்பட்ட தமிழ்நாடு மாவட்டத்தின் அடிப்படையில் தானாக கண்டறியப்பட்டது",
    oneProfile: "ஒரு சுயவிவரம், ஒரு தினசரி திட்டம்",
    coverageItems: ["தனிப்பட்ட மற்றும் உடல் அளவுகள்", "வாழ்க்கை முறை, தூக்கம், மற்றும் செயற்பாடு", "உணவு விருப்பம், ஒவ்வாமைகள், உடல்நிலை", "இடம் மற்றும் வானிலை நிலைகள்"],
    personalDetails: "தனிப்பட்ட விவரங்கள்",
    bodyLifestyle: "உடல் மற்றும் வாழ்க்கை முறை",
    foodHealth: "உணவு மற்றும் உடல்நலம்",
    name: "பெயர்",
    age: "வயது",
    gender: "பாலினம்",
    male: "ஆண்",
    female: "பெண்",
    other: "மற்றவை",
    location: "இடம்",
    selectDistrict: "தமிழ்நாடு மாவட்டத்தைத் தேர்வு செய்யவும்",
    height: "உயரம் (செ.மீ)",
    weight: "எடை (கி.கி)",
    activityLevel: "செயற்பாட்டு நிலை",
    sedentary: "அசைவில்லாத",
    light: "இலகு",
    moderate: "மிதமான",
    active: "செயலில்",
    athlete: "விளையாட்டு நிலை",
    exercise: "இன்றைய உடற்பயிற்சி (நிமிடங்கள்)",
    sleep: "தூக்கம் (மணி)",
    waterTaken: "அருந்திய நீர் (லிட்டர்)",
    foodPreference: "உணவு விருப்பம்",
    vegetarian: "சைவம்",
    vegan: "வீகன்",
    eggetarian: "முட்டை சைவம்",
    nonVegetarian: "அசைவம்",
    pescatarian: "மீன் உணவு",
    allergies: "ஒவ்வாமைகள்",
    allergiesPlaceholder: "பால், முட்டை, மீன்",
    healthConditions: "உடல்நல நிலைகள்",
    conditionsPlaceholder: "சர்க்கரை நோய், உயர் இரத்த அழுத்தம், எடை மேலாண்மை",
    weather: "வானிலை",
    autoEstimate: "தானியங்கு மதிப்பீடு",
    normal: "இயல்பு",
    hot: "வெப்பம்",
    humid: "ஈரப்பதம்",
    rainy: "மழை",
    cool: "குளிர்",
    temperature: "வெப்பநிலை (C)",
    humidity: "ஈரப்பதம் (%)",
    rainfall: "மழைப்பொழிவு",
    soilType: "மண் வகை",
    wind: "காற்று",
    uvIndex: "UV குறியீடு",
    airQuality: "காற்று தரம்",
    agroZone: "வேளாண் மண்டலம்",
    waterStress: "நீர் அழுத்தம்",
    region: "பகுதி",
    noEnvironment: "சுற்றுச்சூழல் விவரங்களைப் பெற மாவட்டத்தைத் தேர்வு செய்யவும்.",
    rainfallUnit: value => `${value} mm/வருடம்`,
    windUnit: value => `${value} km/h`,
    bmi: "BMI",
    energy: "ஆற்றல்",
    weatherRisk: "வானிலை அபாயம்",
    sleepScore: "தூக்க மதிப்பெண்",
    kcalDay: "kcal/நாள் மதிப்பீடு",
    hours: value => `${value} மணி`,
    ranked: "பொருத்த மதிப்பெண் அடிப்படையில் வரிசைப்படுத்தப்பட்டது",
    options: count => `${count} விருப்பங்கள்`,
    calories: value => `${value} kcal`,
    protein: value => `${value} g புரதம்`,
    noDetails: "இன்னும் விவரங்கள் இல்லை.",
    engineCards: [
      ["சுயவிவர சூத்திரங்கள்", ["BMI வகை", "Mifflin-St Jeor BMR", "செயற்பாடு சார்ந்த TDEE"]],
      ["நீர் விதிகள்", ["எடை அடிப்படையிலான அடிப்படை", "உடற்பயிற்சி சரிசெய்தல்", "வெப்பநிலை மற்றும் ஈரப்பதம் சரிசெய்தல்", "உடல்நிலை சார்ந்த உச்ச வரம்பு"]],
      ["உணவு மதிப்பெண்", ["உணவு பொருத்தம்", "ஒவ்வாமை வடிகட்டி", "உடல்நிலை பொருத்தம்", "வானிலை பொருத்தம்"]],
      ["வானிலை தர்க்கம்", ["இட மதிப்பீடு", "கைமுறை மாற்றம்", "அபாய வகைப்படுத்தல்", "ஆலோசனை வார்ப்புரு தேர்வு"]]
    ]
  },
  hi: {
    appName: "हेल्थवाइज़ AI",
    team: "टीम हेल्थ विंग्स",
    demo: "इनोविजन 2.0 प्रोजेक्ट डेमो",
    language: "भाषा",
    english: "अंग्रेज़ी",
    tamil: "तमिल",
    hindi: "हिंदी",
    inputNav: "इनपुट डेटा",
    resultsNav: "बनी हुई योजना",
    engineNav: "इंजन लॉजिक",
    module01: "इनपुट डेटा",
    module02: "मॉड्यूल 02",
    reference: "संदर्भ",
    resultsLocked: "परिणाम देखने के लिए पहले योजना बनाएं.",
    awaitingInput: "इनपुट प्रतीक्षा में",
    planGenerated: "योजना बन गई",
    readyForLocation: location => `${location} वेलनेस योजना तैयार है.`,
    awaitingMessage: "व्यक्तिगत परिणाम बनाने के लिए मॉड्यूल 01 पूरा करें.",
    submit: "योजना बनाएं",
    loading: "योजना बन रही है...",
    inputTitle: "स्वास्थ्य प्रोफाइल इनपुट",
    inputSubtitle: "नियम-आधारित वेलनेस इंजन के लिए व्यक्तिगत, जीवनशैली, भोजन और मौसम विवरण दर्ज करें.",
    resultsTitle: "बनी हुई वेलनेस योजना",
    resultsSubtitle: "क्लासिकल AI नियमों, स्कोरिंग और स्वास्थ्य सूत्रों से बनी स्पष्ट दैनिक योजना.",
    engineTitle: "AI इंजन",
    engineSubtitle: "यह प्रोजेक्ट LLM मॉडल के बजाय समझने योग्य एल्गोरिदम का उपयोग करता है.",
    emptyTitle: "अभी कोई योजना नहीं बनी",
    emptySubtitle: "इनपुट मॉड्यूल पूरा करें और व्यक्तिगत सुझाव देखने के लिए Generate दबाएं.",
    goInput: "इनपुट मॉड्यूल पर जाएं",
    planTitle: name => `${name} की दैनिक वेलनेस योजना`,
    planSubtitle: "स्वास्थ्य प्रोफाइल, जीवनशैली, भोजन पसंद और मौसम से तैयार.",
    waterTarget: "जल लक्ष्य",
    downloadReport: "रिपोर्ट डाउनलोड करें",
    reportFileName: name => `healthwise-report-${safeFileName(name)}.html`,
    reportGeneratedOn: "बनने की तारीख",
    generatedFor: "के लिए बनाई गई",
    profileSummary: "प्रोफाइल सारांश",
    inputStep: "आवश्यक विवरण दर्ज करें",
    autoOpen: "बनने के बाद ऐप अपने आप मॉड्यूल 02 खोलेगा.",
    inputCoverage: "इनपुट कवरेज",
    districtEnvironment: "जिला पर्यावरण",
    autoDetected: "चुने गए तमिलनाडु जिले के आधार पर अपने आप पहचाना गया",
    oneProfile: "एक प्रोफाइल, एक दैनिक योजना",
    coverageItems: ["व्यक्तिगत और शरीर माप", "जीवनशैली, नींद और गतिविधि", "भोजन पसंद, एलर्जी, स्थितियां", "स्थान और मौसम स्थितियां"],
    personalDetails: "व्यक्तिगत विवरण",
    bodyLifestyle: "शरीर और जीवनशैली",
    foodHealth: "भोजन और स्वास्थ्य",
    name: "नाम",
    age: "उम्र",
    gender: "लिंग",
    male: "पुरुष",
    female: "महिला",
    other: "अन्य",
    location: "स्थान",
    selectDistrict: "तमिलनाडु जिला चुनें",
    height: "ऊंचाई (सेमी)",
    weight: "वजन (किग्रा)",
    activityLevel: "गतिविधि स्तर",
    sedentary: "कम सक्रिय",
    light: "हल्का",
    moderate: "मध्यम",
    active: "सक्रिय",
    athlete: "एथलीट",
    exercise: "आज का व्यायाम (मिनट)",
    sleep: "नींद (घंटे)",
    waterTaken: "लिया गया पानी (लीटर)",
    foodPreference: "भोजन पसंद",
    vegetarian: "शाकाहारी",
    vegan: "वीगन",
    eggetarian: "एगेटेरियन",
    nonVegetarian: "मांसाहारी",
    pescatarian: "मछली-आधारित",
    allergies: "एलर्जी",
    allergiesPlaceholder: "दूध, अंडा, मछली",
    healthConditions: "स्वास्थ्य स्थितियां",
    conditionsPlaceholder: "डायबिटीज, हाई ब्लड प्रेशर, वजन प्रबंधन",
    weather: "मौसम",
    autoEstimate: "ऑटो अनुमान",
    normal: "सामान्य",
    hot: "गर्म",
    humid: "नमी",
    rainy: "बारिश",
    cool: "ठंडा",
    temperature: "तापमान (C)",
    humidity: "नमी (%)",
    rainfall: "वर्षा",
    soilType: "मिट्टी का प्रकार",
    wind: "हवा",
    uvIndex: "UV सूचकांक",
    airQuality: "वायु गुणवत्ता",
    agroZone: "कृषि क्षेत्र",
    waterStress: "जल तनाव",
    region: "क्षेत्र",
    noEnvironment: "पर्यावरण विवरण लोड करने के लिए जिला चुनें.",
    rainfallUnit: value => `${value} mm/वर्ष`,
    windUnit: value => `${value} km/h`,
    bmi: "BMI",
    energy: "ऊर्जा",
    weatherRisk: "मौसम जोखिम",
    sleepScore: "नींद स्कोर",
    kcalDay: "kcal/दिन अनुमान",
    hours: value => `${value} घंटे`,
    ranked: "उपयुक्तता स्कोर के अनुसार क्रमबद्ध",
    options: count => `${count} विकल्प`,
    calories: value => `${value} kcal`,
    protein: value => `${value} g प्रोटीन`,
    noDetails: "अभी कोई विवरण नहीं.",
    engineCards: [
      ["प्रोफाइल सूत्र", ["BMI श्रेणी", "Mifflin-St Jeor BMR", "गतिविधि-समायोजित TDEE"]],
      ["जल सेवन नियम", ["वजन आधारित आधार", "व्यायाम समायोजन", "तापमान और नमी समायोजन", "स्थिति अनुसार ऊपरी सीमा"]],
      ["भोजन स्कोरिंग", ["डाइट संगतता", "एलर्जी फिल्टर", "स्थिति मिलान", "मौसम उपयुक्तता"]],
      ["मौसम लॉजिक", ["स्थान अनुमान", "मैनुअल ओवरराइड", "जोखिम वर्गीकरण", "सलाह टेम्पलेट चयन"]]
    ]
  }
};

const fieldGroups = [
  {
    titleKey: "personalDetails",
    fields: [
      { kind: "input", labelKey: "name", name: "name" },
      { kind: "input", labelKey: "age", name: "age", type: "number", min: "1" },
      { kind: "select", labelKey: "gender", name: "gender", options: [["male", "male"], ["female", "female"], ["other", "other"]] },
      { kind: "district", labelKey: "location", name: "location" }
    ]
  },
  {
    titleKey: "bodyLifestyle",
    fields: [
      { kind: "input", labelKey: "height", name: "height_cm", type: "number" },
      { kind: "input", labelKey: "weight", name: "weight_kg", type: "number" },
      { kind: "select", labelKey: "activityLevel", name: "activity_level", options: [["sedentary", "sedentary"], ["light", "light"], ["moderate", "moderate"], ["active", "active"], ["athlete", "athlete"]] },
      { kind: "input", labelKey: "exercise", name: "exercise_minutes", type: "number" },
      { kind: "input", labelKey: "sleep", name: "sleep_hours", type: "number", step: "0.5" },
      { kind: "input", labelKey: "waterTaken", name: "water_intake_liters", type: "number", step: "0.1" }
    ]
  },
  {
    titleKey: "foodHealth",
    fields: [
      { kind: "select", labelKey: "foodPreference", name: "diet", options: [["vegetarian", "vegetarian"], ["vegan", "vegan"], ["eggetarian", "eggetarian"], ["non_vegetarian", "nonVegetarian"], ["pescatarian", "pescatarian"]] },
      { kind: "input", labelKey: "allergies", name: "allergies", placeholderKey: "allergiesPlaceholder" },
      { kind: "input", labelKey: "healthConditions", name: "conditions", placeholderKey: "conditionsPlaceholder" }
    ]
  }
];

function App() {
  const [profile, setProfile] = useState(initialProfile);
  const [plan, setPlan] = useState(null);
  const [activeModule, setActiveModule] = useState("input");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [districts, setDistricts] = useState([]);
  const [environment, setEnvironment] = useState(null);
  const copy = labels[profile.language] || labels.en;

  const navItems = useMemo(() => [
    { id: "input", label: copy.inputNav, meta: copy.module01, icon: "home" },
    { id: "results", label: copy.resultsNav, meta: copy.module02, icon: "grid", disabled: !plan },
    { id: "engine", label: copy.engineNav, meta: copy.reference, icon: "building" }
  ], [copy, plan]);

  useEffect(() => {
    fetch("/api/districts")
      .then(response => response.json())
      .then(data => {
        setDistricts(data.districts || []);
        const selected = (data.districts || []).find(item => item.district === profile.location);
        if (selected) setEnvironment(selected);
      })
      .catch(() => setDistricts([]));
  }, []);

  useEffect(() => {
    if (!profile.location) {
      setEnvironment(null);
      return;
    }
    fetch(`/api/environment?district=${encodeURIComponent(profile.location)}`)
      .then(response => response.ok ? response.json() : Promise.reject(new Error("District not found")))
      .then(data => setEnvironment(data.environment))
      .catch(() => setEnvironment(null));
  }, [profile.location]);

  useEffect(() => {
    if (!plan) return;
    const previousLanguage = plan.profile.language;
    if (previousLanguage === profile.language) return;
    generatePlan(null, { stayOnModule: true, silent: true });
  }, [profile.language]);

  function updateField(event) {
    const { name, value } = event.target;
    setProfile(current => ({ ...current, [name]: value }));
  }

  async function generatePlan(event, options = {}) {
    if (event) event.preventDefault();
    setLoading(!options.silent);
    setError("");
    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to generate plan");
      setPlan(data);
      if (!options.stayOnModule) setActiveModule("results");
    } catch (caught) {
      setError(caught.message);
    } finally {
      setLoading(false);
    }
  }

  return h("div", { className: "layout", lang: profile.language },
    h(Sidebar, { activeModule, navItems, plan, copy, onNavigate: setActiveModule }),
    h("main", { className: "main-panel" },
      h(Header, { activeModule, copy, profile, onChange: updateField }),
      activeModule === "input" && h(InputModule, { profile, copy, loading, error, districts, environment, onChange: updateField, onSubmit: generatePlan }),
      activeModule === "results" && h(ResultsModule, { plan, copy, onBack: () => setActiveModule("input") }),
      activeModule === "engine" && h(EngineModule, { copy })
    )
  );
}

function Sidebar({ activeModule, navItems, plan, copy, onNavigate }) {
  return h("aside", { className: "sidebar" },
    h("div", { className: "brand" },
      h("img", { className: "brand-logo", src: "/assets/healthwise-logo.svg", alt: copy.appName }),
      h("div", null,
        h("p", null, copy.appName),
        h("span", null, copy.team)
      )
    ),
    h("nav", { className: "side-nav", "aria-label": copy.engineNav },
      navItems.map(item => h("button", {
        key: item.id,
        type: "button",
        className: classNames("nav-item", activeModule === item.id && "active"),
        disabled: item.disabled,
        onClick: () => !item.disabled && onNavigate(item.id)
      },
        h("span", { className: "nav-icon" }, h(NavIcon, { name: item.icon })),
        h("span", null, h("strong", null, item.label), h("small", null, item.disabled ? copy.resultsLocked : item.meta))
      ))
    ),
    h("div", { className: "sidebar-card" },
      h("span", { className: classNames("status-dot", plan && "ready") }),
      h("div", null,
        h("strong", null, plan ? copy.planGenerated : copy.awaitingInput),
        h("p", null, plan ? copy.readyForLocation(plan.weather.location) : copy.awaitingMessage)
      )
    )
  );
}

function NavIcon({ name }) {
  const common = { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" };
  if (name === "home") {
    return h("svg", common,
      h("path", { d: "M3 10.5 12 3l9 7.5" }),
      h("path", { d: "M5.5 9.5V21h13V9.5" }),
      h("path", { d: "M9.5 21v-7h5v7" })
    );
  }
  if (name === "building") {
    return h("svg", common,
      h("path", { d: "M4 21h16" }),
      h("path", { d: "M6 21V8l6-4 6 4v13" }),
      h("path", { d: "M9 21v-6h6v6" }),
      h("path", { d: "M9 10h.01" }),
      h("path", { d: "M15 10h.01" })
    );
  }
  return h("svg", common,
    h("rect", { x: "4", y: "4", width: "6", height: "6", rx: "1" }),
    h("rect", { x: "14", y: "4", width: "6", height: "6", rx: "1" }),
    h("rect", { x: "4", y: "14", width: "6", height: "6", rx: "1" }),
    h("rect", { x: "14", y: "14", width: "6", height: "6", rx: "1" })
  );
}

function Header({ activeModule, copy, profile, onChange }) {
  const content = {
    input: [copy.inputTitle, copy.inputSubtitle],
    results: [copy.resultsTitle, copy.resultsSubtitle],
    engine: [copy.engineTitle, copy.engineSubtitle]
  }[activeModule];

  return h("header", { className: "page-header" },
    h("div", null,
      h("p", { className: "eyebrow" }, copy.demo),
      h("h1", null, content[0]),
      h("p", null, content[1])
    ),
    h("label", { className: "language-control", htmlFor: "language" },
      h("span", null, copy.language),
      h("select", { id: "language", name: "language", value: profile.language, onChange },
        option("en", copy.english),
        option("ta", copy.tamil),
        option("hi", copy.hindi)
      )
    )
  );
}

function InputModule({ profile, copy, loading, error, districts, environment, onChange, onSubmit }) {
  return h("section", { className: "module-grid" },
    h("form", { className: "workflow-card", onSubmit },
      h("div", { className: "step-banner" },
        h("span", null, copy.module01),
        h("strong", null, copy.inputStep)
      ),
      fieldGroups.map(group => h("section", { className: "input-section", key: group.titleKey },
        h("h2", null, copy[group.titleKey]),
        h("div", { className: "form-grid" },
          group.fields.map(field => field.kind === "select"
            ? h(Select, { key: field.name, field, copy, value: profile[field.name], onChange })
            : field.kind === "district"
              ? h(DistrictInput, { key: field.name, field, copy, districts, value: profile[field.name], onChange })
            : h(Input, { key: field.name, field, copy, value: profile[field.name], onChange })
          )
        )
      )),
      h(EnvironmentPanel, { environment, copy, compact: true }),
      error ? h("p", { className: "error" }, error) : null,
      h("div", { className: "form-actions" },
        h("button", { className: "primary", type: "submit", disabled: loading }, loading ? copy.loading : copy.submit),
        h("p", null, copy.autoOpen)
      )
    ),
    h("aside", { className: "summary-panel" },
      h("p", { className: "eyebrow" }, copy.inputCoverage),
      h("h2", null, copy.oneProfile),
      h("ul", { className: "check-list" }, copy.coverageItems.map(item => h("li", { key: item }, item))),
      h(EnvironmentPanel, { environment, copy })
    )
  );
}

function ResultsModule({ plan, copy, onBack }) {
  if (!plan) {
    return h("section", { className: "empty-state" },
      h("div", { className: "empty-icon" }, "02"),
      h("h2", null, copy.emptyTitle),
      h("p", null, copy.emptySubtitle),
      h("button", { className: "secondary", type: "button", onClick: onBack }, copy.goInput)
    );
  }

  const hydration = plan.recommendations.hydration;
  return h("section", { className: "results-stack", "aria-live": "polite" },
    h("section", { className: "results-hero" },
      h("div", null,
        h("p", { className: "eyebrow" }, weatherLine(plan, copy)),
        h("h2", null, copy.planTitle(plan.profile.name)),
        h("p", null, copy.planSubtitle),
        h("button", { className: "download-button", type: "button", onClick: () => downloadReport(plan, copy) }, copy.downloadReport)
      ),
      h("div", { className: "water-ring large", style: { "--progress": hydration.progress_percent } },
        h("strong", null, `${hydration.target_liters} L`),
        h("span", null, copy.waterTarget)
      )
    ),
    h("div", { className: "metric-grid" },
      h(MetricCard, { label: copy.bmi, value: plan.metrics.bmi, detail: displayValue(copy, plan.metrics.bmi_category) }),
      h(MetricCard, { label: copy.energy, value: plan.metrics.daily_energy_estimate, detail: copy.kcalDay }),
      h(MetricCard, { label: copy.weatherRisk, value: displayValue(copy, plan.weather.risk_level), detail: `${plan.weather.temperature_c} C, ${plan.weather.humidity}% ${copy.humidity}` }),
      h(MetricCard, { label: copy.sleepScore, value: plan.metrics.sleep_score, detail: copy.hours(plan.profile.sleep_hours) })
    ),
    h(EnvironmentResults, { weather: plan.weather, copy }),
    h("div", { className: "recommendation-grid" },
      h(RecommendationCard, { title: hydration.title, text: hydration.message, progress: hydration.progress_percent }),
      h(ListCard, { title: plan.recommendations.activity.title, items: plan.recommendations.activity.tips, copy }),
      h(ListCard, { title: plan.recommendations.sleep.title, items: plan.recommendations.sleep.tips, copy }),
      h(ListCard, { title: plan.recommendations.weather.title, items: plan.recommendations.weather.tips, copy })
    ),
    h("section", { className: "panel" },
      h("div", { className: "section-title-row" },
        h("div", null, h("p", { className: "eyebrow" }, copy.ranked), h("h2", null, plan.recommendations.foods.title)),
        h("span", { className: "badge" }, copy.options(plan.recommendations.foods.items.length))
      ),
      h("div", { className: "food-list" },
        plan.recommendations.foods.items.map(food => h(FoodCard, { key: food.name, food, copy }))
      )
    ),
    h(ListCard, { title: plan.recommendations.hygiene.title, items: plan.recommendations.hygiene.tips, wide: true, copy }),
    h("p", { className: "disclaimer" }, plan.recommendations.disclaimer)
  );
}

function EngineModule({ copy }) {
  return h("section", { className: "engine-grid" },
    copy.engineCards.map(([title, items]) => h(EngineCard, { key: title, title, items }))
  );
}

function EnvironmentPanel({ environment, copy, compact }) {
  return h("section", { className: classNames("environment-panel", compact && "compact-env") },
    h("div", null,
      h("p", { className: "eyebrow" }, copy.districtEnvironment),
      h("h3", null, environment ? environment.district : copy.selectDistrict),
      h("p", null, environment ? copy.autoDetected : copy.noEnvironment)
    ),
    environment ? h("div", { className: "environment-grid" },
      h(EnvironmentItem, { label: copy.temperature, value: `${environment.temperature_c} C` }),
      h(EnvironmentItem, { label: copy.humidity, value: `${environment.humidity}%` }),
      h(EnvironmentItem, { label: copy.rainfall, value: copy.rainfallUnit(environment.rainfall_mm) }),
      h(EnvironmentItem, { label: copy.soilType, value: environment.soil_type }),
      h(EnvironmentItem, { label: copy.wind, value: copy.windUnit(environment.wind_kph) }),
      h(EnvironmentItem, { label: copy.uvIndex, value: environment.uv_index }),
      h(EnvironmentItem, { label: copy.airQuality, value: displayValue(copy, environment.air_quality) }),
      h(EnvironmentItem, { label: copy.waterStress, value: displayValue(copy, environment.water_stress) })
    ) : null
  );
}

function EnvironmentResults({ weather, copy }) {
  return h("section", { className: "panel" },
    h("div", { className: "section-title-row" },
      h("div", null,
        h("p", { className: "eyebrow" }, copy.autoDetected),
        h("h2", null, copy.districtEnvironment)
      ),
      h("span", { className: "badge" }, weather.district || weather.location)
    ),
    h("div", { className: "environment-grid results-env" },
      h(EnvironmentItem, { label: copy.region, value: weather.region }),
      h(EnvironmentItem, { label: copy.temperature, value: `${weather.temperature_c} C` }),
      h(EnvironmentItem, { label: copy.humidity, value: `${weather.humidity}%` }),
      h(EnvironmentItem, { label: copy.rainfall, value: copy.rainfallUnit(weather.rainfall_mm) }),
      h(EnvironmentItem, { label: copy.soilType, value: weather.soil_type }),
      h(EnvironmentItem, { label: copy.wind, value: copy.windUnit(weather.wind_kph) }),
      h(EnvironmentItem, { label: copy.uvIndex, value: weather.uv_index }),
      h(EnvironmentItem, { label: copy.airQuality, value: displayValue(copy, weather.air_quality) }),
      h(EnvironmentItem, { label: copy.agroZone, value: weather.agro_zone }),
      h(EnvironmentItem, { label: copy.waterStress, value: displayValue(copy, weather.water_stress) })
    )
  );
}

function EnvironmentItem({ label, value }) {
  return h("div", { className: "environment-item" },
    h("span", null, label),
    h("strong", null, value || "--")
  );
}

function MetricCard({ value, label, detail }) {
  return h("article", { className: "metric-card" },
    h("span", null, label),
    h("strong", null, value),
    h("small", null, detail)
  );
}

function RecommendationCard({ title, text, progress }) {
  return h("article", { className: "panel recommendation-card" },
    h("h3", null, title),
    h("p", null, text),
    typeof progress === "number" ? h("div", { className: "meter" }, h("span", { style: { width: `${progress}%` } })) : null
  );
}

function ListCard({ title, items, wide, copy }) {
  return h("article", { className: classNames("panel", wide && "wide-card") },
    h("h3", null, title),
    h("ul", null, items.length ? items.map(item => h("li", { key: item }, item)) : h("li", null, copy.noDetails))
  );
}

function FoodCard({ food, copy }) {
  return h("article", { className: "food-card" },
    h("div", { className: "score-badge" }, food.score),
    h("h3", null, food.name),
    h("p", null, food.why),
    h("div", { className: "food-meta" },
      h("span", null, copy.calories(food.calories)),
      h("span", null, copy.protein(food.protein_g))
    )
  );
}

function EngineCard({ title, items }) {
  return h("article", { className: "panel engine-card" },
    h("h2", null, title),
    h("ul", null, items.map(item => h("li", { key: item }, item)))
  );
}

function Input({ field, copy, ...props }) {
  const placeholder = field.placeholderKey ? copy[field.placeholderKey] : field.placeholder;
  return h("label", null, copy[field.labelKey], h("input", { ...props, name: field.name, type: field.type, min: field.min, step: field.step, placeholder }));
}

function Select({ field, copy, ...props }) {
  return h("label", null,
    copy[field.labelKey],
    h("select", { ...props, name: field.name }, field.options.map(([value, labelKey]) => option(value, copy[labelKey])))
  );
}

function DistrictInput({ field, copy, districts, ...props }) {
  return h("label", null,
    copy[field.labelKey],
    h("input", { ...props, name: field.name, list: "district-list", placeholder: copy.selectDistrict }),
    h("datalist", { id: "district-list" },
      districts.map(item => h("option", { key: item.district, value: item.district }))
    )
  );
}

function option(value, text) {
  return h("option", { key: value || "auto", value }, text);
}

function classNames(...names) {
  return names.filter(Boolean).join(" ");
}

function displayValue(copy, value) {
  return copy[value] || String(value).replaceAll("_", " ");
}

function weatherLine(plan, copy) {
  return `${plan.weather.location}: ${plan.weather.temperature_c} C, ${plan.weather.humidity}% ${copy.humidity} · ${displayValue(copy, plan.weather.condition)}`;
}

function downloadReport(plan, copy) {
  const html = buildReportHtml(plan, copy);
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = copy.reportFileName(plan.profile.name || "user");
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function buildReportHtml(plan, copy) {
  const generatedAt = new Date().toLocaleString();
  const metricRows = [
    [copy.bmi, `${plan.metrics.bmi} (${displayValue(copy, plan.metrics.bmi_category)})`],
    [copy.energy, `${plan.metrics.daily_energy_estimate} ${copy.kcalDay}`],
    [copy.weatherRisk, displayValue(copy, plan.weather.risk_level)],
    [copy.sleepScore, `${plan.metrics.sleep_score} (${copy.hours(plan.profile.sleep_hours)})`]
  ];
  const environmentRows = [
    [copy.location, plan.weather.district || plan.weather.location],
    [copy.region, plan.weather.region],
    [copy.temperature, `${plan.weather.temperature_c} C`],
    [copy.humidity, `${plan.weather.humidity}%`],
    [copy.rainfall, copy.rainfallUnit(plan.weather.rainfall_mm)],
    [copy.soilType, plan.weather.soil_type],
    [copy.wind, copy.windUnit(plan.weather.wind_kph)],
    [copy.uvIndex, plan.weather.uv_index],
    [copy.airQuality, displayValue(copy, plan.weather.air_quality)],
    [copy.agroZone, plan.weather.agro_zone],
    [copy.waterStress, displayValue(copy, plan.weather.water_stress)]
  ];
  const profileRows = [
    [copy.generatedFor, plan.profile.name],
    [copy.age, plan.profile.age],
    [copy.gender, displayValue(copy, plan.profile.gender)],
    [copy.height, plan.profile.height_cm],
    [copy.weight, plan.profile.weight_kg],
    [copy.activityLevel, displayValue(copy, plan.profile.activity_level)],
    [copy.foodPreference, displayValue(copy, plan.profile.diet)],
    [copy.waterTaken, plan.profile.water_intake_liters]
  ];

  return `<!doctype html>
<html lang="${escapeHtml(plan.profile.language || "en")}">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(copy.planTitle(plan.profile.name))}</title>
  <style>
    body{font-family:Arial,sans-serif;margin:0;background:#f4f7f8;color:#17211f}
    main{max-width:980px;margin:0 auto;padding:32px}
    header,section{background:white;border:1px solid #dce7e4;border-radius:8px;padding:22px;margin-bottom:18px}
    h1{font-size:34px;margin:0 0 8px} h2{font-size:22px;margin:0 0 14px} h3{margin-bottom:8px}
    p,li,td{color:#5d6a62;line-height:1.5}
    table{width:100%;border-collapse:collapse} td{border-top:1px solid #dce7e4;padding:10px 0;vertical-align:top}
    td:first-child{width:34%;font-weight:700;color:#17211f}
    .grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.card{border:1px solid #dce7e4;border-radius:8px;padding:14px}
    .badge{display:inline-block;background:#e4f3df;color:#24513b;border-radius:999px;padding:5px 9px;font-weight:700;font-size:12px}
    @media print{body{background:white}main{padding:0}header,section{break-inside:avoid}}
  </style>
</head>
<body>
  <main>
    <header>
      <span class="badge">${escapeHtml(copy.appName)}</span>
      <h1>${escapeHtml(copy.planTitle(plan.profile.name))}</h1>
      <p>${escapeHtml(copy.planSubtitle)}</p>
      <p><strong>${escapeHtml(copy.reportGeneratedOn)}:</strong> ${escapeHtml(generatedAt)}</p>
    </header>
    ${reportTable(copy.profileSummary, profileRows)}
    ${reportTable(copy.resultsTitle, metricRows)}
    ${reportTable(copy.districtEnvironment, environmentRows)}
    <section><h2>${escapeHtml(plan.recommendations.hydration.title)}</h2><p>${escapeHtml(plan.recommendations.hydration.message)}</p></section>
    ${reportList(plan.recommendations.activity.title, plan.recommendations.activity.tips)}
    ${reportList(plan.recommendations.sleep.title, plan.recommendations.sleep.tips)}
    ${reportList(plan.recommendations.weather.title, plan.recommendations.weather.tips)}
    <section><h2>${escapeHtml(plan.recommendations.foods.title)}</h2><div class="grid">${plan.recommendations.foods.items.map(food => `
      <div class="card"><h3>${escapeHtml(food.name)}</h3><p>${escapeHtml(food.why)}</p><p>${escapeHtml(copy.calories(food.calories))} · ${escapeHtml(copy.protein(food.protein_g))}</p></div>
    `).join("")}</div></section>
    ${reportList(plan.recommendations.hygiene.title, plan.recommendations.hygiene.tips)}
    <section><p>${escapeHtml(plan.recommendations.disclaimer)}</p></section>
  </main>
</body>
</html>`;
}

function reportTable(title, rows) {
  return `<section><h2>${escapeHtml(title)}</h2><table>${rows.map(([label, value]) => `
    <tr><td>${escapeHtml(label)}</td><td>${escapeHtml(value || "--")}</td></tr>
  `).join("")}</table></section>`;
}

function reportList(title, items) {
  return `<section><h2>${escapeHtml(title)}</h2><ul>${items.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section>`;
}

function safeFileName(value) {
  return String(value || "user").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "user";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

ReactDOM.createRoot(document.querySelector("#root")).render(h(App));
