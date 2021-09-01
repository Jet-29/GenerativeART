let canvas;
let imageResolution = 512;
let model;
let nNeurons = 16;
let nLayers = 8;
let nOutput = 3;
let weightScaling = 1;
let biasScaling = 1;

function setup() {
    createAndSetupCanvas();
    model = new NeuralNetwork(nNeurons, nLayers, nOutput, weightScaling, biasScaling);
    loopThroughAllPixels(imageResolution, imageResolution);
    initializeUI();
}

function regenerate() {
    [nNeurons, nLayers, weightScaling, biasScaling] = getParams();
    model = new NeuralNetwork(nNeurons, nLayers, nOutput, weightScaling, biasScaling);
    loopThroughAllPixels(imageResolution, imageResolution);
}


function draw() {

}

function createAndSetupCanvas() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}

function getColourAtLocation(x , y) {
    return convertFloatToInt256(model.forward([x, y]));
}

function loopThroughAllPixels(imgResX, imgResY) {
    for (let i = 0; i < imgResY; i++) {
        for (let j = 0; j < imgResX; j++) {
            let x = j - imageResolution / 2;
            let y = i - imageResolution / 2;
            //let [x, y] = [j - imageResolution/2, i - imageResolution/2]
            [x, y] = normalizeInputs([x, y]);
            let colour = getColourAtLocation(x, y);
            drawPixels(width/2 - imageResolution/2 + j, height/2 - imageResolution/2 + i, colour);
        }
    }
}

function drawPixels(x, y, rgbValues) {
    noStroke();
    fill(rgbValues[0], rgbValues[1], rgbValues[2]);
    square(x, y, 1);
}

function denormalizeInputs(input) {
    return input.map(x => x * imageResolution);
}

function normalizeInputs(input) {
    return input.map(x => x / (imageResolution / 2))
}

function convertFloatToInt256(input) {
    return input.map(x => x * 256);
}