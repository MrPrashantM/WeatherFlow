/**
 * WeatherFlow App — app.js (v2.0 — Full Featured)
 * Features: Mock data, Live API, Dark/Light mode, Weather sounds,
 * Temperature chart, World clock, Browser notifications, PWA, Map widget
 */

const API_KEY = 'ab44b6488cbba1ad662dbb084fd13ec2'; // Add your OpenWeatherMap API key here
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// ==================== WORLD TIMEZONE DATA ====================
const WORLD_CLOCKS = [
  { city: 'Mumbai',    flag: '🇮🇳', tz: 'Asia/Kolkata',      offset: '+5:30' },
  { city: 'London',   flag: '🇬🇧', tz: 'Europe/London',     offset: '+1:00' },
  { city: 'New York', flag: '🇺🇸', tz: 'America/New_York',  offset: '-4:00' },
  { city: 'Tokyo',    flag: '🇯🇵', tz: 'Asia/Tokyo',        offset: '+9:00' },
  { city: 'Dubai',    flag: '🇦🇪', tz: 'Asia/Dubai',        offset: '+4:00' },
  { city: 'Sydney',   flag: '🇦🇺', tz: 'Australia/Sydney',  offset: '+10:00' },
  { city: 'Paris',    flag: '🇫🇷', tz: 'Europe/Paris',      offset: '+2:00' },
];

// City coordinates for map widget
const CITY_COORDS = {
  mumbai:     { lat: 18.98,  lon: 72.83,  label: 'Mumbai, India',           coords: '18.98°N, 72.83°E' },
  london:     { lat: 51.51,  lon: -0.13,  label: 'London, United Kingdom',  coords: '51.51°N, 0.13°W' },
  tokyo:      { lat: 35.68,  lon: 139.69, label: 'Tokyo, Japan',            coords: '35.68°N, 139.69°E' },
  'new york': { lat: 40.71,  lon: -74.01, label: 'New York, USA',           coords: '40.71°N, 74.01°W' },
  dubai:      { lat: 25.20,  lon: 55.27,  label: 'Dubai, UAE',              coords: '25.20°N, 55.27°E' },
  paris:      { lat: 48.85,  lon: 2.35,   label: 'Paris, France',           coords: '48.85°N, 2.35°E' },
  sydney:     { lat: -33.87, lon: 151.21, label: 'Sydney, Australia',       coords: '33.87°S, 151.21°E' },
  delhi:      { lat: 28.61,  lon: 77.21,  label: 'New Delhi, India',        coords: '28.61°N, 77.21°E' },
  singapore:  { lat: 1.35,   lon: 103.82, label: 'Singapore',               coords: '1.35°N, 103.82°E' },
  bangkok:    { lat: 13.75,  lon: 100.52, label: 'Bangkok, Thailand',       coords: '13.75°N, 100.52°E' },
  moscow:     { lat: 55.75,  lon: 37.62,  label: 'Moscow, Russia',          coords: '55.75°N, 37.62°E' },
  berlin:     { lat: 52.52,  lon: 13.40,  label: 'Berlin, Germany',         coords: '52.52°N, 13.40°E' },
  toronto:    { lat: 43.65,  lon: -79.38, label: 'Toronto, Canada',         coords: '43.65°N, 79.38°W' },
};

