/* Variables */

const red = document.querySelectorAll("[data-red] + .parameter_time_red");
const light_red = document.querySelector("[data-red]");
const yellow = document.querySelectorAll("[data-yellow] + .parameter_time_yellow");
const light_yellow = document.querySelector("[data-yellow]");
const green = document.querySelectorAll("[data-green] + .parameter_time_green");
const light_green = document.querySelector("[data-green]");
const yellow_alert = document.querySelector("[data-alert]");
const selector = document.querySelector("select");
const pause = document.getElementById("pause");
const checkbox = document.querySelector('[type="checkbox"]');
const circles = document.querySelectorAll(".circle");
const typeBoxes = document.querySelectorAll('[type="number"]');
const red_input = document.querySelector('#red_input');
const yellow_input = document.querySelector('#yellow_input');
const green_input = document.querySelector('#green_input');
let lenAll = document.querySelector("#lenAll");
let dblClick = document.querySelector(".dblClick");
let onlyValueNumbers = document.querySelector("input[name='quantity']");
const lineMain = document.getElementsByClassName('line');
const elementHidden = document.getElementsByClassName('hidden');
const lineRed = document.getElementsByClassName('line_red');
const lineYellow = document.getElementsByClassName('line_yellow');
const lineGreen = document.getElementsByClassName('line_green');
let bool = true;
const parameter_time_red = document.querySelector(".parameter_time_red");
const parameter_time_yellow = document.querySelector(".parameter_time_yellow");
const parameter_time_green = document.querySelector(".parameter_time_green");

/* Temporary values default */

const ALERT_Y = 0.4;
const RED_K = 0.5;
const YELLOW_K = 0.25;
const GREEN_K = 0.25;
lenAll.value = 10;
red_input.value = lenAll.value;
yellow_input.value = lenAll.value;
green_input.value = lenAll.value;
parameter_time_red.value = 5;
parameter_time_yellow.value = 2.5;
parameter_time_green.value = 2.5;
let len = 10;


/* The length values of the color animation */

let lenRed = len * RED_K;
let lenYellow = len * YELLOW_K;
let lenGreen = len * GREEN_K;
let lenAlertY = len * YELLOW_K;

/* Main traffic light animation */

function addAnimation() {
    lenRed = len * RED_K;
    lenYellow = len * YELLOW_K;
    lenGreen = len * GREEN_K;

    red.value = lenRed;
    yellow.value = lenYellow;
    green.value = lenGreen;

    light_red.style.animation = `_red ${len}s step-end infinite`;
    light_yellow.style.animation = `_yellow ${len}s step-end infinite`;
    light_green.style.animation = `_green ${len}s step-end infinite`;

}
addAnimation();


/* Red traffic light animation value */

function addAnimationRed() {
    lenRed = len * RED_K;
    red.value = lenRed;
    light_red.style.animation = `_red ${lenRed}s step-end infinite`;
}

/* Yellow traffic light animation value */

function addAnimationYellow() {
    lenYellow = len * YELLOW_K;
    yellow.value = lenYellow;
    light_yellow.style.animation = `_yellow ${lenYellow}s step-end infinite`;
}

/* Green traffic light animation value */

function addAnimationGreen() {
    lenGreen = len * GREEN_K;
    green.value = lenGreen;
    light_green.style.animation = `_green ${lenGreen}s step-end infinite`;
}

/*  Cheking numbers  */

onlyValueNumbers.addEventListener("change", function () {
    if (this.value < 1) this.value = 0;
    else this.value = Math.floor(this.value);
})

/* Setting the total length of the animation */

function LengthAnimationAll() {
    lenAll.addEventListener("input", (event) => {
        cleanInputs();
        len = event.target.value;
        addAnimation();
        bool == false;
        selector.selectedIndex = 0;
        dblClick.style.animation = `none`;
        dblClick.style.backgroundColor = "rgb(10, 226, 10)";
        resetInputsCycle()
        countInputsAfter();
        chart();

    })
}
LengthAnimationAll();

/* Setting timing parameters value the length of the animation to red light */

