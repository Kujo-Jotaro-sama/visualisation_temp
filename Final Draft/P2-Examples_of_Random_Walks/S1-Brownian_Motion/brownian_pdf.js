let graph = document.getElementById('pdf');
let sigmaText = document.getElementById('sigma-text');

//pdf function
function gaussianPDF(x, sigma) {
    let mu = 50;
    let factor1 = 1 / Math.sqrt(2 * Math.pow(sigma, 2) * Math.PI);
    let factor2 = Math.exp(-(Math.pow((x-mu), 2) / (2 * Math.pow(sigma, 2))));
    return factor1 * factor2
};

function getData(sigma) {
    let xArray = [...Array(10001).keys()];
    xArray = xArray.map(function(element) {
        return element/100;
    });

    let yArray = xArray.map(function(element) {
        return gaussianPDF(element, sigma);
    });
    return [xArray, yArray]
};

//initial graph
let data0 = [{
    mode: 'lines',
    type: 'scatter',
    x: getData(1)[0],
    y: getData(1)[1],
    name: 'expected pdf'
}, {
    type: 'histogram',
    histnorm: 'probability density',
    name: 'observed histogram',
    x: []
}];

let layout = {
    title: 'Probability Density Function of the Flight Step Width',
    xaxis: {
        range: [46.28, 53.72],
        title: {text: 'Step Width'}
    },
    yaxis: {
        range: [0, 0.5319230405352435],
        title: {text: 'Probability Density'}
    }
};

Plotly.newPlot(graph, {
    data: data0,
    layout: layout,
    config: {responsive: true}
});

//animation logics for sliders
function updatePlot(sigma) {
    let data1 = [{
        mode: 'lines',
        type: 'scatter',
        x: getData(sigma)[0],
        y: getData(sigma)[1],
        name: 'expected pdf'
    }, {
        type: 'histogram',
        histnorm: 'probability density',
        name: 'observed histogram',
        x: []
    }];

    Plotly.animate(graph, {
        data: data1
    }, {
        transition: {
            duration: 0,
            easing: 'cubic-in-out'
        }, frame: {duration: 0,
        redraw: false}
    });
};

function autoRangeMath(sigma) {
    let xArray = getData(sigma)[0];
    let yArray = getData(sigma)[1];
    let yArrayReversed = [];
    for (i=yArray.length-1; i>=0; i--) {
        yArrayReversed.push(yArray[i]);
    };

    let yMax = Math.max(...yArray);
    let yUpperBoundValue = yMax/1000;
    let yMaxIndex = yArray.findIndex(function(value) {
        return value === yMax;
    });
    let xUpperBoundIndex = yArrayReversed.findIndex(function(value) {
        return value > yUpperBoundValue;
    });
    xUpperBoundIndex = yArrayReversed.length - xUpperBoundIndex;
    let xLowerBoundIndex = yMaxIndex - (xUpperBoundIndex - yMaxIndex);

    let xUpperBound = xArray[xUpperBoundIndex];
    let xLowerBound = xArray[xLowerBoundIndex];
    let yUpperBound = yMax * (4/3);

    return [xLowerBound, xUpperBound, yUpperBound];
};

function autoRange(sigma) {
    let xLowerBound = autoRangeMath(sigma)[0];
    let xUpperBound = autoRangeMath(sigma)[1];
    let yUpperBound = autoRangeMath(sigma)[2];

    Plotly.animate(graph, {
        layout: {
            xaxis: {range: [xLowerBound, xUpperBound]},
            yaxis: {range: [0, yUpperBound]}
        }
    }, {
        transition: {
            duration: 400,
            easing: 'linear-in-out'
        }, frame: {
            duration: 500,
            redraw: false
        }
    });
}

sigmaSlider.oninput = function() {
    let sigma = this.value;
    updatePlot(sigma);
    sigmaText.innerHTML = `sigma: ${this.value}`;
};

sigmaSlider.onmouseup = function() {
    let sigma = this.value;
    autoRange(sigma);
};