// ==================== MOCK DATA ====================
const MOCK_CITIES = {
  mumbai: {
    name:'Mumbai',country:'India',flag:'🇮🇳',
    temp:34,feels:38,high:36,low:28,
    humidity:82,wind:22,windDir:'SW',pressure:1006,visibility:8,
    desc:'Hot & Humid',icon:'🌤️',condition:'sunny',
    uv:7,aqi:145,aqiLabel:'Unhealthy for Sensitive',
    sunrise:'6:04 AM',sunset:'7:52 PM',sunPos:65,
    timezone:'Asia/Kolkata',
    hourly:[
      {t:'Now',icon:'🌤️',temp:34,rain:'10%'},{t:'1 PM',icon:'☀️',temp:35,rain:'5%'},
      {t:'2 PM',icon:'☀️',temp:36,rain:'5%'},{t:'3 PM',icon:'⛅',temp:36,rain:'15%'},
      {t:'4 PM',icon:'🌦️',temp:33,rain:'40%'},{t:'5 PM',icon:'🌧️',temp:30,rain:'65%'},
      {t:'6 PM',icon:'🌧️',temp:29,rain:'70%'},{t:'7 PM',icon:'⛅',temp:30,rain:'30%'},
      {t:'8 PM',icon:'🌙',temp:29,rain:'10%'},{t:'9 PM',icon:'🌙',temp:28,rain:'5%'},
    ],
    forecast:[
      {day:'Today',icon:'🌤️',high:36,low:28,rain:'40%'},{day:'Thu',icon:'🌧️',high:31,low:26,rain:'75%'},
      {day:'Fri',icon:'⛈️',high:29,low:25,rain:'85%'},{day:'Sat',icon:'🌦️',high:30,low:26,rain:'50%'},
      {day:'Sun',icon:'⛅',high:32,low:27,rain:'20%'},
    ]
  },
  london: {
    name:'London',country:'United Kingdom',flag:'🇬🇧',
    temp:14,feels:11,high:16,low:9,
    humidity:75,wind:31,windDir:'W',pressure:1015,visibility:12,
    desc:'Overcast Clouds',icon:'☁️',condition:'cloudy',
    uv:2,aqi:45,aqiLabel:'Good',
    sunrise:'5:02 AM',sunset:'9:01 PM',sunPos:45,
    timezone:'Europe/London',
    hourly:[
      {t:'Now',icon:'☁️',temp:14,rain:'20%'},{t:'1 PM',icon:'🌦️',temp:15,rain:'35%'},
      {t:'2 PM',icon:'🌧️',temp:14,rain:'60%'},{t:'3 PM',icon:'🌧️',temp:13,rain:'65%'},
      {t:'4 PM',icon:'⛅',temp:13,rain:'25%'},{t:'5 PM',icon:'☁️',temp:12,rain:'15%'},
      {t:'6 PM',icon:'☁️',temp:11,rain:'10%'},{t:'7 PM',icon:'🌙',temp:10,rain:'5%'},
      {t:'8 PM',icon:'🌙',temp:10,rain:'5%'},{t:'9 PM',icon:'🌙',temp:9,rain:'5%'},
    ],
    forecast:[
      {day:'Today',icon:'☁️',high:16,low:9,rain:'30%'},{day:'Thu',icon:'🌧️',high:13,low:8,rain:'70%'},
      {day:'Fri',icon:'🌦️',high:14,low:8,rain:'45%'},{day:'Sat',icon:'⛅',high:17,low:10,rain:'15%'},
      {day:'Sun',icon:'☀️',high:19,low:11,rain:'5%'},
    ]
  },
  tokyo: {
    name:'Tokyo',country:'Japan',flag:'🇯🇵',
    temp:22,feels:21,high:25,low:18,
    humidity:58,wind:14,windDir:'NE',pressure:1020,visibility:15,
    desc:'Mostly Sunny',icon:'☀️',condition:'sunny',
    uv:5,aqi:38,aqiLabel:'Good',
    sunrise:'4:32 AM',sunset:'6:48 PM',sunPos:72,
    timezone:'Asia/Tokyo',
    hourly:[
      {t:'Now',icon:'☀️',temp:22,rain:'0%'},{t:'1 PM',icon:'☀️',temp:24,rain:'0%'},
      {t:'2 PM',icon:'☀️',temp:25,rain:'0%'},{t:'3 PM',icon:'⛅',temp:24,rain:'10%'},
      {t:'4 PM',icon:'⛅',temp:23,rain:'15%'},{t:'5 PM',icon:'⛅',temp:22,rain:'10%'},
      {t:'6 PM',icon:'🌙',temp:21,rain:'5%'},{t:'7 PM',icon:'🌙',temp:20,rain:'5%'},
      {t:'8 PM',icon:'🌙',temp:19,rain:'0%'},{t:'9 PM',icon:'🌙',temp:18,rain:'0%'},
    ],
    forecast:[
      {day:'Today',icon:'☀️',high:25,low:18,rain:'0%'},{day:'Thu',icon:'⛅',high:23,low:17,rain:'15%'},
      {day:'Fri',icon:'🌦️',high:20,low:16,rain:'50%'},{day:'Sat',icon:'☀️',high:24,low:17,rain:'5%'},
      {day:'Sun',icon:'☀️',high:26,low:18,rain:'0%'},
    ]
  },
  'new york': {
    name:'New York',country:'United States',flag:'🇺🇸',
    temp:19,feels:17,high:22,low:14,
    humidity:62,wind:26,windDir:'NW',pressure:1018,visibility:16,
    desc:'Partly Cloudy',icon:'⛅',condition:'cloudy',
    uv:4,aqi:55,aqiLabel:'Moderate',
    sunrise:'5:48 AM',sunset:'8:12 PM',sunPos:55,
    timezone:'America/New_York',
    hourly:[
      {t:'Now',icon:'⛅',temp:19,rain:'10%'},{t:'1 PM',icon:'⛅',temp:21,rain:'10%'},
      {t:'2 PM',icon:'☀️',temp:22,rain:'5%'},{t:'3 PM',icon:'☀️',temp:22,rain:'5%'},
      {t:'4 PM',icon:'⛅',temp:21,rain:'15%'},{t:'5 PM',icon:'🌦️',temp:19,rain:'35%'},
      {t:'6 PM',icon:'🌧️',temp:17,rain:'55%'},{t:'7 PM',icon:'🌙',temp:16,rain:'20%'},
      {t:'8 PM',icon:'🌙',temp:15,rain:'10%'},{t:'9 PM',icon:'🌙',temp:14,rain:'5%'},
    ],
    forecast:[
      {day:'Today',icon:'⛅',high:22,low:14,rain:'25%'},{day:'Thu',icon:'🌧️',high:17,low:12,rain:'70%'},
      {day:'Fri',icon:'☀️',high:21,low:13,rain:'5%'},{day:'Sat',icon:'☀️',high:23,low:15,rain:'0%'},
      {day:'Sun',icon:'⛅',high:20,low:14,rain:'20%'},
    ]
  },
  dubai: {
    name:'Dubai',country:'UAE',flag:'🇦🇪',
    temp:42,feels:47,high:44,low:35,
    humidity:35,wind:18,windDir:'N',pressure:1000,visibility:10,
    desc:'Blazing Hot',icon:'🔥',condition:'sunny',
    uv:11,aqi:88,aqiLabel:'Moderate',
    sunrise:'5:38 AM',sunset:'7:04 PM',sunPos:70,
    timezone:'Asia/Dubai',
    hourly:[
      {t:'Now',icon:'☀️',temp:42,rain:'0%'},{t:'1 PM',icon:'☀️',temp:44,rain:'0%'},
      {t:'2 PM',icon:'☀️',temp:44,rain:'0%'},{t:'3 PM',icon:'☀️',temp:43,rain:'0%'},
      {t:'4 PM',icon:'☀️',temp:41,rain:'0%'},{t:'5 PM',icon:'🌤️',temp:39,rain:'0%'},
      {t:'6 PM',icon:'🌤️',temp:37,rain:'0%'},{t:'7 PM',icon:'🌙',temp:36,rain:'0%'},
      {t:'8 PM',icon:'🌙',temp:35,rain:'0%'},{t:'9 PM',icon:'🌙',temp:35,rain:'0%'},
    ],
    forecast:[
      {day:'Today',icon:'☀️',high:44,low:35,rain:'0%'},{day:'Thu',icon:'☀️',high:43,low:34,rain:'0%'},
      {day:'Fri',icon:'☀️',high:41,low:33,rain:'0%'},{day:'Sat',icon:'🌤️',high:40,low:32,rain:'5%'},
      {day:'Sun',icon:'☀️',high:42,low:34,rain:'0%'},
    ]
  },
  paris: {
    name:'Paris',country:'France',flag:'🇫🇷',
    temp:17,feels:15,high:20,low:12,
    humidity:68,wind:19,windDir:'W',pressure:1012,visibility:14,
    desc:'Light Rain',icon:'🌦️',condition:'rainy',
    uv:3,aqi:42,aqiLabel:'Good',
    sunrise:'5:58 AM',sunset:'9:30 PM',sunPos:40,
    timezone:'Europe/Paris',
    hourly:[
      {t:'Now',icon:'🌦️',temp:17,rain:'45%'},{t:'1 PM',icon:'🌧️',temp:16,rain:'60%'},
      {t:'2 PM',icon:'🌧️',temp:15,rain:'65%'},{t:'3 PM',icon:'🌦️',temp:16,rain:'40%'},
      {t:'4 PM',icon:'⛅',temp:17,rain:'20%'},{t:'5 PM',icon:'☁️',temp:16,rain:'15%'},
      {t:'6 PM',icon:'☁️',temp:15,rain:'10%'},{t:'7 PM',icon:'🌙',temp:14,rain:'5%'},
      {t:'8 PM',icon:'🌙',temp:13,rain:'5%'},{t:'9 PM',icon:'🌙',temp:12,rain:'5%'},
    ],
    forecast:[
      {day:'Today',icon:'🌦️',high:20,low:12,rain:'60%'},{day:'Thu',icon:'⛅',high:18,low:11,rain:'25%'},
      {day:'Fri',icon:'☀️',high:22,low:13,rain:'5%'},{day:'Sat',icon:'☀️',high:24,low:14,rain:'0%'},
      {day:'Sun',icon:'⛅',high:21,low:13,rain:'15%'},
    ]
  },
  sydney: {
    name:'Sydney',country:'Australia',flag:'🇦🇺',
    temp:18,feels:16,high:21,low:13,
    humidity:65,wind:23,windDir:'SE',pressure:1022,visibility:20,
    desc:'Clear Skies',icon:'☀️',condition:'sunny',
    uv:6,aqi:28,aqiLabel:'Good',
    sunrise:'6:48 AM',sunset:'5:02 PM',sunPos:35,
    timezone:'Australia/Sydney',
    hourly:[
      {t:'Now',icon:'☀️',temp:18,rain:'0%'},{t:'1 PM',icon:'☀️',temp:20,rain:'0%'},
      {t:'2 PM',icon:'☀️',temp:21,rain:'0%'},{t:'3 PM',icon:'⛅',temp:20,rain:'10%'},
      {t:'4 PM',icon:'⛅',temp:19,rain:'10%'},{t:'5 PM',icon:'🌙',temp:17,rain:'5%'},
      {t:'6 PM',icon:'🌙',temp:16,rain:'0%'},{t:'7 PM',icon:'🌙',temp:15,rain:'0%'},
      {t:'8 PM',icon:'🌙',temp:14,rain:'0%'},{t:'9 PM',icon:'🌙',temp:13,rain:'0%'},
    ],
    forecast:[
      {day:'Today',icon:'☀️',high:21,low:13,rain:'0%'},{day:'Thu',icon:'☀️',high:22,low:14,rain:'0%'},
      {day:'Fri',icon:'⛅',high:20,low:13,rain:'15%'},{day:'Sat',icon:'🌦️',high:17,low:12,rain:'50%'},
      {day:'Sun',icon:'☀️',high:20,low:13,rain:'5%'},
    ]
  },
  delhi: {
    name:'New Delhi',country:'India',flag:'🇮🇳',
    temp:38,feels:43,high:40,low:30,
    humidity:40,wind:15,windDir:'NW',pressure:1002,visibility:6,
    desc:'Hot & Hazy',icon:'🌫️',condition:'foggy',
    uv:9,aqi:195,aqiLabel:'Unhealthy',
    sunrise:'5:28 AM',sunset:'7:12 PM',sunPos:60,
    timezone:'Asia/Kolkata',
    hourly:[
      {t:'Now',icon:'🌫️',temp:38,rain:'0%'},{t:'1 PM',icon:'☀️',temp:40,rain:'0%'},
      {t:'2 PM',icon:'☀️',temp:40,rain:'0%'},{t:'3 PM',icon:'☀️',temp:39,rain:'0%'},
      {t:'4 PM',icon:'🌤️',temp:37,rain:'5%'},{t:'5 PM',icon:'🌤️',temp:35,rain:'5%'},
      {t:'6 PM',icon:'🌙',temp:33,rain:'0%'},{t:'7 PM',icon:'🌙',temp:32,rain:'0%'},
      {t:'8 PM',icon:'🌙',temp:31,rain:'0%'},{t:'9 PM',icon:'🌙',temp:30,rain:'0%'},
    ],
    forecast:[
      {day:'Today',icon:'🌫️',high:40,low:30,rain:'0%'},{day:'Thu',icon:'☀️',high:41,low:31,rain:'0%'},
      {day:'Fri',icon:'⛈️',high:35,low:27,rain:'60%'},{day:'Sat',icon:'🌦️',high:33,low:26,rain:'45%'},
      {day:'Sun',icon:'⛅',high:36,low:28,rain:'15%'},
    ]
  },
  singapore: {
    name:'Singapore',country:'Singapore',flag:'🇸🇬',
    temp:30,feels:35,high:32,low:26,
    humidity:88,wind:12,windDir:'S',pressure:1009,visibility:10,
    desc:'Tropical & Humid',icon:'🌦️',condition:'rainy',
    uv:8,aqi:52,aqiLabel:'Moderate',
    sunrise:'6:58 AM',sunset:'7:08 PM',sunPos:50,
    timezone:'Asia/Singapore',
    hourly:[
      {t:'Now',icon:'🌦️',temp:30,rain:'55%'},{t:'1 PM',icon:'🌧️',temp:29,rain:'70%'},
      {t:'2 PM',icon:'⛈️',temp:28,rain:'80%'},{t:'3 PM',icon:'🌦️',temp:29,rain:'45%'},
      {t:'4 PM',icon:'⛅',temp:30,rain:'20%'},{t:'5 PM',icon:'☁️',temp:29,rain:'15%'},
      {t:'6 PM',icon:'🌙',temp:28,rain:'10%'},{t:'7 PM',icon:'🌙',temp:27,rain:'5%'},
      {t:'8 PM',icon:'🌙',temp:27,rain:'5%'},{t:'9 PM',icon:'🌙',temp:26,rain:'0%'},
    ],
    forecast:[
      {day:'Today',icon:'🌦️',high:32,low:26,rain:'60%'},{day:'Thu',icon:'⛈️',high:30,low:25,rain:'75%'},
      {day:'Fri',icon:'🌦️',high:31,low:25,rain:'50%'},{day:'Sat',icon:'⛅',high:32,low:26,rain:'25%'},
      {day:'Sun',icon:'☀️',high:33,low:26,rain:'10%'},
    ]
  },
  bangkok: {
    name:'Bangkok',country:'Thailand',flag:'🇹🇭',
    temp:33,feels:39,high:35,low:27,
    humidity:76,wind:10,windDir:'SE',pressure:1005,visibility:9,
    desc:'Hot & Humid',icon:'☀️',condition:'sunny',
    uv:9,aqi:72,aqiLabel:'Moderate',
    sunrise:'5:52 AM',sunset:'6:28 PM',sunPos:62,
    timezone:'Asia/Bangkok',
    hourly:[
      {t:'Now',icon:'☀️',temp:33,rain:'5%'},{t:'1 PM',icon:'☀️',temp:35,rain:'5%'},
      {t:'2 PM',icon:'⛅',temp:35,rain:'15%'},{t:'3 PM',icon:'🌦️',temp:33,rain:'40%'},
      {t:'4 PM',icon:'🌧️',temp:30,rain:'65%'},{t:'5 PM',icon:'🌦️',temp:29,rain:'35%'},
      {t:'6 PM',icon:'🌙',temp:28,rain:'10%'},{t:'7 PM',icon:'🌙',temp:28,rain:'5%'},
      {t:'8 PM',icon:'🌙',temp:27,rain:'5%'},{t:'9 PM',icon:'🌙',temp:27,rain:'0%'},
    ],
    forecast:[
      {day:'Today',icon:'☀️',high:35,low:27,rain:'20%'},{day:'Thu',icon:'⛅',high:33,low:26,rain:'35%'},
      {day:'Fri',icon:'🌦️',high:31,low:25,rain:'55%'},{day:'Sat',icon:'☀️',high:34,low:26,rain:'10%'},
      {day:'Sun',icon:'☀️',high:35,low:27,rain:'5%'},
    ]
  },
  moscow: {
    name:'Moscow',country:'Russia',flag:'🇷🇺',
    temp:-2,feels:-8,high:1,low:-5,
    humidity:80,wind:20,windDir:'NE',pressure:1028,visibility:8,
    desc:'Light Snow',icon:'❄️',condition:'snowy',
    uv:1,aqi:30,aqiLabel:'Good',
    sunrise:'7:22 AM',sunset:'5:48 PM',sunPos:30,
    timezone:'Europe/Moscow',
    hourly:[
      {t:'Now',icon:'❄️',temp:-2,rain:'30%'},{t:'1 PM',icon:'🌨️',temp:-1,rain:'40%'},
      {t:'2 PM',icon:'❄️',temp:-1,rain:'35%'},{t:'3 PM',icon:'☁️',temp:0,rain:'15%'},
      {t:'4 PM',icon:'☁️',temp:-1,rain:'10%'},{t:'5 PM',icon:'🌙',temp:-3,rain:'5%'},
      {t:'6 PM',icon:'🌙',temp:-4,rain:'5%'},{t:'7 PM',icon:'🌙',temp:-4,rain:'0%'},
      {t:'8 PM',icon:'🌙',temp:-5,rain:'0%'},{t:'9 PM',icon:'🌙',temp:-5,rain:'0%'},
    ],
    forecast:[
      {day:'Today',icon:'❄️',high:1,low:-5,rain:'35%'},{day:'Thu',icon:'🌨️',high:0,low:-6,rain:'50%'},
      {day:'Fri',icon:'☁️',high:2,low:-4,rain:'15%'},{day:'Sat',icon:'⛅',high:4,low:-2,rain:'10%'},
      {day:'Sun',icon:'☀️',high:5,low:-1,rain:'0%'},
    ]
  },
  berlin: {
    name:'Berlin',country:'Germany',flag:'🇩🇪',
    temp:12,feels:9,high:15,low:7,
    humidity:70,wind:24,windDir:'W',pressure:1016,visibility:13,
    desc:'Windy & Cloudy',icon:'💨',condition:'windy',
    uv:3,aqi:35,aqiLabel:'Good',
    sunrise:'5:30 AM',sunset:'9:10 PM',sunPos:48,
    timezone:'Europe/Berlin',
    hourly:[
      {t:'Now',icon:'💨',temp:12,rain:'15%'},{t:'1 PM',icon:'⛅',temp:14,rain:'10%'},
      {t:'2 PM',icon:'☀️',temp:15,rain:'5%'},{t:'3 PM',icon:'⛅',temp:14,rain:'15%'},
      {t:'4 PM',icon:'☁️',temp:13,rain:'25%'},{t:'5 PM',icon:'🌦️',temp:12,rain:'40%'},
      {t:'6 PM',icon:'🌙',temp:10,rain:'15%'},{t:'7 PM',icon:'🌙',temp:9,rain:'5%'},
      {t:'8 PM',icon:'🌙',temp:8,rain:'5%'},{t:'9 PM',icon:'🌙',temp:7,rain:'0%'},
    ],
    forecast:[
      {day:'Today',icon:'💨',high:15,low:7,rain:'20%'},{day:'Thu',icon:'🌧️',high:12,low:6,rain:'65%'},
      {day:'Fri',icon:'⛅',high:14,low:7,rain:'20%'},{day:'Sat',icon:'☀️',high:18,low:9,rain:'5%'},
      {day:'Sun',icon:'☀️',high:20,low:10,rain:'0%'},
    ]
  },
  toronto: {
    name:'Toronto',country:'Canada',flag:'🇨🇦',
    temp:8,feels:4,high:11,low:3,
    humidity:72,wind:28,windDir:'NW',pressure:1014,visibility:14,
    desc:'Cool & Breezy',icon:'⛅',condition:'cloudy',
    uv:3,aqi:22,aqiLabel:'Good',
    sunrise:'6:02 AM',sunset:'8:28 PM',sunPos:50,
    timezone:'America/Toronto',
    hourly:[
      {t:'Now',icon:'⛅',temp:8,rain:'10%'},{t:'1 PM',icon:'☀️',temp:10,rain:'5%'},
      {t:'2 PM',icon:'☀️',temp:11,rain:'0%'},{t:'3 PM',icon:'⛅',temp:11,rain:'10%'},
      {t:'4 PM',icon:'⛅',temp:10,rain:'15%'},{t:'5 PM',icon:'☁️',temp:8,rain:'25%'},
      {t:'6 PM',icon:'🌙',temp:7,rain:'10%'},{t:'7 PM',icon:'🌙',temp:6,rain:'5%'},
      {t:'8 PM',icon:'🌙',temp:5,rain:'0%'},{t:'9 PM',icon:'🌙',temp:3,rain:'0%'},
    ],
    forecast:[
      {day:'Today',icon:'⛅',high:11,low:3,rain:'15%'},{day:'Thu',icon:'🌧️',high:9,low:2,rain:'60%'},
      {day:'Fri',icon:'☀️',high:13,low:4,rain:'5%'},{day:'Sat',icon:'☀️',high:15,low:5,rain:'0%'},
      {day:'Sun',icon:'⛅',high:12,low:4,rain:'20%'},
    ]
  }
};

