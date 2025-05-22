const API_KEY = '4619377c239cecd1746d067d30c563ea';

function getWeather() {
    const city = document.getElementById('city').value;
    const country = document.getElementById('country').value;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json()
        })
        .then(data => {
            const weather = document.getElementById("weatherResult");
            const emoji = getWeatherEmoji(data.weather[0].main);
            weather.innerHTML = `
    <div class="emoji">${emoji}</div>
    <h2>${data.name}, ${data.sys.country}</h2>
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Feels Like: ${data.main.feels_like}°C</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind Speed: ${data.wind.speed}m/s</p>
    <p>Description: ${data.weather[0].description}</p>`;
        })
        .catch(error => {
            console.error(error);
            alert('Error fetching weather data');
        });
}
function getCurrentLocation(lat, lon) {// Replace with your real API key
    const New_Api_Key = "6af728aeed53462188f07d46f4e8f462";
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${New_Api_Key}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weather = document.getElementById("weatherResult");

            if (data && data.results && data.results.length > 0) {
                const components = data.results[0].components;
                const city = components.city || components.town || components.village || 'Unknown City';
                const country = components.country || 'Unknown Country';

                const cityInput = document.getElementById('city');
                const countryInput = document.getElementById('country');

                cityInput.value = city;
                countryInput.value = country;
            } else {
                weather.innerText = "Could not determine city and country.";
            }
        })
        .catch(error => {
            console.error(error);
            weather.innerText = "Error fetching location info.";
        });
}

function getLocation() {
    document.getElementById('city').value = '';
    document.getElementById('country').value = '';
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                getCurrentLocation(lat, lon);
            },
            error => {
                weather.innerText = "Location access denied or unavailable.";
            }
        );
    } else {
        weather.innerText = "Geolocation is not supported by this browser.";
    }
}
window.onload = getLocation;

function getWeatherEmoji(condition) {
    const body = document.body;

    switch (condition.toLowerCase()) {
        case 'clear': body.style.background = '#FFD700'; //yellow
            return '☀️';
        case 'clouds':
            body.style.background = '#B0C4DE'; // light steel blue
            return '☁️';
        case 'rain':
            body.style.background = '#87CEFA'; // light sky blue
            return '🌧️';
        case 'snow':
            body.style.background = '#E0FFFF'; // light cyan
            return '❄️';
        case 'thunderstorm': body.style.background = '#708090'; // slate gray
            return '⛈️';
        case 'lightning': body.style.background = '#708090'; // slate gray
            return '🌩️';
        case 'drizzle':
            body.style.background = '#87CEFA'; // light sky blue
            return '🌦️';
        case 'haze': body.style.background = '#C0C0C0'; // silver/gray
            return '🌁';
        case 'mist': body.style.background = '#C0C0C0'; // silver/gray
            return '🌫️';
        case 'smoke': body.style.background = '#C0C0C0'; // silver/gray
            return '🌫️';
        case 'fog': body.style.background = '#C0C0C0'; // silver/gray
            return '🌫️';
        case 'cyclone':
            body.style.background = '#A9A9A9'; // dark gray 
            return '🌀';
        case 'tornado':
            body.style.background = '#A9A9A9'; // dark gray 
            return '🌪️';
        case 'cold':
            body.style.background = '#ADD8E6'; // light blue
            return '🥶';
        case 'hot':
            body.style.background = '#FF6347'; // tomato
            return '🥵';
        case 'sunny':
            body.style.background = '#FFD700'; // sunny yellow
            return '🌞'
        case 'rainbow': body.style.background = '#FFB6C1'; // light pink
            return '🌈';
        default: body.style.background = 'linear-gradient(to right, #4facfe, #00f2fe)';
            return '🌍';
    }
}
