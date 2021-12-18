import { getUnit } from './unit'
import { roundTemp, capitalizeEveryStart, capitalizeStart, convertFromUTC, dayOrNight } from './helper'

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
    const convertedTime = convertFromUTC(utcOffset);
    time.textContent = convertedTime;
    locationText.textContent = capitalizeEveryStart(location);
    displaying = location;
    weatherImg.src = displayWeatherImg(convertedTime, data.weather[0].description);
    weatherDesc.textContent = capitalizeStart(data.weather[0].description);
    temperatureText.textContent = (unit == "metric") ? roundTemp(data.temp) + "°C" : roundTemp(data.temp) + "°F";
    
    weatherUl.appendChild(time);
    weatherUl.appendChild(locationText);
    weatherUl.appendChild(weatherImg);
    weatherUl.appendChild(weatherDesc);
    weatherUl.appendChild(temperatureText);
    infoContainer.appendChild(weatherUl);
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