const SUGGESTIONS = [
  'Mumbai','London','Tokyo','New York','Dubai','Paris','Sydney',
  'Delhi','Singapore','Bangkok','Moscow','Berlin','Toronto'
];

// ==================== STATE ====================
let currentData = null;
let isCelsius = true;
let isDarkMode = true;
let isSoundEnabled = true;
let notifEnabled = false;
let currentCity = 'Mumbai';
let cityTimezone = 'Asia/Kolkata';
let cityClockInterval = null;
let worldClockInterval = null;
let chartCanvas = null;
let chartCtx = null;
let audioCtx = null;
let soundNodes = {};
let pwaInstallPrompt = null;

// ==================== DOM HELPER ====================
const el = id => document.getElementById(id);

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
  setupClock();
  setupSearch();
  setupEvents();
  setupPWA();
  setupAudioContext();
  createStars();
  renderWorldClocks();
  loadCity('mumbai');
});

// ==================== LOCAL CLOCK ====================
function setupClock() {
  function update() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    el('timeDisplay').textContent = `${h}:${m}`;
  }
  update();
  setInterval(update, 10000);
}

// ==================== CITY LOCAL CLOCK ====================
function startCityClockTick(timezone) {
  if (cityClockInterval) clearInterval(cityClockInterval);
  function updateCityClock() {
    try {
      const now = new Date();
      const fmt = now.toLocaleTimeString('en-US', { timeZone: timezone, hour: '2-digit', minute: '2-digit', hour12: true });
      el('cityClockTime').textContent = fmt;
    } catch(e) {
      el('cityClockTime').textContent = '--:--';
    }
  }
  updateCityClock();
  cityClockInterval = setInterval(updateCityClock, 10000);
}

