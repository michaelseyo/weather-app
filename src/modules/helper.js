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

export { roundTemp, capitalizeEveryStart, capitalizeStart }