/*let weather_params = {
    api_key: 'bb92bfa8ce1d036519e7acaa111b6d76',
    fetchWeather: function(city) {
        fetch(
            'http://api.openweathermap.org/data/2.5/weather?q=' +
            city +
            '&units=metric&appid=' +
            this.api_key
        ).then((response) => response.json()).then((data) =>
            this.displayWeather(data)
        );
    },
    displayWeather: function(data) {
        if (data.cod == 200) {
            const { name } = data;
            const { icon, description } = data.weather[0];
            const { temp, humidity } = data.main;
            const { speed } = data.wind;
            document.querySelector('.city').innerText = 'Weather in ' + name;
            document.querySelector('.temp').innerText = temp + '°C';
            document.querySelector('.weather-icon').src = 'https://openweathermap.org/img/wn/' + icon + '@2x.png';
            document.querySelector('.description').innerText = description;
            document.querySelector('.humidity').innerText = "Humidity: " + humidity + '%';
            document.querySelector('.wind').innerText = "Wind speed: " + speed + ' km/hr';
        } else {
            alert("City not found...");
            return;
        }
    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector('.search button').addEventListener('click', function() {
    weather_params.search();
});

document.querySelector('.search-bar').addEventListener('keyup', function(event) {
    if (event.key == "Enter") {
        weather_params.search();
    }
})
*/

const api_key = 'bb92bfa8ce1d036519e7acaa111b6d76';
const request_button = document.querySelector('.search button');
const weather = document.querySelectorAll('div');


request_button.addEventListener('click', () => {
    const query = document.querySelector('.search-bar').value;
    if (query != '') {
        fetchWeatherInfo(query);
    } else {
        alert('Please enter a valid city name!!!');
        return;
    }

});

function fetchWeatherInfo(city) {
    console.log(city);
    var response = fetch(
        'http://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        '&units=metric&appid=' +
        api_key
    ).then((response) => response.json()).then((data) =>
        data
    );
}

document.querySelector('.button').addEventListener("click", () => {
    document.querySelector('.search-bar').value = '';
    weather[1].style.visibility = 'hidden';
});