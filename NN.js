class NeuralNetwork {
    constructor(nNeurons, nLayers, nOutputs, randomInitWeightScale, randomInitBiasScale) {
        this.nNeurons = nNeurons;
        this.nLayers = nLayers;
        this.nOutputs = nOutputs;
        this.randomInitWeightScale = randomInitWeightScale;
        this.randomInitBiasScale = randomInitBiasScale;
        this.layerWeights = [];
        this.layerBiases = [];
        this.layerActivations = [];
        this.initializeNetwork();
    }

    initializeNetwork() {
        for (let i = 0; i < this.nLayers; i++) {
            let layerValues = [];
            let neuronCount = this.nNeurons;
            if (i === this.nLayers - 1) {
                neuronCount = this.nOutputs;
            }
            for (let j = 0; j < neuronCount; j++) {
                let neuronValues = [];
                let inputSize = this.nNeurons;
                if (i === 0) {
                    inputSize = 2;
                }
                for (let k = 0; k < inputSize; k++) {
                    neuronValues.push(Math.random() * (2 * this.randomInitWeightScale) - this.randomInitWeightScale);
                }
                layerValues.push(neuronValues);
            }
            this.layerWeights.push(layerValues);
        }
        console.log(this.layerWeights);


        for (let i = 0; i < this.nLayers; i++) {
            let layerValues = [];
            if (i === this.nLayers - 1) {
                for (let j = 0; j < this.nOutputs; j++) {
                    layerValues.push(Math.random() * (2 * this.randomInitBiasScale) - this.randomInitBiasScale);
                }
            } else {
                for (let j = 0; j < this.nNeurons; j++) {
                    layerValues.push(Math.random() * (2 * this.randomInitBiasScale) - this.randomInitBiasScale);
                }
            }
            this.layerBiases.push(layerValues);
        }

        for (let i = 0; i < this.nLayers - 1; i++) {
            this.layerActivations.push(this.tanHActivation)
        }
        this.layerActivations.push(this.sigmoidActivation)
    }

    forward(input) {
        for (let i = 0; i < this.nLayers; i++) {
            input = this.passThroughLayer(input, i);
            input = this.layerActivations[i](input);
        }
        return input;
    }

    tanHActivation(input) {
        let product = [];
        for (let i = 0; i < input.length; i++) {
            product.push(Math.tanh(input[i]));
        }
        return product;
    }

    sigmoidActivation(input) {
        let product = [];
        for (let i = 0; i < input.length; i++) {
            product.push(1 / (1 + Math.exp(-input[i])));
        }
        return product;
    }

    passThroughLayer(input, layerId) {
        let product = [];
        for (let i = 0; i < this.layerWeights[layerId].length; i++) {
            let semiProduct = 0;
            for (let j = 0; j < input.length; j++) {
                semiProduct += input[j] * this.layerWeights[layerId][i][j];
            }
            product.push(semiProduct + this.layerBiases[layerId][i]);
        }
        return product;
    }

    dot (a, b) {
        let product = 0;
        for (let i = 0; i < a.length; i++) {
            product += a[i] * b[i];
        }
        return product;
    }

    matrixAddition(a, b) {
        let product = [];
        for (let i = 0; i < a.length; i++) {
            product.push(a[i] + b[i]);
        }
        return product;
    }
}