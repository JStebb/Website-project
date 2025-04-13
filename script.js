document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('name');
    const input = document.getElementById('nameInput');


    const welcome = document.getElementById('welcomeMessage');
    const firstVisitEl = document.getElementById('firstVisitMessage')
    const lastVisitEl = document.getElementById('lastVisitMessage')
    const currentTimeEl = document.getElementById('currentTime')

    
    const savedName = localStorage.getItem('userName');
    const firstVisit = localStorage.getItem('firstVisit');
    const lastVisit = localStorage.getItem('lastVisit');
    //utility for formating date string
    function formatDate(iso) {
        return new Date(iso).toLocaleString()
    }
    
    function getGreeting() {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 18) return 'Good afternoon';
        return 'Good evening';
    }

    function updateCurrentTime() {
        const now = new Date();
        currentTimeEl.textContent = `Current time : ${now.toLocaleString()}`;
    }


    //check and display exisitng info
    if (savedName) {
        welcome.textContent = `${getGreeting()}, ${savedName}!`;
        if (firstVisit) {
            firstVisitEl.textContent = `First visit: ${formatDate(firstVisit)}`;
        }
        if (lastVisit) {
            lastVisitEl.textContent = `Last visit: ${formatDate(lastVisit)}`;

        }
        

        //update lastVisit after displaying old value
        localStorage.setItem(`lastVisit`, new Date().toISOString());
    }
    //handling form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault(); //preventing page from reloading

        const name = input.value;

        const now = new Date().toISOString();


        console.log('Name submitted:', name);
        //save to localStorage
        localStorage.setItem('userName', name);

        //sets first visit if not already set
        if (!localStorage.getItem('firstVisit')) {
            localStorage.setItem('firstVisit', now);
        }

        localStorage.setItem('lastVisit', now);

        console.log('Name saved to localStorage:', name);

        welcome.textContent = `${getGreeting()}, ${name}!`;
        firstVisitEl.textContent = `first Visit: ${formatDate(now)}`;
        lastVisitEl.textContent = `Last visit: ${formatDate(now)}`;
    });
    //update time every second
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);

    const detroitWeatherEl = document.getElementById('detroitWeather');

    function getWeatherDescription(code) {
        const descriptions = {
            0: 'clear sky',
            1: 'mostly clear',
            2: 'partly cloudy',
            3: 'overcast',
            45: 'fog',
            48: 'depositing rime fog',
            51: 'light drizzle',
            53: 'moderate drizzle',
            55: 'dense drizzle',
            56: 'light freezing drizzle',
            57: 'dense freezing drizzle',
            61: 'slight rain',
            63: 'moderate rain',
            65: 'heavy rain',
            66: 'light freezing rain',
            67: 'heavy freezing rain',
            71: 'slight snow fall',
            73: 'moderate snow fall',
            75: 'heavy snow fall',
            77: 'snow grains',
            80: 'slight rain showers',
            81: 'moderate rain showers',
            82: 'violent rain showers',
            85: 'slight snow showers',
            86: 'heavy snow showers',
            95: 'thunderstorm',
            96: 'thunderstorm with slight hail',
            99: 'thunderstorm with heavy hail'
        };
        return descriptions[code] || 'unknown conditions';
    }

    function fetchDetroitWeather() {
        const url = 'https://api.open-meteo.com/v1/forecast?latitude=42.3314&longitude=-83.0458&current_weather=true';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const code = data.current_weather.weathercode;
                const description = getWeatherDescription(code);
                detroitWeatherEl.textContent = `The weather in Detroit, MI is ${description}.`;
            })
            .catch(error => {
                console.error('Weather fetch error:', error);
                detroitWeatherEl.textContent = 'Unable to load weather for Detroit.';
            });
}

fetchDetroitWeather();
});