parameter_time_red.addEventListener("input", (event) => {
    len = validation(event) / RED_K;
    event.value = '';
    selector.selectedIndex = 0;
    resetInputsCycle()
    resetButton();
    calculationInputY();
    addAnimationRed();
    calculateInputs();
    valueIsParameter();
    chart();
});

/* Setting timing parameters value the length of the animation to yellow light */

parameter_time_yellow.addEventListener("input", (event) => {
    len = validation(event) / YELLOW_K;
    event.value = '';
    selector.selectedIndex = 0;
    resetInputsCycle()
    resetButton();
    calculationInputR();
    addAnimationYellow();
    calculateInputs();
    valueIsParameter();
    chart();
});

/* Setting timing parameters value the length of the animation to green light */

parameter_time_green.addEventListener("input", (event) => {
    len = validation(event) / GREEN_K;
    event.value = '';
    selector.selectedIndex = 0;
    resetInputsCycle()
    resetButton();
    calculationInputG();
    addAnimationGreen();
    calculateInputs();
    valueIsParameter();
    chart();
});

/* calculating inputs */


function calculateInputs() {
    let r = +parameter_time_red.value;
    let y = +parameter_time_yellow.value;
    let g = +parameter_time_green.value;
    let i = (r + y + g);
    let a = +lenAll.value;
    lenAll.value = i;

}

/* counting values inputs after change */

function countInputsAfter() {
    parameter_time_red.value = lenAll.value / 2;
    parameter_time_yellow.value = lenAll.value / 4;
    parameter_time_green.value = lenAll.value / 4;

}

/* Cleaning inputs */

function cleanInputs() {
    parameter_time_red.value = "";
    parameter_time_yellow.value = "";
    parameter_time_green.value = "";
}

/* Cleaning animation setup */

function calculateAnimation() {
    light_green.style.animation = "";
    light_red.style.animation = "";
    light_yellow.style.animation = "";
}

/* Replacing  function */

function validation(e) {
    const val = +e.target.value.replace(/[^\d]/g, "");
    e.target.value = val;
    return val;
}

/* Activate checkbox */

checkbox.addEventListener("click", (e) => {
    const isHidden = e.target.checked;
    typeBoxes.forEach((e) => {
        e.style.display = isHidden ? "none" : "block";
        const a = document.querySelector(".parameter_time_red");
        const d = document.querySelector(".parameter_time_yellow");
        const c = document.querySelector(".parameter_time_green");
        a.style.display = isHidden ? "none" : "inline-block";
        d.style.display = isHidden ? "none" : "inline-block";
        c.style.display = isHidden ? "none" : "inline-block";
        red_input.style.display = isHidden ? "none" : "inline-block";
        yellow_input.style.display = isHidden ? "none" : "inline-block";
        green_input.style.display = isHidden ? "none" : "inline-block";
    });


});

/* To select the operating mode */

selector.addEventListener("change", (e) => {
    if (e.target.value === "off") {
        circles.forEach((e) => {
            e.style.animation = "";
            cleanInputs();
            lenAll.value = "";
            resetInputsCycle()
        });
    } else if (e.target.value === "standby") {
        calculateAnimation();
        len = 10;
        yellow_alert.style.animation = `_alert ${len}s step-end infinite`;
        lenAll.value = "";
        resetInputsCycle()
        chart()
    } else {
        cleanInputs();
        lenAll.value = 10;
        countInputsAfter();
        len = 10;
        addAnimation();
        resetInputsCycle()
        chart();
    }
});

/* Calculation red_input */

function calculationInputR() {
    let r = parameter_time_red.value;
    let y = parameter_time_yellow.value;
    let g = parameter_time_green.value;
    for (let i = 0; i < y; i++) {
        cleanInputs();
        r = Math.abs((lenAll.value - y) / 2);
        g = r;
        light_green.style.animation = `_green ${g}s step-end infinite`;
        light_red.style.animation = `_red ${r}s step-end infinite`;
        light_yellow.style.animation = `_yellow ${y}s step-end infinite`;
    }
    parameter_time_red.value = r;
    parameter_time_yellow.value = y;
    parameter_time_green.value = g;

    LengthAnimationAll();
}

/* Calculation yellow_input */

