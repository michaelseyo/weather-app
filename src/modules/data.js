import { getUnit } from './unit'
const API_KEY = '36b3c347e210c2acb6e17f82bab1563c';

// feature for celsius / farenheit option
async function getCoordAndLoc(event) {
    try {
        const location = document.querySelector("#search-bar").value;
        console.log("searched location: " + location);
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&exclude=minutely&appid=${API_KEY}`);
        const data = await response.json();
        console.log(data);
        const coord = data.coord;
        return { coord, location };
    } catch (error) {
        console.log(error);
    }
}

async function getWeatherAndLoc(event) {
    event.preventDefault();
    try {
        const unit = getUnit();
        const info = await getCoordAndLoc(event);
        const coord = info.coord; 
        const location = info.location;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&units=${unit}&exclude=minutely&appid=${API_KEY}`);
        const data = await response.json();
        return { data, location };
    } catch {
        console.log(error);
    }
}

export default getWeatherAndLoc