// ==================== WORLD CLOCKS ====================
function renderWorldClocks() {
  const row = el('worldClocksRow');
  row.innerHTML = WORLD_CLOCKS.map(wc => `
    <div class="world-clock-item" onclick="loadCity('${wc.city.toLowerCase()}')">
      <div class="world-clock-flag">${wc.flag}</div>
      <div class="world-clock-city">${wc.city}</div>
      <div class="world-clock-time" id="wc-${wc.city.toLowerCase().replace(' ','')}">--:--</div>
      <div class="world-clock-offset">UTC ${wc.offset}</div>
    </div>
  `).join('');

  function tick() {
    WORLD_CLOCKS.forEach(wc => {
      try {
        const now = new Date();
        const fmt = now.toLocaleTimeString('en-US', {timeZone: wc.tz, hour:'2-digit', minute:'2-digit', hour12:true});
        const elem = el(`wc-${wc.city.toLowerCase().replace(' ','')}`);
        if (elem) elem.textContent = fmt;
      } catch(e) {}
    });
  }
  tick();
  if (worldClockInterval) clearInterval(worldClockInterval);
  worldClockInterval = setInterval(tick, 10000);
}

// ==================== STARS ====================
function createStars() {
  const container = el('starsContainer');
  container.innerHTML = '';
  for (let i = 0; i < 80; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 3 + 1;
    star.style.cssText = `
      width:${size}px;height:${size}px;
      left:${Math.random()*100}%;top:${Math.random()*100}%;
      animation-duration:${Math.random()*3+2}s;
      animation-delay:${Math.random()*4}s;
    `;
    container.appendChild(star);
  }
}

