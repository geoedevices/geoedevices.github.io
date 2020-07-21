let citySelect = document.querySelector("#city-select");
let cityDisplay = document.querySelector("#city-display");
let tempDisplay = document.querySelector("#temp-display");
let humidityDisplay = document.querySelector("#humidity-display");
let sunriseDisplay = document.querySelector("#sunrise-display");
let sunsetDisplay = document.querySelector("#sunset-display");
let icon = document.querySelector("#icon");

if (localStorage.storedCityCode) {
    citySelect.value = localStorage.storedCityCode;
}
let updateTimer = setInterval(getData, 600000);
getData();

function newCitySelected() {
    localStorage.storedCityCode = citySelect.value;
    manualRefresh();
}

function manualRefresh() {
    clearInterval(updateTimer);
    updateTimer = setInterval(getData, 600000);
    getData();
}

function getData() {
    cityDisplay.innerHTML = "";
    tempDisplay.innerHTML = "";
    humidityDisplay.innerHTML = "";
    sunriseDisplay.innerHTML = "";
    sunsetDisplay.innerHTML = "";
    icon.style.visibility = "hidden";
    let selectedCityCode = citySelect.value;
    fetch("https://api.openweathermap.org/data/2.5/weather?id=" + selectedCityCode + "&units=metric&lang=hu&appid=39412c60d3e58d4ebff31dab5fbc52ff")
        .then(response => response.json())
        .then(data => fillWeather(data))
        .catch(err => console.log(err));
}

function fillWeather(data) {
    cityDisplay.innerHTML = data.name;
    tempDisplay.innerHTML = data.main.temp.toFixed(1) + "&degC";
    humidityDisplay.innerHTML = data.main.humidity + "%";
    let sunriseData = new Date(data.sys.sunrise * 1000);
    sunriseDisplay.innerHTML = getTimeOnly(sunriseData);
    let sunsetData = new Date(data.sys.sunset * 1000);
    sunsetDisplay.innerHTML = getTimeOnly(sunsetData);
    icon.src = "img/" + data.weather[0].icon + ".png";
    icon.style.visibility = "visible";
}

function getTimeOnly(data) {
    let minutes = data.getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    return data.getHours() + ":" + minutes;
}