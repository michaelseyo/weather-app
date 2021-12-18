function getUnit() {
    const metricBtn = document.querySelector("#metric");
    return (metricBtn.classList.contains("active")) ? "metric" : "imperial";
}

function initUnitBtn() {
    const btns = document.querySelectorAll("button");
    let activeBtn = document.querySelector("#metric");
    // pre-cond: must allow only 1 class to be active at a time  
    // Styling
    btns.forEach(btn => btn.addEventListener("click", (event) => {
        event.preventDefault();
        event.currentTarget.classList.add("active");
        if (activeBtn != event.currentTarget) {
            activeBtn.classList.remove("active");
        } 
        activeBtn = event.currentTarget;
    }));
}

export { getUnit, initUnitBtn }