// ==================== AUDIO ENGINE ====================
function setupAudioContext() {
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  } catch(e) { audioCtx = null; }
}

function playWeatherSound(condition) {
  if (!isSoundEnabled || !audioCtx) return;
  stopAllSounds();
  try {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    if (condition === 'rainy' || condition === 'stormy') playRainSound(condition === 'stormy');
    else if (condition === 'windy') playWindSound();
    else if (condition === 'snowy') playWindSound(true);
    else if (condition === 'sunny') playBirdsSound();
  } catch(e) {}
}

function playRainSound(heavy = false) {
  if (!audioCtx) return;
  const bufferSize = 4096;
  const noise = audioCtx.createScriptProcessor(bufferSize, 1, 1);
  noise.onaudioprocess = e => {
    const output = e.outputBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) output[i] = Math.random() * 2 - 1;
  };
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = heavy ? 600 : 400;
  filter.Q.value = 0.5;
  const gainNode = audioCtx.createGain();
  gainNode.gain.value = heavy ? 0.08 : 0.04;
  noise.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  soundNodes.rain = { noise, filter, gainNode };
}

function playWindSound() {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  osc.type = 'sine';
  osc.frequency.value = 80;
  const gainNode = audioCtx.createGain();
  gainNode.gain.value = 0;
  gainNode.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 2);
  const lfo = audioCtx.createOscillator();
  lfo.frequency.value = 0.3;
  const lfoGain = audioCtx.createGain();
  lfoGain.gain.value = 30;
  lfo.connect(lfoGain);
  lfoGain.connect(osc.frequency);
  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  osc.start(); lfo.start();
  soundNodes.wind = { osc, gainNode, lfo };
}

function playBirdsSound() {
  if (!audioCtx) return;
  function chirp() {
    if (!isSoundEnabled) return;
    try {
      const osc = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 800 + Math.random() * 400;
      osc.frequency.linearRampToValueAtTime(osc.frequency.value + 200, audioCtx.currentTime + 0.1);
      g.gain.value = 0;
      g.gain.linearRampToValueAtTime(0.03, audioCtx.currentTime + 0.05);
      g.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.2);
      osc.connect(g); g.connect(audioCtx.destination);
      osc.start(); osc.stop(audioCtx.currentTime + 0.25);
    } catch(e) {}
    soundNodes.birdTimer = setTimeout(chirp, 1500 + Math.random() * 3000);
  }
  chirp();
}

function stopAllSounds() {
  try {
    if (soundNodes.rain) {
      soundNodes.rain.noise.disconnect();
      soundNodes.rain.gainNode.disconnect();
    }
    if (soundNodes.wind) {
      soundNodes.wind.osc.stop();
      soundNodes.wind.lfo.stop();
    }
    if (soundNodes.birdTimer) clearTimeout(soundNodes.birdTimer);
  } catch(e) {}
  soundNodes = {};
}

// ==================== SEARCH ====================
function setupSearch() {
  const input = el('searchInput');
  const box = el('suggestionsBox');

  input.addEventListener('input', () => {
    const val = input.value.trim().toLowerCase();
    if (!val) { box.style.display = 'none'; return; }
    const matches = SUGGESTIONS.filter(c => c.toLowerCase().startsWith(val));
    if (!matches.length) { box.style.display = 'none'; return; }
    box.innerHTML = matches.map(c => `
      <div class="suggestion-item" onclick="selectSuggestion('${c}')">
        <span>📍</span><span>${c}</span>
      </div>
    `).join('');
    box.style.display = 'block';
  });
  input.addEventListener('keydown', e => { if (e.key === 'Enter') triggerSearch(); });
  document.addEventListener('click', e => { if (!e.target.closest('.search-section')) box.style.display = 'none'; });
}

function selectSuggestion(city) {
  el('searchInput').value = city;
  el('suggestionsBox').style.display = 'none';
  loadCity(city.toLowerCase());
}

function triggerSearch() {
  const val = el('searchInput').value.trim().toLowerCase();
  if (!val) return;
  el('suggestionsBox').style.display = 'none';
  if (API_KEY) fetchLiveWeather(val);
  else loadCity(val);
}

// ==================== EVENTS ====================
function setupEvents() {
  el('searchBtn').addEventListener('click', triggerSearch);
  el('unitToggle').addEventListener('click', toggleUnit);
  el('locationBtn').addEventListener('click', getLocation);
  el('themeBtn').addEventListener('click', toggleTheme);
  el('soundBtn').addEventListener('click', toggleSound);
  el('notifBtn').addEventListener('click', toggleNotifications);
}

function toggleUnit() {
  isCelsius = !isCelsius;
  el('unitToggle').textContent = isCelsius ? '°C' : '°F';
  if (currentData) renderWeather(currentData);
}

function toggleTheme() {
  isDarkMode = !isDarkMode;
  document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  el('themeBtn').textContent = isDarkMode ? '🌙' : '☀️';
  el('themeBtn').classList.toggle('active', !isDarkMode);
  showToast(isDarkMode ? '🌙 Dark mode on' : '☀️ Light mode on');
}

function toggleSound() {
  isSoundEnabled = !isSoundEnabled;
  el('soundBtn').classList.toggle('muted', !isSoundEnabled);
  el('soundBtn').textContent = isSoundEnabled ? '🔊' : '🔇';
  if (!isSoundEnabled) stopAllSounds();
  else if (currentData) playWeatherSound(currentData.condition);
  showToast(isSoundEnabled ? '🔊 Sound on' : '🔇 Sound off');
}

