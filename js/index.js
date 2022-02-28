const api_key = 'bb92bfa8ce1d036519e7acaa111b6d76';
const request_button = document.querySelector('.search button');
const weather_info = document.querySelector('.weather-infos');
var previous_searches = [];

request_button.addEventListener('click', () => {
    const query = document.querySelector('.search-bar').value;
    if (query != '') {
        query.toLowerCase();
        if (previous_searches.includes(query)) {
            alert(query + "'s weather information is already been displayed");
        } else {
            fetchWeatherInfo(query);
        }
    } else {
        alert('Please enter a valid city name!!!');
    }
    document.querySelector('.search-bar').value = '';

});

function fetchWeatherInfo(city) {
    fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        '&units=metric&appid=' +
        api_key
    ).then((response) => response.json()).then((data) =>
        collate_result(data)
    );
}

function collate_result(data) {
    if (data.cod == 200) {
        let ans = {
            humidity: data.main.humidity,
            temp: data.main.temp,
            wind: data.wind.speed,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            name: data.name
        }
        create_cards(ans);
        var city_name = data.name.toLowerCase();
        previous_searches.push(city_name);
    } else {
        alert("City not found");
        return;
    }
}

function create_cards(element) {
    const weather = document.createElement('div');
    weather.classList.add('card');
    const flex_container = document.createElement('div');
    flex_container.classList.add('wrap');
    const city = document.createElement('h2');
    city.classList.add('city');
    city.innerHTML = 'Weather in ' + element.name;
    const clear = document.createElement('div');
    clear.classList.add('clear');
    clear.innerHTML = 'Clear';
    flex_container.appendChild(city);
    flex_container.append(clear);
    const temp = document.createElement('h1');
    temp.classList.add('temp');
    temp.innerHTML = element.temp + '°C';
    const img_contain = document.createElement('div');
    img_contain.classList.add('contain');
    const image = document.createElement('img');
    image.classList.add('weather-icon');
    const description = document.createElement('div');
    description.classList.add('description');
    image.setAttribute('src', 'https://openweathermap.org/img/wn/' + element.icon + '@2x.png');
    description.innerText = element.description;
    img_contain.appendChild(image);
    img_contain.appendChild(description);
    const humidity = document.createElement('div');
    humidity.classList.add('humidity');
    humidity.innerText = "Humidity: " + element.humidity + '%';
    const wind = document.createElement('div');
    wind.classList.add('wind');
    wind.innerText = "Wind speed: " + element.wind + ' km/hr';
    weather.appendChild(flex_container);
    weather.appendChild(temp);
    weather.appendChild(img_contain);
    weather.appendChild(humidity);
    weather.appendChild(wind);

    weather_info.appendChild(weather);

    clear.addEventListener("click", () => {
        var cityName = String(element.name);
        weather_info.removeChild(weather);
        let filtered = previous_searches.filter(function(value, index, arr) {
            return value != cityName.toLowerCase();
        });
        previous_searches = filtered;
    });
}


document.querySelector('.search-bar').addEventListener('keyup', function(event) {
    if (event.key == "Enter") {
        const query = document.querySelector('.search-bar').value;
        if (query != '') {
            query.toLowerCase();
            if (previous_searches.includes(query)) {
                alert(query + "'s weather information is already been displayed");
            } else {
                fetchWeatherInfo(query);
            }
        } else {
            alert('Please enter a valid city name!!!');
        }
        document.querySelector('.search-bar').value = '';
    }
});

document.querySelector('.button').addEventListener("click", () => {
    previous_searches = [];
    weather_info.innerHTML = '';
    document.removeChild(weather_info);
});