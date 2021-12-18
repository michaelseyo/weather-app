import { getUnit } from './unit'
import { roundTemp, capitalizeEveryStart, capitalizeStart, convertFromUTC } from './helper'

function displayInfo(weatherAndLoc) {
    console.log(weatherAndLoc.data); 
    const location = weatherAndLoc.location;
    const currentData = weatherAndLoc.data.current;
    const utcOffset = weatherAndLoc.data.timezone_offset;
    displayCurrent(currentData, utcOffset, location);
}

let displaying = null;
function displayCurrent(data, utcOffset, location) {
    const unit = getUnit();
    const infoContainer = document.querySelector(".info"); 
    let weatherUl;
    let time;
    let locationText;
    let weatherImg;
    let weatherDesc;
    let temperatureText;

    if (displaying == null) {
        weatherUl = document.createElement("ul");
        weatherUl.id = "weather-ul";
        time = document.createElement("li");
        time.id = "time-li";
        locationText = document.createElement("li");
        locationText.id = "locationText-li";
        weatherImg = document.createElement("img");
        weatherImg.id = "weather-img";
        weatherDesc = document.createElement("li");
        weatherDesc.id = "weatherDesc-li";
        temperatureText = document.createElement("li");
        temperatureText.id = "temperatureText-li";
    } else {
        weatherUl = document.querySelector("#weather-ul");
        time = document.querySelector("#time-li");
        locationText = document.querySelector("#locationText-li");
        weatherImg = document.querySelector("#weather-img");
        weatherDesc = document.querySelector("#weatherDesc-li");
        temperatureText = document.querySelector("#temperatureText-li");
    }

    time.textContent = convertFromUTC(utcOffset);
    locationText.textContent = capitalizeEveryStart(location);
    displaying = location;
    weatherImg = displayWeatherImg(utcOffset, data.weather[0].description);
    weatherDesc.textContent = capitalizeStart(data.weather[0].description);
    temperatureText.textContent = (unit == "metric") ? roundTemp(data.temp) + "°C" : roundTemp(data.temp) + "°F";
    weatherUl.appendChild(time);
    weatherUl.appendChild(locationText);
    weatherUl.appendChild(weatherDesc);
    weatherUl.appendChild(temperatureText);
    infoContainer.appendChild(weatherUl);
}

// check for day/night & description
function displayWeatherImg(utcOffset, description) {
    switch (description) {
        
    }
}

function changeUnitDisplay() {

}


export default displayInfo