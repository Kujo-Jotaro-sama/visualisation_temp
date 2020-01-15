//Data Preparation

function getIncrementData(stepNumber) {
    let r = [];
    let incrementData = [];
    for (i = 0; i < stepNumber; i++) {
        r.push(Math.random())
    };
    for (i = 0; i < stepNumber; i++) {
        if (r[i] < 0.5) {
            incrementData.push(1)
        } else {
            incrementData.push(-1)
        }
    };
    return incrementData;
}

function dataPreparation(stepNumber) {
    let incrementData = getIncrementData(stepNumber);

    let Data = [0];
    for (let i = 0; i < stepNumber; i++) {
        newValue = Data[Data.length - 1] + incrementData[i];
        Data.push(newValue);
    };

    return [Data, incrementData];
};

//Animation
//setting params
let Params = {
    frameRate: 1000,
    markerSize: 15
};

let coinFlip = {
    front: function() {
        coin.src = 'Pound_coin_front.png';
    },
    back: function() {
        coin.src = 'Pound_coin_back.png';
    }
}

let flight = document.getElementById('flight');
let graph = document.getElementById('graph');
let coin = document.getElementById('coin');
let tossOnceButton = document.getElementById('tossOnceButton');
let tossMultipleButton = document.getElementById('tossMultipleButton');
let numberOfTosses = document.getElementById('numberOfTosses');
let text = document.getElementById('text');
let hiddenText = document.getElementById('hiddenText');

let currentPos = 0;
let hasTriedMultiple = false;
let xData = [];

coin.style.width = "500px";
hiddenText.style.backgroundColor = 'black';
hiddenText.style.color = 'black';


Plotly.newPlot(flight, {
    data: [{
        mode: 'markers',
        type: 'scatter',
        x: [0],
        y: [0],
        marker: {size: Params.markerSize},
        name: 'pointer'}
    ], layout: {
        xaxis: {range: [-5, 5]},
    }, config: {responsive: true}}, {}, {showSendToCloud:true});

function tracing (i, Data) {
    let newData = Data.slice(0, i);

    Range = Math.ceil(Math.max(Math.abs(Math.min(...newData)), Math.abs(Math.max(...newData))));

    trace = {
        mode: 'markers',
        type: 'scatter',
        x: [Data[i-1]],
        y: [0]
    };

    let data = [trace];

    Plotly.animate(flight, {
        data: data,
        layout: {
            xaxis: {range: [Data[i-1]-5, Data[i-1]+5]}
        }
    }, {
        transition: {
            duration: Params.frameRate * 0.8,
            easing: 'linear-in-out'
        }, frame: {duration: Params.frameRate,
        redraw: false}
    });
};

//buttons and sliders

function coinTossOnce() {
    if (hasTriedMultiple === true) {
        if (confirm('This will wipe away the arrays you have generated. Is that okay?')) {
        Plotly.newPlot(flight, {
            data: [{
                mode: 'markers',
                type: 'scatter',
                x: [0],
                y: [0],
                marker: {size: Params.markerSize},
                name: 'pointer'}
            ], layout: {
                xaxis: {range: [-5, 5]},
            }, config: {responsive: true}}, {}, {showSendToCloud:true});
        hasTriedMultiple = false;

        coinTossOnceMechanism();
        };
    } else {
        coinTossOnceMechanism();
    };
};

function coinTossOnceMechanism() {
    xData = [];
    numberOfTosses.disabled = false;
    text.hidden = true;
    tossMultipleButton.innerHTML = 'Toss Multiple Times';

    Plotly.purge(graph);
    tossOnceButton.disabled = true;
    let info = dataPreparation(1);
    let incrementData = info[1];

    coinTossAnimate(incrementData[0]);

    walkData = [incrementData[0] + currentPos];

    setTimeout(function() {
        tracing(1, walkData);
        currentPos = walkData[0];
    }, 1000)

    setTimeout(function() {
        tossOnceButton.disabled = false;
    }, 2000);
}


