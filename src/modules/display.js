import { getUnit } from './unit'
import { roundTemp, capitalizeEveryStart, capitalizeStart, convertFromUTC, 
        dayOrNight, sliceTime, sliceDate, convertTemp } from './helper'

// flag so we don't re-create elements when it has already been created
let displaying = null;
// pre-cond: takes in { data, location }
function displayInfo(weatherAndLoc) {
    const unit = getUnit();
    console.log(weatherAndLoc.data); 
    const location = weatherAndLoc.location;
    const currentData = weatherAndLoc.data.current;
    const hourlyDataArray = weatherAndLoc.data.hourly;
    const dailyDataArray = weatherAndLoc.data.daily;
    const utcOffset = weatherAndLoc.data.timezone_offset;
    displayCurrent(currentData, utcOffset, location, unit);
    for (let hour = 1; hour < 25; hour++) {
        displayInterval(hourlyDataArray[hour], utcOffset, hour, unit, "hour");
    }
    for (let day = 1; day < 8; day++) {
        displayInterval(dailyDataArray[day], utcOffset, day, unit, "day");
    }
    displaying = location;
}

function displayCurrent(data, utcOffset, location, unit) {
    const currentContainer = document.querySelector(".current"); 
    let mainUl;
    let time;
    let locationText;
    let weatherImg;
    let weatherDesc;
    let tempText;

    let detailsUl;
    let feelsLikeTemp;
    let humidity;
    let pressure;
    let sunrise;
    let sunriseImg;
    let sunset;
    let sunsetImg;
    let windspeed;
    let windImg;

    if (displaying == null) {
        mainUl = document.createElement("ul");
        mainUl.id = "currWeather-ul";
        time = document.createElement("li");
        time.id = "currTime-li";
        locationText = document.createElement("li");
        locationText.id = "currLocationText-li";
        weatherImg = document.createElement("img");
        weatherImg.id = "currWeather-img";
        weatherDesc = document.createElement("li");
        weatherDesc.id = "currWeatherDesc-li";
        tempText = document.createElement("li");
        tempText.id = "currTempText-li";
        feelsLikeTemp = document.createElement("li");
        feelsLikeTemp.id = "currFeelsLike-li";

        detailsUl = document.createElement("ul");
        detailsUl.id = "currWeatherDetails-ul";
        humidity = document.createElement("li");
        humidity.id = "currHumidity-li";
        pressure = document.createElement("li");
        pressure.id = "currPressure-li";
        sunrise = document.createElement("li");
        sunrise.id = "currSunrise-li";
        sunriseImg = new Image();
        sunriseImg.id = "currSunrise-img";
        sunset = document.createElement("li");
        sunset.id = "currSunset-li";
        sunsetImg = new Image();
        sunsetImg.id = "currSunset-img";
        windspeed = document.createElement("li");
        windspeed.id = "currWindspeed-li";
        windImg = new Image();
        windImg.id = "currWind-img";

    } else {
        mainUl = document.querySelector("#currWeather-ul");
        detailsUl = document.querySelector("#currWeatherDetails-ul");
        time = document.querySelector("#currTime-li");
        locationText = document.querySelector("#currLocationText-li");
        weatherImg = document.querySelector("#currWeather-img");
        weatherDesc = document.querySelector("#currWeatherDesc-li");
        tempText = document.querySelector("#currTempText-li");
        feelsLikeTemp = document.querySelector("#currFeelsLike-li");

        detailsUl = document.querySelector("#currWeatherDetails-ul");
        humidity = document.querySelector("#currHumidity-li");
        pressure = document.querySelector("#currPressure-li");
        sunrise = document.querySelector("#currSunrise-li");
        sunriseImg = document.querySelector("#currSunrise-img");
        sunset = document.querySelector("#currSunset-li");
        sunsetImg = document.querySelector("#currSunset-img");
        windspeed = document.querySelector("#currWindspeed-li");
        windImg = document.querySelector("#currWind-img")
    }
    const convertedTime = convertFromUTC(utcOffset, data.dt);
    time.textContent = convertedTime;
    locationText.textContent = capitalizeEveryStart(location);
    weatherImg.src = displayWeatherImg(convertedTime, data.weather[0].description);
    weatherDesc.textContent = capitalizeStart(data.weather[0].description);
    tempText.textContent = (unit == "metric") ? roundTemp(data.temp) + "°C" : roundTemp(data.temp) + "°F";
    const feelsTemp = (unit == "metric") ? roundTemp(data.feels_like) + "°C" : roundTemp(data.feels_like) + "°F";
    feelsLikeTemp.textContent = `Feels like: ${feelsTemp}`;
    
    humidity.textContent = `Humidity: ${data.humidity}%`;
    pressure.textContent = `Pressure: ${data.pressure}hPa`;
    sunrise.textContent = sliceTime(convertFromUTC(utcOffset, data.sunrise));
    sunriseImg.src = "./images/sunrise-img.png"
    sunset.textContent = sliceTime(convertFromUTC(utcOffset, data.sunset));
    sunsetImg.src = "./images/sunset-img.png";
    windspeed.textContent = `Wind speed: ${data.wind_speed}m/s`;
    windImg.src = "./images/wind-img.png";

    mainUl.appendChild(time);
    mainUl.appendChild(locationText);
    mainUl.appendChild(weatherImg);
    mainUl.appendChild(weatherDesc);
    mainUl.appendChild(tempText);
    mainUl.appendChild(feelsLikeTemp);
    currentContainer.appendChild(mainUl);

    detailsUl.appendChild(humidity);
    detailsUl.appendChild(pressure);
    detailsUl.appendChild(sunriseImg);
    detailsUl.appendChild(sunrise);
    detailsUl.appendChild(sunsetImg);
    detailsUl.appendChild(sunset);
    detailsUl.appendChild(windImg);
    detailsUl.appendChild(windspeed);
    currentContainer.appendChild(detailsUl);
}

