import { getUnit } from './unit'
import { roundTemp, capitalizeEveryStart, capitalizeStart, convertFromUTC, dayOrNight, sliceTime } from './helper'

// flag so we don't re-create elements when it has already been created
let displaying = null;
function displayInfo(weatherAndLoc) {
    console.log(weatherAndLoc.data); 
    const location = weatherAndLoc.location;
    const currentData = weatherAndLoc.data.current;
    const hourlyDataArray = weatherAndLoc.data.hourly;
    const utcOffset = weatherAndLoc.data.timezone_offset;
    displayCurrent(currentData, utcOffset, location);
    for (let i = 1; i < 25; i++) {
        displayHourly(hourlyDataArray[i], utcOffset, i);
    }
    displaying = location;
}

function displayCurrent(data, utcOffset, location) {
    const unit = getUnit();
    const currentContainer = document.querySelector(".current"); 
    let weatherUl;
    let time;
    let locationText;
    let weatherImg;
    let weatherDesc;
    let temperatureText;

    if (displaying == null) {
        weatherUl = document.createElement("ul");
        weatherUl.id = "currWeather-ul";
        time = document.createElement("li");
        time.id = "currTime-li";
        locationText = document.createElement("li");
        locationText.id = "currLocationText-li";
        weatherImg = document.createElement("img");
        weatherImg.id = "currWeather-img";
        weatherDesc = document.createElement("li");
        weatherDesc.id = "currWeatherDesc-li";
        temperatureText = document.createElement("li");
        temperatureText.id = "currTemperatureText-li";
    } else {
        weatherUl = document.querySelector("#currWeather-ul");
        time = document.querySelector("#currTime-li");
        locationText = document.querySelector("#currLocationText-li");
        weatherImg = document.querySelector("#currWeather-img");
        weatherDesc = document.querySelector("#currWeatherDesc-li");
        temperatureText = document.querySelector("#currTemperatureText-li");
    }
    const convertedTime = convertFromUTC(utcOffset, data.dt);
    time.textContent = convertedTime;
    locationText.textContent = capitalizeEveryStart(location);
    weatherImg.src = displayWeatherImg(convertedTime, data.weather[0].description);
    weatherDesc.textContent = capitalizeStart(data.weather[0].description);
    temperatureText.textContent = (unit == "metric") ? roundTemp(data.temp) + "°C" : roundTemp(data.temp) + "°F";
    
    weatherUl.appendChild(time);
    weatherUl.appendChild(locationText);
    weatherUl.appendChild(weatherImg);
    weatherUl.appendChild(weatherDesc);
    weatherUl.appendChild(temperatureText);
    currentContainer.appendChild(weatherUl);
}

// pre-cond: function is iterated through the hourlyDataArray
function displayHourly(data, utcOffset, hour) {
    const unit = getUnit();
    const hourlyContainer = document.querySelector(".hourly");
    let weatherUl;
    let time;
    let weatherImg;
    let weatherDesc;
    let temperatureText;

    if (displaying == null) {
        weatherUl = document.createElement("ul");
        weatherUl.id = `hour${hour}Weather-ul`;
        time = document.createElement("li");
        time.id = `hour${hour}Time-li`;
        weatherImg = document.createElement("img");
        weatherImg.id = `hour${hour}Weather-img`;
        weatherDesc = document.createElement("li");
        weatherDesc.id = `hour${hour}WeatherDesc-li`;
        temperatureText = document.createElement("li");
        temperatureText.id = `hour${hour}TemperatureText-li`;
    } else {
        weatherUl = document.querySelector(`#hour${hour}Weather-ul`);
        time = document.querySelector(`#hour${hour}Time-li`);
        weatherImg = document.querySelector(`#hour${hour}Weather-img`);
        weatherDesc = document.querySelector(`#hour${hour}WeatherDesc-li`);
        temperatureText = document.querySelector(`#hour${hour}TemperatureText-li`)
    }
    const convertedTime = convertFromUTC(utcOffset, data.dt);
    const displayedHourlyTime = sliceTime(convertedTime);
    time.textContent = displayedHourlyTime;
    weatherImg.src = displayWeatherImg(convertedTime, data.weather[0].description);
    weatherDesc.textContent = capitalizeStart(data.weather[0].description);
    temperatureText.textContent = (unit == "metric") ? roundTemp(data.temp) + "°C" : roundTemp(data.temp) + "°F";

    weatherUl.appendChild(time);
    weatherUl.appendChild(weatherImg);
    weatherUl.appendChild(weatherDesc);
    weatherUl.appendChild(temperatureText);
    hourlyContainer.appendChild(weatherUl);
}

// check for day/night & description
// returns the url for the img
function displayWeatherImg(convertedTime, weatherDesc) {
    const description = weatherDesc.toLowerCase();
    const status = dayOrNight(convertedTime);
    let pic;
    if (description.includes("thunderstorm")) {
        pic = "11d"; 
    } else if (["drizzle", "shower rain"].includes(description)) {
        pic = "09d";
    } else if (description.includes("rain") && description != "freezing rain" 
                && !description.includes("snow")) {
        pic = (status == "day") ? "10d" : "10n";
    } else if (description.includes("freezing rain") || description.includes("snow") 
                || description.includes("sleet")) {
        pic = "13d";
    } else if (["mist", "smoke", "haze", "sand", "fog", "dust", "volcanic ash", "squails", "tornado"]
                .includes(description)) {
        pic = "50d";
    } else if (description.includes("clear sky")) {
        pic = (status == "day") ? "01d" : "01n";
    } else if (description == "few clouds") {
        pic = (status == "day") ? "02d" : "02n";
    } else if (description == "scattered clouds") {
        pic = (status == "day") ? "03d" : "03n";
    } else if (["broken clouds", "overcast clouds"].includes(description)) {
        pic = (status == "day") ? "04d" : "04n";
    } 
    const url = `http://openweathermap.org/img/wn/${pic}@2x.png`;
    return url;
}

function changeUnitDisplay() {

}


export default displayInfo