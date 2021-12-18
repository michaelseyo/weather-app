import { getUnit } from './unit'
import { roundTemp, capitalizeEveryStart, capitalizeStart } from './helper'

function displayInfo(weatherAndLoc) {
    console.log(weatherAndLoc.data); 
    const location = weatherAndLoc.location;
    const currentData = weatherAndLoc.data.current;
    displayCurrent(currentData, location);
}

let displaying = null;
function displayCurrent(data, location) {
    const unit = getUnit();
    const infoContainer = document.querySelector(".info"); 
    let weatherUl;
    let locationText;
    let weatherDesc;
    let temperatureText;

    if (displaying == null) {
        weatherUl = document.createElement("ul");
        weatherUl.id = "weather-ul";
        locationText = document.createElement("li");
        locationText.id = "locationText-li";
        weatherDesc = document.createElement("li");
        weatherDesc.id = "weatherDesc-li";
        temperatureText = document.createElement("li");
        temperatureText.id = "temperatureText-li";
    } else {
        weatherUl = document.querySelector("#weather-ul");
        locationText = document.querySelector("#locationText-li");
        weatherDesc = document.querySelector("#weatherDesc-li");
        temperatureText = document.querySelector("#temperatureText-li");
    }

    locationText.textContent = capitalizeEveryStart(location);
    displaying = location;
    weatherDesc.textContent = capitalizeStart(data.weather[0].description);
    temperatureText.textContent = (unit == "metric") ? roundTemp(data.temp) + "°C" : roundTemp(data.temp) + "°F";
    weatherUl.appendChild(locationText);
    weatherUl.appendChild(weatherDesc);
    weatherUl.appendChild(temperatureText);
    infoContainer.appendChild(weatherUl);
}

function changeUnitDisplay() {

}

export default displayInfo