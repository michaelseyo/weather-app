// Create module for search-bar when click (fetches data) or enter-key

function initSearch() {
    const searchBtn = document.querySelector("#search-icon");
    searchBtn.addEventListener("click", getData);
    searchBtn.addEventListener("keyup", function(event) {
        if (event.key == 'Enter') {
            getData(event);
        }
    });
}

async function getData(event) {
    event.preventDefault();
    try {
        const location = document.querySelector("#search-bar").value;
        console.log(location);
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=36b3c347e210c2acb6e17f82bab1563c`);
        const data = await response.json();
        console.log(data);
        const weatherData = data.main;
        console.log(weatherData);
    } catch (error) {
        console.log(error);
    }
}

export default initSearch;