function calculationInputY() {
    let r = parameter_time_red.value;
    let y = parameter_time_yellow.value;
    let g = parameter_time_green.value;
    for (let i = 0; i < r; i++) {
        cleanInputs();
        y = Math.abs((lenAll.value - r) / 2);
        g = y;
        light_red.style.animation = `_red ${r}s step-end infinite`;
        light_green.style.animation = `_green ${g}s step-end infinite`;
        light_yellow.style.animation = `_yellow ${y}s step-end infinite`;
    }
    parameter_time_red.value = r;
    parameter_time_yellow.value = y;
    parameter_time_green.value = g;

    LengthAnimationAll();
}

/* Calculation green_input */

function calculationInputG() {
    let r = parameter_time_red.value;
    let y = parameter_time_yellow.value;
    let g = parameter_time_green.value;
    for (let i = 0; i < g; i++) {
        cleanInputs();
        r = Math.abs((lenAll.value - g) / 2);
        y = r;
        light_green.style.animation = `_green ${g}s step-end infinite`;
        light_red.style.animation = `_red ${r}s step-end infinite`;
        light_yellow.style.animation = `_yellow ${y}s step-end infinite`;
    }
    parameter_time_red.value = r;
    parameter_time_yellow.value = y;
    parameter_time_green.value = g;
    resetInputsCycle()
    LengthAnimationAll();
}

/* Pause function + dabble-Click */

dblClick.addEventListener('click', (e) => {
    e.preventDefault();
    let paused = "paused";
    let running = "running";
    bool = !bool;
    if (bool == false) {
        light_red.style.animation = `${lenAll.value}s step-end 0s infinite normal none ${paused} _red `;
        light_yellow.style.animation = `${lenAll.value}s step-end 0s infinite normal none ${paused} _yellow `;
        light_green.style.animation = `${lenAll.value}s step-end 0s infinite normal none ${paused} _green `;
        yellow_alert.style.animation = `${lenAll.value}s step-end 0s infinite normal none ${paused} _yellow `;
        dblClick.innerText = "Paused";
        dblClick.style.animation = `_alert ${len}s step-end infinite`;
        countInputsAfter();
        resetInputsCycle();
        chart();
    } else {
        light_red.style.animation = `${lenAll.value}s step-end 0s infinite normal none ${running} _red `;
        light_yellow.style.animation = `${lenAll.value}s step-end 0s infinite normal none ${running} _yellow `;
        light_green.style.animation = `${lenAll.value}s step-end 0s infinite normal none ${running} _green `;
        yellow_alert.style.animation = `${lenAll.value}s step-end 0s infinite normal none ${running} _yellow `;
        dblClick.innerText = "Play";
        dblClick.style.animation = `none`;
        dblClick.style.backgroundColor = "rgb(10, 226, 10);";
        countInputsAfter();
        resetInputsCycle();
        chart();
    }
});

/* Diagram */

function chart() {
    let redLineWidth = (100 * parameter_time_red.value / lenAll.value)
    let yellowLineWidth = (100 * parameter_time_yellow.value / lenAll.value)
    let greenLineWidth = (100 * parameter_time_green.value / lenAll.value)

    lineMain[0].setAttribute('data-before', `${lenAll.value}sec`)
    lineRed[0].style.width = `${redLineWidth}%`
    elementHidden[0].style.width = `${redLineWidth - yellowLineWidth}% `
    elementHidden[1].style.width = `${greenLineWidth}% `
    elementHidden[2].style.width = `${redLineWidth}% `
    lineYellow[0].style.width = `${yellowLineWidth}%`
    lineYellow[1].style.width = `${yellowLineWidth}%`
    lineGreen[0].style.width = `${greenLineWidth}%`
}
chart();

/* The default settings button */

function resetButton() {
    bool = true;
    dblClick.innerText = "Play";
    dblClick.style.animation = `none`;
    dblClick.style.backgroundColor = "rgb(10, 226, 10);";
}

/* The default settings for inputs cycle */

function resetInputsCycle() {
    red_input.value = lenAll.value;
    yellow_input.value = lenAll.value;
    green_input.value = lenAll.value;
}

/* changing Out after changing diagram inputs */

function valueIsParameter() {
    red_input.value = parameter_time_red.value;
    yellow_input.value = parameter_time_yellow.value;
    green_input.value = parameter_time_green.value;
}