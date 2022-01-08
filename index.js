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
        .then((data) => this.displayWeather(data))
        .catch((error) => console.log(error))
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


const geocode = {
    reverseGeode(latitude, longitude){
        var api_key = '9ba142b66ac04a34910563448f7f312a';
        
        var api_url = 'https://api.opencagedata.com/geocode/v1/json'

        var request_url = api_url + '?' + 'key=' + api_key + '&q=' + encodeURIComponent(latitude + ',' + longitude) + '&pretty=1' + '&no_annotations=1';

        // see full list of required and optional parameters:
        // https://opencagedata.com/api#forward

        var request = new XMLHttpRequest();
        request.open('GET', request_url, true);

        request.onload = function() {
        // see full list of possible response codes:
        // https://opencagedata.com/api#codes

            if (request.status === 200){ 
                // Success!
                var data = JSON.parse(request.responseText);
                // console.log(data.results[0]);
                weather.fetchWeather(data.results[0].components.state)
            } else if (request.status <= 500){ 
                // We reached our target server, but it returned an error
                                    
                console.log("unable to geocode! Response code: " + request.status);
                var data = JSON.parse(request.responseText);
                console.log('error msg: ' + data.status.message);
            } else {
                console.log("server error");
            }
        };

        request.onerror = function() {
        // There was a connection error of some sort
        console.log("unable to connect to server");        
        };

        request.send();  // make the request

    },

    getLocation(){
        function success(data){
            geocode.reverseGeode(data.coords.latitude, data.coords.longitude)
        }
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(success, console.error)
        }else{
            weather.fetchWeather('Bengaluru')
        }
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

geocode.getLocation()