function toggleNotifications() {
  if (!('Notification' in window)) { showToast('Notifications not supported'); return; }
  if (Notification.permission === 'granted') {
    notifEnabled = !notifEnabled;
    el('notifBtn').classList.toggle('active', notifEnabled);
    showToast(notifEnabled ? '🔔 Weather alerts enabled!' : '🔕 Alerts disabled');
    if (notifEnabled && currentData) checkWeatherAlert(currentData);
  } else {
    Notification.requestPermission().then(perm => {
      if (perm === 'granted') {
        notifEnabled = true;
        el('notifBtn').classList.add('active');
        showToast('🔔 Weather alerts enabled!');
        if (currentData) checkWeatherAlert(currentData);
      } else {
        showToast('Permission denied for notifications');
      }
    });
  }
}

function checkWeatherAlert(d) {
  if (!notifEnabled) return;
  let alertMsg = null;
  if (d.condition === 'stormy') alertMsg = `⛈️ Storm alert in ${d.name}! Stay indoors.`;
  else if (d.aqi > 150) alertMsg = `😷 Poor air quality in ${d.name}. AQI: ${d.aqi}`;
  else if (d.uv >= 8) alertMsg = `☀️ Extreme UV in ${d.name}! UV Index: ${d.uv}`;
  else if (d.temp >= 40) alertMsg = `🔥 Heat alert! ${d.temp}°C in ${d.name}. Stay hydrated.`;
  else if (d.condition === 'rainy') alertMsg = `🌧️ Rain expected in ${d.name}. Carry an umbrella!`;

  if (alertMsg && Notification.permission === 'granted') {
    new Notification('WeatherFlow Alert 🌊', { body: alertMsg, icon: '🌊' });
  }
}

function getLocation() {
  if (!navigator.geolocation) { showToast('Geolocation not supported'); return; }
  showLoading(true);
  navigator.geolocation.getCurrentPosition(
    pos => {
      if (API_KEY) fetchByCoords(pos.coords.latitude, pos.coords.longitude);
      else {
        showLoading(false);
        showToast('📍 Demo mode: Showing Mumbai (add API key for live location)');
        loadCity('mumbai');
      }
    },
    () => { showLoading(false); showToast('📍 Location access denied'); }
  );
}

// ==================== PWA ====================
function setupPWA() {
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    pwaInstallPrompt = e;
    el('pwaInstall').style.display = 'block';
    el('installBtn').addEventListener('click', () => {
      pwaInstallPrompt.prompt();
      pwaInstallPrompt.userChoice.then(result => {
        if (result.outcome === 'accepted') {
          el('pwaInstall').style.display = 'none';
          showToast('✅ App installed successfully!');
        }
        pwaInstallPrompt = null;
      });
    });
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
}

// ==================== LOAD CITY ====================
function loadCity(cityKey) {
  const key = cityKey.toLowerCase().trim();
  showLoading(true);
  if (API_KEY) { fetchLiveWeather(key); return; }

  setTimeout(() => {
    let data = MOCK_CITIES[key];
    if (!data) {
      const match = Object.keys(MOCK_CITIES).find(k => k.includes(key) || key.includes(k));
      data = match ? MOCK_CITIES[match] : null;
    }
    if (!data) {
      showLoading(false);
      showToast(`"${cityKey}" not in demo. Try: Mumbai, London, Tokyo, Dubai, Delhi, Singapore, Moscow…`);
      return;
    }
    showLoading(false);
    currentData = data;
    currentCity = data.name;
    cityTimezone = data.timezone || 'UTC';
    renderWeather(data);
    updateMap(key);
    startCityClockTick(cityTimezone);
    if (notifEnabled) checkWeatherAlert(data);
    playWeatherSound(data.condition);
  }, 600);
}

// ==================== UPDATE MAP ====================
function updateMap(cityKey) {
  const info = CITY_COORDS[cityKey];
  if (!info) {
    el('mapLabel').textContent = currentCity;
    el('mapCoords').textContent = '';
    return;
  }
  el('mapLabel').textContent = info.label;
  el('mapCoords').textContent = info.coords;
}

// ==================== RENDER ====================
function renderWeather(d) {
  const toF = c => Math.round(c * 9/5 + 32);
  const temp  = isCelsius ? d.temp  : toF(d.temp);
  const feels = isCelsius ? d.feels : toF(d.feels);
  const high  = isCelsius ? d.high  : toF(d.high);
  const low   = isCelsius ? d.low   : toF(d.low);
  const unit  = isCelsius ? '°C' : '°F';

  el('cityName').textContent = d.name;
  el('countryName').textContent = `${d.country} ${d.flag}`;
  el('dateDisplay').textContent = formatDate();
  el('weatherDesc').textContent = d.desc;
  el('feelsLike').textContent = `Feels like ${feels}${unit}`;

  animateNumber('tempValue', parseInt(el('tempValue').textContent) || 0, temp, 800);
  el('tempUnit').textContent = unit;
  el('tempHigh').textContent = `↑ ${high}°`;
  el('tempLow').textContent = `↓ ${low}°`;
  el('weatherIconLarge').textContent = d.icon;

  el('humidityVal').textContent = `${d.humidity}%`;
  el('humidityBar').style.width = `${d.humidity}%`;
  el('windVal').textContent = `${d.wind} km/h`;
  el('windDirText').textContent = d.windDir;
  el('pressureVal').textContent = `${d.pressure} hPa`;
  el('visibilityVal').textContent = `${d.visibility} km`;

  const dirs = {N:0,NE:45,E:90,SE:135,S:180,SW:225,W:270,NW:315};
  el('compassNeedle').style.transform = `rotate(${dirs[d.windDir]||0}deg)`;

  const pressureAngle = ((d.pressure - 960) / 80) * 90 - 45;
  el('gaugeNeedle').style.transform = `translateX(-50%) rotate(${Math.min(Math.max(pressureAngle,-85),85)}deg)`;

  const visDots = Math.min(Math.round(d.visibility / 5), 5);
  el('visibilityDots').innerHTML = Array.from({length:5},(_,i) =>
    `<div class="vis-dot ${i < visDots ? 'active' : ''}"></div>`
  ).join('');

  const uvPct = Math.min(d.uv / 12, 1) * 100;
  el('uvFill').style.left = `${uvPct}%`;
  el('uvFill').style.right = '0';
  el('uvThumb').style.left = `${uvPct}%`;
  const uvLabels = ['','Low','Low','Moderate','Moderate','High','High','Very High','Very High','Extreme','Extreme','Extreme','Extreme'];
  el('uvValue').textContent = `UV ${d.uv} — ${uvLabels[Math.min(d.uv,12)]}`;

  const sx = 10 + (d.sunPos / 100) * 180;
  const sy = 100 - Math.sin((d.sunPos / 100) * Math.PI) * 90;
  el('sunDot').setAttribute('cx', sx);
  el('sunDot').setAttribute('cy', sy);
  el('sunriseVal').textContent = d.sunrise;
  el('sunsetVal').textContent = d.sunset;

  const aqiColor = d.aqi <= 50 ? '#81c784' : d.aqi <= 100 ? '#ffb74d' : d.aqi <= 150 ? '#ef9a9a' : '#e57373';
  el('aqiNumber').textContent = d.aqi;
  el('aqiStatus').textContent = d.aqiLabel;
  el('aqiCircle').style.borderColor = aqiColor;
  el('aqiCircle').style.background = `${aqiColor}22`;
  el('aqiStatus').style.color = aqiColor;
  const aqiDescs = { Good:'Excellent air quality 😊', Moderate:'Acceptable air quality', 'Unhealthy for Sensitive':'Sensitive groups affected 😷', Unhealthy:'Unhealthy for all 😷', 'Very Unhealthy':'Very unhealthy ⚠️' };
  el('aqiDesc').textContent = aqiDescs[d.aqiLabel] || 'Check local advisories';

  // Hourly
  el('hourlyContainer').innerHTML = d.hourly.map((h, i) => {
    const ht = isCelsius ? h.temp : toF(h.temp);
    return `<div class="hourly-item ${i===0?'active':''}">
      <div class="hourly-time">${h.t}</div>
      <div class="hourly-icon">${h.icon}</div>
      <div class="hourly-temp">${ht}°</div>
      <div class="hourly-rain">💧 ${h.rain}</div>
    </div>`;
  }).join('');

  // Forecast
  el('forecastGrid').innerHTML = d.forecast.map(f => {
    const fh = isCelsius ? f.high : toF(f.high);
    const fl = isCelsius ? f.low : toF(f.low);
    return `<div class="forecast-card glass-card">
      <div class="forecast-day">${f.day}</div>
      <span class="forecast-icon">${f.icon}</span>
      <div class="forecast-temps">
        <div class="forecast-high">${fh}°</div>
        <div class="forecast-low">${fl}°</div>
      </div>
      <div class="forecast-rain-chance">💧 ${f.rain}</div>
    </div>`;
  }).join('');

  // Draw temperature chart
  drawTempChart(d.hourly, isCelsius, toF);

  // Weather theme
  setWeatherTheme(d.condition);
}

