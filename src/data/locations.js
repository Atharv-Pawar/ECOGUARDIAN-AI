// EcoGuardian AI - Simulated Location Presets

export const locationsData = {
  downtown: {
    id: "downtown",
    name: "Downtown - Office District",
    coordinates: [40.7128, -74.0060],
    type: "office",
    aqi: 182,
    aqiLabel: "Poor",
    pollutants: {
      pm25: 115,
      pm10: 170,
      co: 2.1,
      no2: 55,
      so2: 12
    },
    weather: {
      temp: 39,
      status: "Sunny",
      humidity: 35,
      uvIndex: 9,
      heatStress: "High Heat Stress Expected",
      windSpeed: 14
    },
    construction: {
      active: true,
      types: ["Metro Ext. Tunneling", "Road repaving on Broadway"],
      dustLevel: "High",
      noiseLevel: "Loud (82 dB)",
      duration: "Expected 3 months"
    },
    water: {
      status: "Utility Shortage Alert",
      safeToDrink: false,
      tds: 280,
      pH: 7.2,
      contaminationLevel: "Moderate (Dust sediment)",
      precautions: ["Use RO filter", "Report water line pressure drops"]
    },
    greenCover: 12, // percentage
    alerts: [
      { id: "aqi_alert", type: "danger", message: "Poor AQI (182): Wear an N95 mask outside." },
      { id: "heat_alert", type: "warning", message: "High heat stress (39°C): Avoid outdoor work 12-4 PM." },
      { id: "construction_alert", type: "warning", message: "Heavy construction dust on Broadway. Take alternate routes." }
    ],
    proactiveAlerts: [
      "You're heading to your office where AQI is Poor today. Consider wearing an N95 mask.",
      "A new construction site is active 200 meters away. Take the east entrance to avoid dust.",
      "Heat stress is expected. Stay hydrated and avoid outdoor walks between 12-4 PM."
    ]
  },
  suburbs: {
    id: "suburbs",
    name: "Green Meadows - Suburbs",
    coordinates: [40.7306, -73.9352],
    type: "home",
    aqi: 42,
    aqiLabel: "Good",
    pollutants: {
      pm25: 10,
      pm10: 15,
      co: 0.2,
      no2: 8,
      so2: 2
    },
    weather: {
      temp: 26,
      status: "Partly Cloudy",
      humidity: 50,
      uvIndex: 4,
      heatStress: "Low / Normal",
      windSpeed: 8
    },
    construction: {
      active: false,
      types: [],
      dustLevel: "Low",
      noiseLevel: "Quiet (45 dB)",
      duration: "N/A"
    },
    water: {
      status: "Excellent & Safe",
      safeToDrink: true,
      tds: 110,
      pH: 7.4,
      contaminationLevel: "None detected",
      precautions: ["Standard usage is safe"]
    },
    greenCover: 58,
    alerts: [],
    proactiveAlerts: [
      "Clean air day! The environmental conditions around your home are perfect for outdoor exercise.",
      "Local reservoirs are at 92% capacity. Water quality is rated excellent."
    ]
  },
  industrial: {
    id: "industrial",
    name: "Industrial Corridor",
    coordinates: [40.6500, -74.1500],
    type: "travel",
    aqi: 210,
    aqiLabel: "Very Poor",
    pollutants: {
      pm25: 160,
      pm10: 240,
      co: 4.8,
      no2: 95,
      so2: 45
    },
    weather: {
      temp: 34,
      status: "Hazy",
      humidity: 45,
      uvIndex: 6,
      heatStress: "Moderate",
      windSpeed: 10
    },
    construction: {
      active: true,
      types: ["Factory maintenance scaffolding", "Heavy freight transit expansion"],
      dustLevel: "High (Metallic & Particulate)",
      noiseLevel: "Very Loud (88 dB)",
      duration: "Continuous industrial noise"
    },
    water: {
      status: "Contamination Warning",
      safeToDrink: false,
      tds: 490,
      pH: 6.2,
      contaminationLevel: "High (Potential sulfate & heavy metal runoff)",
      precautions: ["DO NOT drink tap water", "Use RO filter + boil", "Use bottled water"]
    },
    greenCover: 8,
    alerts: [
      { id: "aqi_critical", type: "danger", message: "Very Poor AQI (210): Stay indoors, run air purifiers." },
      { id: "water_critical", type: "danger", message: "Water Contamination Risk: Elevated sulfates in groundwater." },
      { id: "noise_warning", type: "warning", message: "Industrial noise exceeds 85 dB. Limit exposure." }
    ],
    proactiveAlerts: [
      "AQI is Very Poor. Sensitive groups should avoid all outdoor activity. Wear an N95 mask if outdoors.",
      "Local water sample indicates elevated sulfates. Use double-filtration (RO) or bottled water.",
      "Continuous industrial noise exceeds 85 dB. Use hearing protection if outdoors near factories."
    ]
  },
  coastal: {
    id: "coastal",
    name: "Coastal Breezes Resort",
    coordinates: [40.5700, -73.9600],
    type: "vacation",
    aqi: 28,
    aqiLabel: "Excellent",
    pollutants: {
      pm25: 6,
      pm10: 12,
      co: 0.1,
      no2: 5,
      so2: 1
    },
    weather: {
      temp: 29,
      status: "Windy & Sunny",
      humidity: 78,
      uvIndex: 11,
      heatStress: "Low (Cool sea breeze)",
      windSpeed: 24
    },
    construction: {
      active: false,
      types: [],
      dustLevel: "Low",
      noiseLevel: "Moderate (58 dB - Surf & wind)",
      duration: "N/A"
    },
    water: {
      status: "Safe & Monitored",
      safeToDrink: true,
      tds: 180,
      pH: 7.8,
      contaminationLevel: "None detected",
      precautions: ["Safe for drinking"]
    },
    greenCover: 40,
    alerts: [
      { id: "uv_extreme", type: "danger", message: "Extreme UV Index (11+): Apply SPF 50+ sunscreen, wear hat." },
      { id: "flood_risk", type: "warning", message: "High tide storm surge warning. Minor coastal flooding forecast." }
    ],
    proactiveAlerts: [
      "Extreme UV index (11+). Apply SPF 50+ sunscreen and wear wide-brimmed hats.",
      "High tide at 3:30 PM with minor coastal flooding predicted. Avoid beach walks near the seawall."
    ]
  },
  wildfire: {
    id: "wildfire",
    name: "Wildfire-Adjacent Zone",
    coordinates: [40.8000, -74.3000],
    type: "travel",
    aqi: 165,
    aqiLabel: "Unhealthy",
    pollutants: {
      pm25: 82,
      pm10: 145,
      co: 3.5,
      no2: 24,
      so2: 8
    },
    weather: {
      temp: 42,
      status: "Dry & Smoky",
      humidity: 12,
      uvIndex: 10,
      heatStress: "Extreme Heatwave Alert",
      windSpeed: 18
    },
    construction: {
      active: false,
      types: [],
      dustLevel: "High (Smoke and Ash)",
      noiseLevel: "Moderate (60 dB)",
      duration: "N/A"
    },
    water: {
      status: "Ash Contamination Alert",
      safeToDrink: false,
      tds: 320,
      pH: 6.9,
      contaminationLevel: "Moderate (Suspended carbon/ash particulate)",
      precautions: ["Boil water before use", "Double-filter sediment"]
    },
    greenCover: 22,
    alerts: [
      { id: "heatwave_emergency", type: "danger", message: "Heatwave Emergency: 42°C. Dehydration risk." },
      { id: "smoke_danger", type: "danger", message: "Wildfire smoke hazard active. Close windows, run purifiers." },
      { id: "tree_loss_alert", type: "warning", message: "Locality has lost 18% tree cover in 5 years. Plant trees." }
    ],
    proactiveAlerts: [
      "Wildfire smoke hazard active. Keep all windows shut and run indoor air purifiers on high.",
      "Heatwave emergency: Temp is 42°C with dry winds. High risk of dehydration and heat stroke.",
      "Your locality has lost 18% tree cover in the last five years. Join a plantation drive this Sunday."
    ]
  }
};