function coinTossAnimate(value) {
    let coinFlipRate = 100;

    setTimeout(function() {
        coinFlip.front();
        setTimeout(function() {
            coinFlip.back();
            setTimeout(function() {
                coinFlip.front();
                setTimeout(function() {
                    coinFlip.back();
                    setTimeout(function() {
                        coinFlip.front();
                        setTimeout(function() {
                            coinFlip.back();
                            setTimeout(function() {
                                coinFlip.front();
                                setTimeout(function() {
                                    coinFlip.back();
                                }, coinFlipRate)
                            }, coinFlipRate)
                        }, coinFlipRate)
                    }, coinFlipRate)
                }, coinFlipRate)
            }, coinFlipRate)
        }, coinFlipRate)
    }, coinFlipRate)

    setTimeout(function() {
        if (value === 1) {
            coin.src = "Pound_coin_front.png";
        } else if (value === -1) {
            coin.src = "Pound_coin_back.png";
        };
    }, 850);
};

function submit() {
    numberOfTosses.disabled = true;

    if (numberOfTosses.value < 10) {
        numberOfTosses.value = 10;
    } else if (numberOfTosses.value > 1000) {
        numberOfTosses.value = 1000;
    } else if (!Number.isInteger(numberOfTosses.value)) {
        if (numberOfTosses.value - Math.floor(numberOfTosses.value) < 0.5) {
            numberOfTosses.value = Math.floor(numberOfTosses.value);
        } else {
            numberOfTosses.value = Math.ceil(numberOfTosses.value);
        };
    };

    tossMultipleButton.innerHTML = 'Toss ' + numberOfTosses.value + ' Times';
};

function coinTossMultiple() {
    if (numberOfTosses.disabled === false) {
        alert('Please select a number of tosses first!')
    } else {

    currentPos = 0;
    Plotly.purge(flight);
    hasTriedMultiple = true;
    tossMultipleButton.disabled = true;

    let value = numberOfTosses.value;

    coinTossAnimate(getIncrementData(1)[0]);

    setTimeout(function() {
        Plotly.newPlot(graph, {
            data: [{
                type: 'histogram',
                histnorm: '',
                name: 'Times traversing through a point',
                x: xData,
                xbins: {size: 1}
            }], layout: {
                title: 'Number of times the walker traverses through a point'
            }
        , config: {responsive: true}}, {}, {showSendToCloud:true});
    }, 1000)

    xData.push(dataPreparation(value)[0]);
    xData = flatDeep(xData);

    setTimeout(function() {
        tossMultipleButton.disabled = false;
    }, 1100);

    text.hidden = false;
};
};

function flatDeep(arr, d = Infinity) {
    return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
                 : arr.slice();
 };

function stop() {
    if (confirm('Are you sure you want to refresh this page?')) {
        xData = [];
        numberOfTosses.disabled = false;
        numberOfTosses.value = 100;
        text.hidden = true;
        tossMultipleButton.innerHTML = 'Toss Multiple Times';
        currentPos = 0;
        hasTriedMultiple = false;

        Plotly.newPlot(flight, {
            data: [{
                mode: 'markers',
                type: 'scatter',
                x: [0],
                y: [0],
                marker: {size: Params.markerSize},
                name: 'pointer'}
            ], layout: {
                xaxis: {range: [-5, 5]},
        }, config: {responsive: true}}, {}, {showSendToCloud:true});
    
        Plotly.purge(graph);
        coin.src = "Pound_coin_front.png";
    };
};

hiddenText.onmouseenter = function() {
    hiddenText.style.backgroundColor = 'transparent';
    hiddenText.style.color = 'red';
};

hiddenText.onmouseleave = function() {
    hiddenText.style.backgroundColor = 'black';
    hiddenText.style.color = 'black';
};
