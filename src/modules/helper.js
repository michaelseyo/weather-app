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

// converts from UTC time to local time
function convertFromUTC(utcOffset) {
    const utcTime = Date.now();
    const localTime = utcTime + utcOffset * 1000; 
    const localTimeStr = new Date(localTime).toUTCString();
    const result = cleanString(localTimeStr);
    return result;
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

// pre-cond: takes in HH:MM:SS format 
// post-cond: returns 12h format
function convertTo12h(time) {
    const arr = time.split(":");
    const hour = (arr[0] != '12') ? arr[0] % 12 : 12;
    const min = arr[1];
    const signature = (arr[0] >= 12) ? "pm" : "am";
    const result = hour + ":" + min + signature;
    return result;
}


export { roundTemp, capitalizeEveryStart, capitalizeStart, convertFromUTC }