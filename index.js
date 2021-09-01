let canvas;
let imageResolution = 512;
let model = new NeuralNetwork(16, 8, 3, 1, 0);

function setup() {
    createAndSetupCanvas();
    loopThroughAllPixels(imageResolution, imageResolution);
}


function draw() {

}

function createAndSetupCanvas() {
    canvas = createCanvas(imageResolution, imageResolution);
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
            drawPixels(j, i, colour);
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