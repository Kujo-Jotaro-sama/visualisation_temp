let graph = document.getElementById('pdf');
let dText = document.getElementById('d-text');

//pdf function
function levyPDF(x, d) {
    let func = d * Math.pow(x, (-d-1));
    return func;
};

function getData(d) {
    let xArray = [...Array(4001).keys()];
    xArray.shift();
    xArray.unshift(0.0001);
    xArray = xArray.map(function(element) {
        return (element/100);
    });

    let yArray = xArray.map(function(element) {
        if (element<=1) {
            return 0;
        } else {
            return levyPDF(element, d);
        };
    });
    return [xArray, yArray]
};

//initial graph
let data0 = [{
    mode: 'lines',
    type: 'scatter',
    x: getData(0.5)[0],
    y: getData(0.5)[1],
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
        range: [0, 13.71],
        title: {text: 'Step Width'}
    },
    yaxis: {
        range: [0, 0.6567902245610489],
        title: {text: 'Probability Density'}
    }
};

Plotly.newPlot(graph, {
    data: data0,
    layout: layout,
    config: {responsive: true}
});

//animation logics for sliders
function updatePlot(d) {
    let data1 = [{
        mode: 'lines',
        type: 'scatter',
        x: getData(d)[0],
        y: getData(d)[1]
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

function autoRangeMath(d) {
    let xArray = getData(d)[0];
    let yArray = getData(d)[1];
    let yArrayReversed = [];
    for (i=yArray.length-1; i>=0; i--) {
        yArrayReversed.push(yArray[i]);
    };

    let yMax = Math.max(...yArray);
    let yUpperBoundValue = yMax/50;
    let yUpperBoundIndex = yArrayReversed.findIndex(function(value) {
        return value > yUpperBoundValue;
    });
    yUpperBoundIndex = 4001 - yUpperBoundIndex;

    let xUpperBound = xArray[yUpperBoundIndex];
    let yUpperBound = yMax * (4/3);

    console.log([xUpperBound, yUpperBound]);
    return [xUpperBound, yUpperBound];
};

function autoRange(d) {
    let xUpperBound = autoRangeMath(d)[0];
    let yUpperBound = autoRangeMath(d)[1];

    Plotly.animate(graph, {
        layout: {
            xaxis: {range: [0, xUpperBound]},
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

dSlider.oninput = function() {
    let d = this.value;
    updatePlot(d);
    dText.innerHTML = `d: ${this.value}`;
};

dSlider.onmouseup = function() {
    let d = this.value;
    autoRange(d);
};