const API_KEY = '62dcc3c1a9bd4392af0133641260101'; 
const API_URL = 'https://api.weatherapi.com/v1/current.json';

const errorMessage = document.getElementById('errorMessage');
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherInfo = document.getElementById('weatherInfo');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const weatherCondition = document.getElementById('weatherCondition');
const humidity = document.getElementById('humidity');




cityInput.addEventListener('keypress' , (e) => {
    if(e.key === 'Enter'){
        handleSearch();
    }});


searchBtn.addEventListener('click' , handleSearch);

function handleSearch(){
    const city = cityInput.value.trim();

    if(city === ''){
       showError('Please enter a city name');
           hideWeather();
        return;
    }

        hideError();
    hideWeather();

        fetchWeatherData(city);
}
async function fetchWeatherData(city){
    try {
        const response = await fetch(
  `${API_URL}?key=${API_KEY}&q=${encodeURIComponent(city)}`
);
    if (!response.ok) {
                  if (response.status === 400) {
                showError('City not found. Please try again.');
            } else if (response.status === 401 || response.status === 403) {
                showError('Invalid API key. Please check your configuration.');
            } else {
                showError('Unable to fetch weather data. Please try again later.');
            }
            return;
    }
    const data = await response.json();
    displayWeather(data);

    } catch (error) {
                showError('Network error. Please check your connection.');
        console.error('Error fetching weather data:', error);
    }
}

function displayWeather(data){
    cityName.textContent = data.location.name;
    temperature.textContent = `${Math.round(data.current.temp_c)}°C`;
    weatherCondition.textContent = data.current.condition.text;
    humidity.textContent = `${data.current.humidity}%`;

    showWeather();
}

function showError(message){
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}
function hideError(){
    errorMessage.classList.add('hidden');
}
function showWeather(){
    weatherInfo.classList.remove('hidden');
}
function hideWeather(){
    weatherInfo.classList.add('hidden');
}





