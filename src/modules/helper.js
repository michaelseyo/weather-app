function roundTemp(temp) {
    return Math.round(temp * 1) / 1;
}


function capitalizeEveryStart(sentence) {
    const arr = sentence.split(" ");
    for (let i  = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    const result = arr.join(" ");
    return result;
}

function capitalizeStart(sentence) {
    return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}

// pre-cond: takes in utcOffset and dt from the api data
// converts from UTC time to local time and cleans up the string 
function convertFromUTC(utcOffset, dt) {
    const utcTime = dt * 1000;
    const localTime = utcTime + utcOffset * 1000; 
    const localTimeStr = new Date(localTime).toUTCString();
    const result = cleanString(localTimeStr);
    return result;
}

// pre-cond: takes in the convertFromUTC format 
// post-cond: gives only the time 
function sliceTime(convertedFromUTC) {
    const arr = convertedFromUTC.split(" ");
    return (arr[4] == "0:00am") ? "12:00am" : arr[4];
}

// pre-cond: takes in the convertFromUTC format 
// post-cond: gives only the date
function sliceDate(convertedFromUTC) {
    const arr = convertedFromUTC.split(" ");
    return arr.slice(0, 3).join(" ");
}

// pre-cond: takes in UTCString 
// post-cond: returns in e.g Sat 18 Dec 2021 5:55pm
function cleanString(str) {
    let result;
    result = str.replace("GMT", '');
    result = result.replace(',', '');
    const arr = result.split(" ");
    const time = arr[4];
    const formattedTime = convertTo12h(time);
    arr[4] = formattedTime;
    result = arr.join(" ");
    return result;
}

// pre-cond: takes in our cleanString output 
// post-cond: return night or day
function dayOrNight(convertedTime) {
    const arr = convertedTime.split(" ");
    const time = arr[4];
    const hour = time.split(":")[0];
    const signature = time.split(":")[1].slice(2);
    let status;
    if ((hour >= 7 && signature == "pm") || (hour <= 6 && signature == "am")) {
        status = "night";
    } else {
        status = "day";
    }
    return status;
}

// pre-cond: takes in HH:MM:SS format 
// post-cond: returns h:MM
function convertTo12h(time) {
    const arr = time.split(":");
    const hour = (arr[0] != '12') ? arr[0] % 12 : 12;
    const min = arr[1];
    const signature = (arr[0] >= 12) ? "pm" : "am";
    const result = hour + ":" + min + signature;
    return result;
}

function convertTemp(element, desiredUnit) {
    const text = element.textContent;
    const temp = text.match(/\d+/)[0];
    let convertedTemp;
    if (desiredUnit == "metric") {
        convertedTemp = fahrenheitToCelsius(temp);
    } else {
        convertedTemp = celsiusToFahrenheit(temp)
    }
    return convertedTemp;
}

function celsiusToFahrenheit(temp) {
    return roundTemp(temp * 1.8 + 32);
}

function fahrenheitToCelsius(temp) {
    return roundTemp((temp - 32) / 1.8);
}

export { roundTemp, capitalizeEveryStart, capitalizeStart, convertFromUTC, 
            dayOrNight, sliceTime, sliceDate, convertTemp }