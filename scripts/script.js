const G_DIMENSION_ARRAY = [8, 16, 32, 48, 64, 72];

let gDimension;
let gTintMode;
let gRandomMode;

function addGridListener () {
    const gridBoxes = document.querySelectorAll('.grid-box');
    gridBoxes.forEach(gridBox => { 
        gridBox.addEventListener('mouseover', e => {
            if (gTintMode) {
                darkenGridBoxColor(e.target.id);
            } else if (gRandomMode) {
                setGridBoxColor(e.target.id, generateRandomColor());
            } else {
                setGridBoxColor(e.target.id, 'black');
            };
        });
    });
};

function addNewGridListener() {
    const newGridButton = document.querySelector('#new-grid-button');
    newGridButton.addEventListener('click', newCanvas);
}

function addRandomModeListener() {
    const randomButton = document.querySelector('#random-button');
    randomButton.addEventListener('click', toggleRandomMode);
};

function addSliderBarListener() {
    const sliderBar = document.querySelector('#slider-bar');
    sliderBar.addEventListener('input', setDimensionDisplay)
}

function addTintModeListener() {
    const tintButton = document.querySelector('#tint-button');
    tintButton.addEventListener('click', toggleTintMode);
};

function darkenGridBoxColor(gridBoxID) {
    const gridBox = document.getElementById(gridBoxID);
    gridBox.style.filter = `brightness(${getGridBoxBrightness(gridBoxID) - 3}%)`;
}

function drawGrid(dimension = 16) {
    const sketchBox = document.getElementById('sketch-box');
    sketchBox.innerHTML = ``;
    let idx = 0;
    for (let i = 1; i <= dimension; i++) {
        for (let j = 1; j <= dimension; j++) {
            const gridBox = document.createElement('div');
            gridBox.classList.add('grid-box');
            gridBox.id = idx;
            idx++;
            gridBox.style.filter = "brightness(100%)";
            gridBox.style.minWidth = `${640 / dimension}px`;
            gridBox.style.height = `${640 / dimension}px`;
            sketchBox.appendChild(gridBox);
        };
    };
};

function generateRandomColor() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);

    return `rgb(${r}, ${g}, ${b})` 
};

function getGridBoxBrightness(gridBoxID) {
    const gridBox = document.getElementById(gridBoxID);
    return parseInt(gridBox.style.filter.match(/\d+/)[0]);
}

function getSliderBarValueAsIndex() {
    const sliderBar = document.getElementById('slider-bar');
    return sliderBar.value - 1;
};

function newCanvas() {
    gDimension = G_DIMENSION_ARRAY[getSliderBarValueAsIndex()];
    if (gTintMode) {toggleTintMode()};
    if (gRandomMode) {toggleRandomMode()};
    drawGrid(gDimension);

    addGridListener();
    addNewGridListener();
    addRandomModeListener();
    addSliderBarListener();
    addTintModeListener();
}

function setDimensionDisplay() {
    gDimension = G_DIMENSION_ARRAY[getSliderBarValueAsIndex()];
    dimensionDisplay = document.getElementById('dimension-display');
    dimensionDisplay.textContent = `${gDimension} x ${gDimension}`;
};

function setGridBoxColor(gridBoxID, color) {
    const gridBox = document.getElementById(gridBoxID);
    gridBox.style.filter = 'brightness(100%)'
    gridBox.style.backgroundColor = color;
};

function toggleTintMode () {
    const tintButton = document.getElementById('tint-button');
    if (gRandomMode) {toggleRandomMode()};
    if (gTintMode) {
        tintButton.classList.remove('enabled');
        gTintMode = false;
    } else {
        tintButton.classList.add('enabled');
        gTintMode = true;
    };
};

function toggleRandomMode () {
    const randomButton = document.getElementById('random-button');
    if (gTintMode) {toggleTintMode()};
    if (gRandomMode) {
        randomButton.classList.remove('enabled');
        gRandomMode = false;
    } else {
        randomButton.classList.add('enabled');
        gRandomMode = true;
    };
};


newCanvas();

