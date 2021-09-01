let buttonRegenerate;
let inputNNeurons;
let inputNLayers;
let inputWeightScaling;
let inputBiasScaling;

function initializeUI() {
    fill(0);
    textSize(20);
    buttonRegenerate = createButton("Regenerate")
    buttonRegenerate.position((windowWidth - buttonRegenerate.width)/2, windowHeight - 150);
    buttonRegenerate.mousePressed(regenerate);

    //
    inputNNeurons = createInput(nNeurons.toString());
    inputNNeurons.position((width - inputNNeurons.width)/2 - 300, height - 100);

    text("Number of neurons", (width - inputNNeurons.width)/2 - 300, height - 110);

    //
    inputNLayers = createInput(nLayers.toString());
    inputNLayers.position((width - inputNLayers.width)/2 - 100, height - 100);

    text("Number of layers", (width - inputNLayers.width)/2 - 100, height - 110);

    //
    inputWeightScaling = createInput(weightScaling.toString());
    inputWeightScaling.position((width - inputWeightScaling.width)/2 + 100, height - 100);

    text("Weight scaling", (width - inputWeightScaling.width)/2 + 100, height - 110);

    //
    inputBiasScaling = createInput(biasScaling.toString());
    inputBiasScaling.position((width - inputBiasScaling.width)/2 + 300, height - 100);

    text("Bias scaling", (width - inputBiasScaling.width)/2 + 300, height - 110);
}

function getParams() {
    return [inputNNeurons.value(), inputNLayers.value(), inputWeightScaling.value(), inputBiasScaling.value()];
}