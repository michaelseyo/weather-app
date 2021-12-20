import getWeatherAndLoc from './data'
import { displayInfo } from './display'
import { getUnit }  from './unit'

function initSearch() {
    const searchBtn = document.querySelector("#search-icon");
    const unit = getUnit();
    searchBtn.addEventListener("click", async (e) => {
        const weatherAndLoc = await getWeatherAndLoc(e);
        displayInfo(weatherAndLoc);
    });
    // for enter-key
    searchBtn.addEventListener("keyup", async (e) => {
        if (e.key == 'Enter') {
            const weatherAndLoc = await getWeatherAndLoc(e);
            displayInfo(weatherAndLoc);
        }
    });
}

export default initSearch