const cityName = document.querySelector(`.city`);
const temps = document.querySelector(`.temp`);
const icons = document.querySelector(`.icon`);
const descriptions = document.querySelector(`.description`);
const humiditys = document.querySelector(`.humidity`);
const winds = document.querySelector(`.wind`);


onInputEnter()

const weather = {
    apiKey: "4f0c4a005fc01488f397cee49b19d554",
    
    fetchWeather(city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    
    displayWeather(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        cityName.innerText = `Weather in ${name}`
        temps.innerText = `${temp} °C`
        icons.src = `https://openweathermap.org/img/wn/${icon}.png`
        descriptions.innerText = `${description}`
        humiditys.innerText = `Humidity: ${humidity} %`
        winds.innerText = `Wind speed: ${speed} km`
        document.querySelector(`.weather`).classList.remove('loading')
        document.body.style.backgroundImage = `url(https://source.unsplash.com/1600x900/?${name})`
    },

    search(){
        this.fetchWeather(document.querySelector(`.search-bar`).value);
    }
}

function onClickSearchBtn() {
    weather.search();
}


function onInputEnter() {
    document.querySelector(`.search-bar`).onkeyup = function (e) {
    if (e.key === 'Enter') {
        onClickSearchBtn();
        }
    }
}

weather.fetchWeather('Delhi')

