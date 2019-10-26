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

    let Range = Math.ceil(Math.max(Math.abs(Math.min(...Data)), Math.abs(Math.max(...Data))));

    return [Data, Range, incrementData];
};

//Animation
//setting params
let Params = {
    frameRate: 1000,
    markerSize: 9
};

let flight = document.getElementById('flight');
let coin = document.getElementById('coin');
let stepWidthData; //stores step width data that is useful in the counting functionality


Plotly.newPlot(flight, {
    data: [{
        mode: 'markers',
        type: 'scatter',
        x: [0],
        y: [0],
        marker: {size: Params.markerSize},
        name: 'pointer'}
    ], layout: {
        xaxis: {range: [-5, 5]}
    }}, {}, {showSendToCloud:true});

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
            easing: 'cubic-in-out'
        }, frame: {duration: Params.frameRate,
        redraw: false}
    });
};

//buttons and sliders
function startAnimation(stepNumber=5000) {
    console.time('timer1');

    let i = 1;
    let info = dataPreparation(stepNumber);
    let Data = info[0];
    incrementData = info[2]

    Plotly.newPlot(flight, {
        data: [{
            mode: 'markers',
            type: 'scatter',
            name: 'pointer',
            x: [Data[0]],
            y: [0],
            marker: {size: Params.markerSize}
        }], layout: {
            xaxis: {range: [-5, 5]}
        }}, {}, {showSendToCloud:true});

    while (i < stepNumber + 1) {
        tracing(i, Data);
        i++;
    };

    animeData = info.slice(0, 2);
    stepWidthData = incrementData;

    console.timeEnd('timer1');
};

function toss(value) {
    if (value === 1) {
        coin.src = "Pound_coin_front.png";
    }
    else if (value === -1) {
        coin.src = "Pound_coin_back.png";
    }
};

/*function tossAnime() {
    coin.src='./Pound_coin_front.png';
    setTimeout(function() {
        coin.src='./Pound_coin_back.png'
    }, 1);
}

function generateToss() {
    let n = 0;
    let tempID = setInterval(function() {
        tossAnime();
        n+=1;
        if (n>150) {
            clearInterval(tempID);
        }
    }, 2)
}*/

startAnimation();

/*let n = 0;
setInterval(function() {
    toss(stepWidthData[n]);
    n+=1;
}, 1000);*/