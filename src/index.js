import { displayInfo }  from './modules/display'
import initSearch from './modules/search'
import { initUnitBtn, getUnit } from './modules/unit'

const API_KEY = '36b3c347e210c2acb6e17f82bab1563c';
const location = 'Singapore';

async function defaultLoad() {
    try {
        const unit = getUnit();
        const coordResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&exclude=minutes&appid=${API_KEY}`);
        const coordData = await coordResponse.json();
        const defaultCoord = coordData.coord;
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${defaultCoord.lat}&lon=${defaultCoord.lon}&units=${unit}&exclude=minutes&appid=${API_KEY}`);
        const data =  await weatherResponse.json();
        const weatherAndLoc = { data, location };
        displayInfo(weatherAndLoc, unit);
    } catch (error) {
        console.log(error);
    }
}

document.onload = defaultLoad();
initSearch();
initUnitBtn();