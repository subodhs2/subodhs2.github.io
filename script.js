// cache all the query selectors
var gradientBody = document.querySelector("#gradientBody");
var mainHeading = document.querySelector("h1");
var leftColor = document.querySelector("#leftColor");
var rightColor = document.querySelector("#rightColor");
var topColor = document.querySelector("#topColor");
var bottomColor = document.querySelector("#bottomColor");
var flowRight = document.querySelector("input[name=flowOption][id=toRight]");

var gradientValueDisplay = document.querySelector("#currentBackgroundValueDisplay");
var defaultGradient = "linear-gradient(to right, black, purple, transparent, blue, red)";
var currentGradient = defaultGradient;  // initializing current gradient.
var selectedOption; // declaring for later purpose.

var btnRandomize = document.querySelector("#btnRandomize");
var stopText = "Stop";
var goRandomizeText = "Go Randomize";
var disabledText = "disabled";
var pleaseWaitText = "Please Wait...";
var hexaDecimalNumbersArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
var randomizeIntervalId;    // to stop interval API.
var intervalHandlerRunCounter; 

// attaching event handlers/listeners

leftColor.addEventListener("input", changeBodyGradientHandler);

rightColor.addEventListener("input", changeBodyGradientHandler);

topColor.addEventListener("input", changeBodyGradientHandler);

bottomColor.addEventListener("input", changeBodyGradientHandler);

//

// public (potentially)

function onGradientBodyLoad() {
    // get default gradient on screen
    // display it on screen by default
    gradientBody.style.backgroundImage = currentGradient;
    displayGradientValue();
    flowRight.checked = true;
    selectedOption = flowRight.value;
    btnRandomize.innerText = goRandomizeText;
    intervalHandlerRunCounter = 0;
}

function onRandomizeClick(element) {
    if (element.innerText.toLowerCase() === goRandomizeText.toLowerCase()) {
        element.innerText = pleaseWaitText;
        element.setAttribute(disabledText, true);
        createRandomColorsAndAssign();
    } else {
        stopRandomizeInterval();
        element.innerText = goRandomizeText;
    }
}

function onFlowOptionClick(value) {
    selectedOption = value;
    handleFlowDirectionChange();
}

//

// private 

function stopRandomizeInterval() {
    intervalHandlerRunCounter = 0;
    clearInterval(randomizeIntervalId);
}

function createRandomColorsAndAssign() {
    randomizeIntervalId = setInterval(onCreateRandomColorsAndAssign, 3000, 6);
}

function onCreateRandomColorsAndAssign(length) {
    if (intervalHandlerRunCounter === 0) {
        btnRandomize.innerText = stopText;
        btnRandomize.removeAttribute(disabledText);
    }

    intervalHandlerRunCounter = intervalHandlerRunCounter + 1;

    leftColor.value = "#" + generateHexString(length);
    bottomColor.value = "#" + generateHexString(length);
    topColor.value = "#" + generateHexString(length);
    rightColor.value = "#" + generateHexString(length);

    changeBodyGradientHandler();
}


function generateHexString(length) {
    if (!length || length > 6) {
        length = 6;
    } else if (length < 3) {
        length = 3;
    }

    var text = '';
    var hexSystem = '0123456789ABCDEF';
    for (var i = 0; i < length; i++) {
        text += hexSystem[Math.floor(Math.random() * hexSystem.length)];
    }

    return text;
}

function handleFlowDirectionChange() {
    changeBodyGradientHandler();
}

function getFlowDirection() {
    return selectedOption === 'toRight' ? 'to right ,' : '';
}

function changeBodyGradientHandler() {
    applyGradientToBody(getFlowDirection(), leftColor, bottomColor, topColor, rightColor);
    displayGradientValue();
}

function displayGradientValue() {
    gradientValueDisplay.textContent = currentGradient;
}

function applyGradientToBody(direction, lColorElem, bColorElem, tColorElem, rColorElem) {
    currentGradient = createLinearGradient(direction, lColorElem.value, bColorElem.value, tColorElem.value, rColorElem.value);
    gradientBody.style.backgroundImage = currentGradient;
}

function createLinearGradient(direction, lColorElemValue, bColorElemValue, tColorElemValue, rColorElemValue) {
    return "linear-gradient(" + direction + lColorElemValue + ", " + bColorElemValue + ", transparent, " + tColorElemValue + ", " + rColorElemValue + ")";
}

//