// ==================== TEMPERATURE CHART ====================
function drawTempChart(hourlyData, celsius, toF) {
  const canvas = el('tempChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr || 860 * dpr;
  canvas.height = 120 * dpr;
  canvas.style.width = (rect.width || 860) + 'px';
  canvas.style.height = '120px';
  ctx.scale(dpr, dpr);

  const W = rect.width || 860;
  const H = 120;
  const pad = { top: 20, bottom: 30, left: 20, right: 20 };

  const temps = hourlyData.map(h => celsius ? h.temp : toF(h.temp));
  const minT = Math.min(...temps) - 2;
  const maxT = Math.max(...temps) + 2;

  ctx.clearRect(0, 0, W, H);

  const xPos = (i) => pad.left + (i / (temps.length - 1)) * (W - pad.left - pad.right);
  const yPos = (t) => pad.top + (1 - (t - minT) / (maxT - minT)) * (H - pad.top - pad.bottom);

  // Gradient fill
  const gradient = ctx.createLinearGradient(0, pad.top, 0, H - pad.bottom);
  gradient.addColorStop(0, 'rgba(99, 179, 237, 0.5)');
  gradient.addColorStop(1, 'rgba(99, 179, 237, 0.02)');

  ctx.beginPath();
  ctx.moveTo(xPos(0), yPos(temps[0]));
  for (let i = 1; i < temps.length; i++) {
    const cpx = (xPos(i-1) + xPos(i)) / 2;
    ctx.bezierCurveTo(cpx, yPos(temps[i-1]), cpx, yPos(temps[i]), xPos(i), yPos(temps[i]));
  }
  ctx.lineTo(xPos(temps.length-1), H - pad.bottom);
  ctx.lineTo(xPos(0), H - pad.bottom);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();

  // Line
  ctx.beginPath();
  ctx.moveTo(xPos(0), yPos(temps[0]));
  for (let i = 1; i < temps.length; i++) {
    const cpx = (xPos(i-1) + xPos(i)) / 2;
    ctx.bezierCurveTo(cpx, yPos(temps[i-1]), cpx, yPos(temps[i]), xPos(i), yPos(temps[i]));
  }
  ctx.strokeStyle = 'rgba(99, 179, 237, 0.9)';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Points & labels
  temps.forEach((t, i) => {
    const x = xPos(i), y = yPos(t);
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#63b3ed';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.6)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.font = `bold ${10 * dpr / dpr}px Inter`;
    ctx.textAlign = 'center';
    ctx.fillText(`${t}°`, x, y - 10);

    // X labels
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = `${9}px Inter`;
    ctx.fillText(hourlyData[i].t, x, H - 8);
  });
}

// ==================== WEATHER THEME ====================
function setWeatherTheme(condition) {
  const body = document.body;
  body.className = '';
  if (isDarkMode) body.setAttribute('data-theme','dark');
  else body.setAttribute('data-theme','light');

  const hour = new Date().getHours();
  const isNight = hour < 6 || hour > 20;

  const starsContainer = el('starsContainer');
  const lightning = el('lightningOverlay');

  starsContainer.style.display = 'none';
  stopRain(); stopSnow();

  if (isNight) {
    body.classList.add('weather-clear-night');
    setCelestialMoon();
    starsContainer.style.display = 'block';
  } else if (condition === 'sunny') {
    body.classList.add('weather-sunny');
    setCelestialSun();
  } else if (condition === 'rainy') {
    body.classList.add('weather-rainy');
    hideCelestial();
    startRain();
  } else if (condition === 'stormy') {
    body.classList.add('weather-stormy');
    hideCelestial();
    startRain(true);
    startLightning();
  } else if (condition === 'snowy') {
    body.classList.add('weather-snowy');
    setCelestialMoon();
    startSnow();
  } else if (condition === 'cloudy') {
    body.classList.add('weather-cloudy');
    setCelestialSun();
  } else if (condition === 'foggy') {
    body.classList.add('weather-foggy');
    hideCelestial();
  } else if (condition === 'windy') {
    body.classList.add('weather-windy');
    setCelestialSun();
  } else {
    body.classList.add('weather-sunny');
    setCelestialSun();
  }
}

function setCelestialSun() {
  const c = el('celestialBody'), r = el('celestialRing');
  c.style.background = 'radial-gradient(circle at 35% 35%,#fff9c4,#ffd54f 40%,#ff8f00 70%,#e65100)';
  c.style.boxShadow = '0 0 80px 40px #ffd54f66,0 0 160px 80px #ffd54f22';
  c.style.top = '-80px'; c.style.display = 'block';
  r.style.display = 'block';
}

function setCelestialMoon() {
  const c = el('celestialBody'), r = el('celestialRing');
  c.style.background = 'radial-gradient(circle at 30% 30%,#e8f4f8,#b0c4d8 40%,#8090a0 80%)';
  c.style.boxShadow = '0 0 60px 30px #b0c4d855,0 0 120px 60px #b0c4d822';
  c.style.top = '-60px'; c.style.display = 'block';
  r.style.display = 'none';
}

function hideCelestial() {
  el('celestialBody').style.display = 'none';
  el('celestialRing').style.display = 'none';
}

function startRain(heavy = false) {
  const container = el('rainContainer');
  container.style.display = 'block'; container.innerHTML = '';
  const count = heavy ? 130 : 75;
  for (let i = 0; i < count; i++) {
    const drop = document.createElement('div');
    drop.className = 'rain-drop';
    drop.style.left = `${Math.random()*100}%`;
    drop.style.height = `${Math.random()*15+10}px`;
    drop.style.animationDuration = `${Math.random()*0.5+0.35}s`;
    drop.style.animationDelay = `${Math.random()*2}s`;
    container.appendChild(drop);
  }
}

function stopRain() {
  el('rainContainer').style.display = 'none';
  el('rainContainer').innerHTML = '';
}

function startSnow() {
  const container = el('snowContainer');
  container.style.display = 'block'; container.innerHTML = '';
  for (let i = 0; i < 60; i++) {
    const flake = document.createElement('div');
    flake.className = 'snowflake';
    const size = Math.random() * 6 + 3;
    flake.style.left = `${Math.random()*100}%`;
    flake.style.width = `${size}px`;
    flake.style.height = `${size}px`;
    flake.style.animationDuration = `${Math.random()*4+3}s`;
    flake.style.animationDelay = `${Math.random()*5}s`;
    container.appendChild(flake);
  }
}

function stopSnow() {
  el('snowContainer').style.display = 'none';
  el('snowContainer').innerHTML = '';
}

function startLightning() {
  const overlay = el('lightningOverlay');
  function flash() {
    overlay.classList.add('flash');
    setTimeout(() => overlay.classList.remove('flash'), 80);
    setTimeout(() => {
      overlay.classList.add('flash');
      setTimeout(() => overlay.classList.remove('flash'), 60);
    }, 150);
    setTimeout(flash, 5000 + Math.random() * 10000);
  }
  setTimeout(flash, 2000);
}

// ==================== HELPERS ====================
function formatDate() {
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const now = new Date();
  return `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
}

function animateNumber(id, from, to, duration) {
  const elem = el(id);
  const start = performance.now();
  const update = now => {
    const prog = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - prog, 3);
    elem.textContent = Math.round(from + (to - from) * eased);
    if (prog < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

function showLoading(show) { el('loadingOverlay').classList.toggle('active', show); }

function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (toast) toast.remove();
  toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// ==================== LIVE API ====================
async function fetchLiveWeather(city) {
  showLoading(true);
  try {
    const res = await fetch(`${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`);
    if (!res.ok) throw new Error('City not found');
    const data = await res.json();
    const forecastRes = await fetch(`${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`);
    const forecastData = await forecastRes.json();
    showLoading(false);
    renderLiveWeather(data, forecastData);
  } catch(err) {
    showLoading(false);
    showToast(`⚠️ ${err.message}. Using demo data.`);
    loadCity(city);
  }
}

async function fetchByCoords(lat, lon) {
  try {
    const res = await fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    const data = await res.json();
    const fRes = await fetch(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    const forecastData = await fRes.json();
    showLoading(false);
    renderLiveWeather(data, forecastData);
  } catch(err) {
    showLoading(false);
    showToast('Could not fetch live weather');
  }
}

function renderLiveWeather(data, forecastData) {
  const iconMap = {
    '01d':'☀️','01n':'🌙','02d':'⛅','02n':'☁️','03d':'☁️','03n':'☁️',
    '04d':'☁️','04n':'☁️','09d':'🌧️','09n':'🌧️','10d':'🌦️','10n':'🌧️',
    '11d':'⛈️','11n':'⛈️','13d':'❄️','13n':'❄️','50d':'🌫️','50n':'🌫️'
  };
  const condMap = {
    'Clear':'sunny','Clouds':'cloudy','Rain':'rainy','Drizzle':'rainy',
    'Thunderstorm':'stormy','Snow':'snowy','Mist':'foggy','Fog':'foggy','Wind':'windy'
  };

  const sunriseDate = new Date(data.sys.sunrise*1000);
  const sunsetDate = new Date(data.sys.sunset*1000);
  const fmt = d => d.toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'});

  const hourly = forecastData.list.slice(0,10).map(item => ({
    t: new Date(item.dt*1000).toLocaleTimeString('en-US',{hour:'numeric'}),
    icon: iconMap[item.weather[0].icon]||'🌡️',
    temp: Math.round(item.main.temp),
    rain: item.pop?`${Math.round(item.pop*100)}%`:'0%'
  }));

  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const seen = new Set(), forecast = [];
  for (const item of forecastData.list) {
    const d = new Date(item.dt*1000);
    const key = d.toDateString();
    if (!seen.has(key) && forecast.length < 5) {
      seen.add(key);
      forecast.push({
        day: forecast.length===0?'Today':days[d.getDay()],
        icon: iconMap[item.weather[0].icon]||'🌡️',
        high: Math.round(item.main.temp_max),
        low: Math.round(item.main.temp_min),
        rain: item.pop?`${Math.round(item.pop*100)}%`:'0%'
      });
    }
  }

  const liveData = {
    name: data.name, country: data.sys.country, flag: '',
    temp: Math.round(data.main.temp), feels: Math.round(data.main.feels_like),
    high: Math.round(data.main.temp_max), low: Math.round(data.main.temp_min),
    humidity: data.main.humidity, wind: Math.round(data.wind.speed*3.6),
    windDir: degToDir(data.wind.deg), pressure: data.main.pressure,
    visibility: Math.round((data.visibility||10000)/1000),
    desc: data.weather[0].description.replace(/\b\w/g,c=>c.toUpperCase()),
    icon: iconMap[data.weather[0].icon]||'🌡️',
    condition: condMap[data.weather[0].main]||'sunny',
    uv:5, aqi:50, aqiLabel:'Good',
    sunrise: fmt(sunriseDate), sunset: fmt(sunsetDate),
    sunPos: getSunPosition(data.sys.sunrise, data.sys.sunset, Date.now()/1000),
    timezone: 'UTC',
    hourly, forecast
  };

  currentData = liveData;
  renderWeather(liveData);
  updateMap(liveData.name.toLowerCase());
  startCityClockTick('UTC');
  playWeatherSound(liveData.condition);
}

function degToDir(deg) {
  return ['N','NE','E','SE','S','SW','W','NW'][Math.round(deg/45)%8];
}

function getSunPosition(sunrise, sunset, now) {
  if (now < sunrise || now > sunset) return 50;
  return Math.round(((now-sunrise)/(sunset-sunrise))*100);
}

// ==================== GLOBAL EXPOSE ====================
window.selectSuggestion = selectSuggestion;
window.loadCity = loadCity;