// pre-cond: function is iterated through the hourlyDataArray
function displayInterval(data, utcOffset, time, unit, type) {
    let intervalContainer;
    let weatherUl;
    let timeText;
    let weatherImg;
    let weatherDesc;
    // hourly
    let hourlyTempText; 
    // daily
    let minTempText;
    let maxTempText;

    intervalContainer = (type == "hour") ? document.querySelector(".hourly") : document.querySelector(".daily");

    // initialise elements
    if (displaying == null) {
        weatherUl = document.createElement("ul");
        weatherUl.id = `${type}${time}Weather-ul`;
        timeText = document.createElement("li");
        timeText.id = `${type}${time}Time-li`;
        weatherImg = document.createElement("img");
        weatherImg.id = `${type}${time}Weather-img`;
        weatherDesc = document.createElement("li");
        weatherDesc.id = `${type}${time}WeatherDesc-li`;
        if (type == "hour") {
            hourlyTempText = document.createElement("li");
            hourlyTempText.id = `${type}${time}TempText-li`;
        } else {
            minTempText = document.createElement("li");
            minTempText.id = `${type}${time}MinTempText-li`;
            maxTempText = document.createElement("li");
            maxTempText.id = `${type}${time}MaxTempText-li`;
        }
    } else {
        weatherUl = document.querySelector(`#${type}${time}Weather-ul`);
        timeText = document.querySelector(`#${type}${time}Time-li`);
        weatherImg = document.querySelector(`#${type}${time}Weather-img`);
        weatherDesc = document.querySelector(`#${type}${time}WeatherDesc-li`);
        if (type == "hour") {
            hourlyTempText = document.querySelector(`#${type}${time}TempText-li`);
        } else {
            minTempText = document.querySelector(`#${type}${time}MinTempText-li`);
            maxTempText = document.querySelector(`#${type}${time}MaxTempText-li`);
        }
    }

    // edit elements
    const convertedTime = convertFromUTC(utcOffset, data.dt);
    weatherImg.src = displayWeatherImg(convertedTime, data.weather[0].description, type);
    weatherDesc.textContent = capitalizeStart(data.weather[0].description);
    if (type == "hour") {
        const displayedTime = sliceTime(convertedTime);
        timeText.textContent = displayedTime;
        hourlyTempText.textContent = (unit == "metric") ? roundTemp(data.temp) + "°C" 
                                                            : roundTemp(data.temp) + "°F";
    } else {
        const displayedTime = sliceDate(convertedTime);
        timeText.textContent = displayedTime;
        minTempText.textContent = (unit == "metric") ? "Min: " + roundTemp(data.temp.min) + "°C" 
                                                        : "Min: " + roundTemp(data.temp.min) + "°F";
        maxTempText.textContent = (unit == "metric") ? "Max: " + roundTemp(data.temp.max) + "°C" 
                                                        : "Max: " + roundTemp(data.temp.max) + "°F";
    }

    weatherUl.appendChild(timeText);
    weatherUl.appendChild(weatherImg);
    weatherUl.appendChild(weatherDesc);
    if (type == "hour") {
        weatherUl.appendChild(hourlyTempText);
    } else {
        weatherUl.appendChild(minTempText);
        weatherUl.appendChild(maxTempText);
    }
    intervalContainer.appendChild(weatherUl);
}

// check for day/night & description
// returns the url for the img
function displayWeatherImg(convertedTime, weatherDesc, type) {
    const description = weatherDesc.toLowerCase();
    const status = (type == "hour") ? dayOrNight(convertedTime) : "day";
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

function changeAllUnitDisplay(unit) {
    const currTempText = document.querySelector("#currTempText-li");
    changeElementUnitDisplay(currTempText, unit);
    const currFeelsLikeText = document.querySelector("#currFeelsLike-li");
    changeElementUnitDisplay(currFeelsLikeText, unit);

    for (let hour = 1; hour < 25; hour++) {
        const hourText = document.querySelector(`#hour${hour}TempText-li`);
        changeElementUnitDisplay(hourText, unit);
    }
    for (let day = 1; day < 8; day++) {
        const dayMinText = document.querySelector(`#day${day}MinTempText-li`);
        changeElementUnitDisplay(dayMinText, unit);
        const dayMaxText = document.querySelector(`#day${day}MaxTempText-li`);
        changeElementUnitDisplay(dayMaxText, unit);
    }
}

function changeElementUnitDisplay(element, unit) {
    const convertedTemp = convertTemp(element, unit);
    const convertedTempWithUnit = (unit == "metric") ? convertedTemp + "°C" : convertedTemp + "°F";
    if (element.textContent.includes("Min")) {
        element.textContent = `Min: ${convertedTempWithUnit}`;
    } else if (element.textContent.includes("Max")) {
        element.textContent = `Max: ${convertedTempWithUnit}`;
    } else {
        element.textContent = convertedTempWithUnit;
    }
}

export { displayInfo, changeAllUnitDisplay } 