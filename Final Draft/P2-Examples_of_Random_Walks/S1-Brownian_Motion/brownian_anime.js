//mathematical engine

function erfinv(x){
    var z;
    var a  = 0.147;                                                   
    var the_sign_of_x;
    if(0==x) {
        the_sign_of_x = 0;
    } else if(x>0){
        the_sign_of_x = 1;
    } else {
        the_sign_of_x = -1;
    }

    if(0 != x) {
        var ln_1minus_x_sqrd = Math.log(1-x*x);
        var ln_1minusxx_by_a = ln_1minus_x_sqrd / a;
        var ln_1minusxx_by_2 = ln_1minus_x_sqrd / 2;
        var ln_etc_by2_plus2 = ln_1minusxx_by_2 + (2/(Math.PI * a));
        var first_sqrt = Math.sqrt((ln_etc_by2_plus2*ln_etc_by2_plus2)-ln_1minusxx_by_a);
        var second_sqrt = Math.sqrt(first_sqrt - ln_etc_by2_plus2);
        z = second_sqrt * the_sign_of_x;
    } else { // x is zero
        z = 0;
    }
return z;
}; //this function renders a good approximation of the erfinv function that is important in mathematically describing the normal distribution.

function gaussianFuncInv(p, sigma) {
    let mu = 50;
    let z = Math.sqrt(2) * sigma * erfinv(2*p-1) + mu;
    return z;
}; //this is the inverse of the normal distribution cdf.


function randomRange(minimum, maximum) {
    let z = (maximum - minimum) * Math.random() + minimum;
    return z;
}; //prepares a way to generate random numbers of uniform pdf in a given domain.

function getGaussianIncrement(stepNumber, sigma) {
    let r = [];
    let incrementData = [];
    for (i = 0; i < stepNumber; i++) {
        r.push(Math.random())
    };
    for (i = 0; i < r.length; i++) {
        if (r[i] < 0.05 && r[i] >= 0) {
            incrementData.push(randomRange(gaussianFuncInv(0.001, sigma), gaussianFuncInv(0.05, sigma)));
        } else if (r[i] < 0.1 && r[i] >= 0.05) {
            incrementData.push(randomRange(gaussianFuncInv(0.05, sigma), gaussianFuncInv(0.1, sigma)));
        } else if (r[i] < 0.15 && r[i] >= 0.1) {
            incrementData.push(randomRange(gaussianFuncInv(0.1, sigma), gaussianFuncInv(0.15, sigma)));
        } else if (r[i] < 0.2 && r[i] >= 0.15) {
            incrementData.push(randomRange(gaussianFuncInv(0.15, sigma), gaussianFuncInv(0.2, sigma)));
        } else if (r[i] < 0.25 && r[i] >= 0.2) {
            incrementData.push(randomRange(gaussianFuncInv(0.2, sigma), gaussianFuncInv(0.25, sigma)));
        } else if (r[i] < 0.3 && r[i] >= 0.25) {
            incrementData.push(randomRange(gaussianFuncInv(0.25, sigma), gaussianFuncInv(0.3, sigma)));
        } else if (r[i] < 0.35 && r[i] >= 0.3) {
            incrementData.push(randomRange(gaussianFuncInv(0.3, sigma), gaussianFuncInv(0.35, sigma)));
        } else if (r[i] < 0.4 && r[i] >= 0.35) {
            incrementData.push(randomRange(gaussianFuncInv(0.35, sigma), gaussianFuncInv(0.4, sigma)));
        } else if (r[i] < 0.45 && r[i] >= 0.4) {
            incrementData.push(randomRange(gaussianFuncInv(0.4, sigma), gaussianFuncInv(0.45, sigma)));
        } else if (r[i] < 0.5 && r[i] >= 0.45) {
            incrementData.push(randomRange(gaussianFuncInv(0.45, sigma), gaussianFuncInv(0.5, sigma)));
        } else if (r[i] < 0.55 && r[i] >= 0.5) {
            incrementData.push(randomRange(gaussianFuncInv(0.5, sigma), gaussianFuncInv(0.55, sigma)));
        } else if (r[i] < 0.6 && r[i] >= 0.55) {
            incrementData.push(randomRange(gaussianFuncInv(0.55, sigma), gaussianFuncInv(0.6, sigma)));
        } else if (r[i] < 0.65 && r[i] >= 0.6) {
            incrementData.push(randomRange(gaussianFuncInv(0.6, sigma), gaussianFuncInv(0.65, sigma)));
        } else if (r[i] < 0.7 && r[i] >= 0.65) {
            incrementData.push(randomRange(gaussianFuncInv(0.65, sigma), gaussianFuncInv(0.7, sigma)));
        } else if (r[i] < 0.75 && r[i] >= 0.7) {
            incrementData.push(randomRange(gaussianFuncInv(0.7, sigma), gaussianFuncInv(0.75, sigma)));
        } else if (r[i] < 0.8 && r[i] >= 0.75) {
            incrementData.push(randomRange(gaussianFuncInv(0.75, sigma), gaussianFuncInv(0.8, sigma)));
        } else if (r[i] < 0.85 && r[i] >= 0.8) {
            incrementData.push(randomRange(gaussianFuncInv(0.8, sigma), gaussianFuncInv(0.85, sigma)));
        } else if (r[i] < 0.9 && r[i] >= 0.85) {
            incrementData.push(randomRange(gaussianFuncInv(0.85, sigma), gaussianFuncInv(0.9, sigma)));
        } else if (r[i] < 0.95 && r[i] >= 0.9) {
            incrementData.push(randomRange(gaussianFuncInv(0.9, sigma), gaussianFuncInv(0.95, sigma)));
        } else {
            incrementData.push(randomRange(gaussianFuncInv(0.95, sigma), gaussianFuncInv(0.999, sigma)))};
    };
    return incrementData;
};

//Data Preparation

function dataPreparation(stepNumber, sigma) {
    incrementData = getGaussianIncrement(stepNumber, sigma);

    let angleData = [];
    for (let i = 0; i < stepNumber; i++) {
        angleData.push(2 * Math.PI * Math.random())
    };

    let xIncrementData = [];
    for (let i = 0; i < stepNumber; i++) {
        xValue = incrementData[i] * Math.cos(angleData[i]);
        xIncrementData.push(xValue);
    };

    let yIncrementData = [];
    for (let i = 0; i < stepNumber; i++) {
        yValue = incrementData[i] * Math.sin(angleData[i]);
        yIncrementData.push(yValue);
    };

    let xData = [0];
    for (let i = 0; i < stepNumber; i++) {
        newXValue = xData[xData.length - 1] + xIncrementData[i];
        xData.push(newXValue);
    };

    let yData = [0];
    for (let i = 0; i < stepNumber; i++) {
        newYValue = yData[yData.length - 1] + yIncrementData[i];
        yData.push(newYValue);
    };

    let xRange = Math.ceil(Math.max(Math.abs(Math.min(...xData)), Math.abs(Math.max(...xData))));

    let yRange = Math.ceil(Math.max(Math.abs(Math.min(...yData)), Math.abs(Math.max(...yData))));

    return [xData, yData, xRange, yRange, incrementData];
};

//Animation
//setting params
let Params = {
    frameRate: 150,
    markerSize: 9
};

let flight = document.getElementById('flight');
let animeData; //stores data generated by each call instance of the startAnimation() function
let stepWidthData; //stores step width data that is useful in the counting functionality
let pathButton = document.getElementById('path-button');
let initialPathButtonStatus = true;
let hasSkipped = false;
let sigmaSlider = document.getElementById('sigma-slider');
let sigma = 1;

Plotly.newPlot(flight, {
    data: [{
        mode: 'lines',
        type: 'scatter',
        x: [0],
        y: [0],
        name: 'path'
    },
    {
        mode: 'markers',
        type: 'scatter',
        x: [0],
        y: [0],
        marker: {size: Params.markerSize},
        name: 'pointer'
    }
    ], config: {responsive: true}}, {}, {showSendToCloud:true});

function tracing (i, xData, yData) {
    let newXData = xData.slice(0, i);
    let newYData = yData.slice(0, i);

    xRange = Math.ceil(Math.max(Math.abs(Math.min(...newXData)), Math.abs(Math.max(...newXData))));
    yRange = Math.ceil(Math.max(Math.abs(Math.min(...newYData)), Math.abs(Math.max(...newYData))));

    trace1 = {
        mode: 'lines',
        type: 'scatter',
        x: newXData,
        y: newYData,
    };

    trace2 = {
        mode: 'markers',
        type: 'scatter',
        x: [xData[i-1]],
        y: [yData[i-1]]
    };

    let data = [trace1, trace2];

    Plotly.animate(flight, {
        data: data,
        layout: {
            xaxis: {range: [-xRange, xRange]},
            yaxis: {range: [-yRange, yRange]}
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
function startAnimation(stepNumber=5000, sigma=sigmaSlider.value) {
    console.time('timer1');

    console.log(sigma);

    let i = 1;
    let info = dataPreparation(stepNumber, sigma);
    let xData = info[0];
    let yData = info[1];
    incrementData = info[4]

    Plotly.newPlot(flight, {
        data: [{
            mode: 'lines',
            type: 'scatter',
            name: 'path',
            x: [xData[0]],
            y: [yData[0]]
        }, {
            mode: 'markers',
            type: 'scatter',
            name: 'pointer',
            x: [xData[0]],
            y: [yData[0]],
            marker: {size: Params.markerSize}
        }], config: {responsive: true}}, {}, {showSendToCloud:true});

    Plotly.newPlot(graph, {
        data: [{
            mode: 'lines',
            type: 'scatter',
            x: getData(sigmaSlider.value)[0],
            y: getData(sigmaSlider.value)[1],
            name: 'expected pdf'
        }, {
            type: 'histogram',
            histnorm: 'probability density',
            name: 'observed histogram',
            x: []
        }],
        layout: {
            title: 'Probability Density Function of the Flight Step Width',
            xaxis: {
                range: [autoRangeMath(sigmaSlider.value)[0], autoRangeMath(sigmaSlider.value)[1]],
                title: {text: 'Step Width'}
            },
            yaxis: {
                range: [0, autoRangeMath(sigmaSlider.value)[2]],
                title: {text: 'Probability Density'}
            }
        }, config: {responsive: true}
    });

    while (i < stepNumber + 1) {
        tracing(i, xData, yData);
        i++;
    };

    animeData = info.slice(0, 4);
    stepWidthData = incrementData;
    initialPathButtonStatus = true;
    pathButton.innerHTML = 'hide path';
    pathButton.style.visibility = 'hidden';
    hasSkipped = false;
    sigmaSlider.disabled = true;

    console.timeEnd('timer1');
};

function stop() {
    if (typeof(animeData) === 'undefined') {
        alert("You haven't started the animation yet!")
    } else {

    Plotly.newPlot(flight, {
        data: [{
            mode: 'lines',
            type: 'scatter',
            x: [0],
            y: [0],
            name: 'path'
        },
        {
            mode: 'markers',
            type: 'scatter',
            x: [0],
            y: [0],
            marker: {size: Params.markerSize},
            name: 'pointer'
        }],
        layout: {
            xaxis: {range: [-1, 1]},
            yaxis: {range:  [-1, 1]}
        }, config: {responsive: true}}, {}, {showSendToCloud:true});

    Plotly.animate(graph, {
        data: [{
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
        }],
        layout: {
            title: 'Probability Density Function of the Flight Step Width',
            xaxis: {
                range: [46.28, 53.72],
                title: {text: 'Step Width'}
            },
            yaxis: {
                range: [0, 0.5319230405352435],
                title: {text: 'Probability Density'}
            }
        }
    }, {
        transition: {
            duration: 400,
            easing: 'cubic-in-out'
        }, frame: {
            duration: 500,
            redraw: false
        }
    })

    animeData = undefined;
    stepWidthData = undefined;
    initialPathButtonStatus = true;
    pathButton.innerHTML = 'hide path';
    pathButton.style.visibility = 'hidden';
    hasSkipped = false;
    sigmaSlider.disabled = false;
    sigmaSlider.value = 1;
    sigmaText.innerHTML = 'sigma: 1';
}
};

function skipAnimation(animationGraph=animeData) {
    if (typeof(animationGraph) === 'undefined') {
        alert("You haven't started the animation yet!")
    };

    let xData = animationGraph[0];
    let yData = animationGraph[1];
    let xRange = animationGraph[2];
    let yRange = animationGraph[3];
    let incrementData = stepWidthData;

    Plotly.newPlot(flight, {
        data: [{
            mode: 'lines',
            type: 'scatter',
            name: 'path',
            x: xData,
            y: yData,
        }, {
            mode: 'markers',
            type: 'scatter',
            name: 'pointer',
            x: [xData[xData.length-1]],
            y: [yData[yData.length-1]],
            marker: {size: Params.markerSize}
        }], layout: {
            xaxis: {range: [-xRange, xRange]},
            yaxis: {range: [-yRange, yRange]}}, config: {responsive: true}}, {}, {showSendToCloud:true});

    Plotly.react(graph, {
        data: [{
            mode: 'lines',
            type: 'scatter',
            name: 'expected pdf',
            x: getData(sigmaSlider.value)[0],
            y: getData(sigmaSlider.value)[1]
        }, {
            type: 'histogram',
            histnorm: 'probability density',
            name: 'observed histogram',
            x: incrementData,
            xbins: {
                start: autoRangeMath(sigmaSlider.value)[0],
                end: autoRangeMath(sigmaSlider.value)[1],
                size: (autoRangeMath(sigmaSlider.value)[1]-autoRangeMath(sigmaSlider.value)[0])/20
            }
        }], layout: {
            title: 'Probability Density Function of the Flight Step Width',
            xaxis: {
                range: [autoRangeMath(sigmaSlider.value)[0], autoRangeMath(sigmaSlider.value)[1]],
                title: {text: 'Step Width'}
            },
            yaxis: {title: {text: 'Probability Density'}}
        }
    });

    hasSkipped = true;
    pathButton.style.visibility = 'visible';
    pathButton.innerHTML = 'hide path';
    initialPathButtonStatus = true;
};

function hidePath(animationGraph=animeData) {
    if (typeof(animationGraph) === 'undefined') {
        alert("You haven't started the animation yet!")
    };

    let xData = animationGraph[0];
    let yData = animationGraph[1];
    let xRange = animationGraph[2];
    let yRange = animationGraph[3];

    Plotly.newPlot(flight, {
        data: [{
            mode: 'markers',
            type: 'scatter',
            name: 'path',
            x: xData,
            y: yData,
            marker: {size: 3}
        }, {
            mode: 'markers',
            type: 'scatter',
            name: 'pointer',
            x: [xData[xData.length-1]],
            y: [yData[yData.length-1]],
            marker: {size: Params.markerSize}
        }], layout: {
            xaxis: {range: [-xRange, xRange]},
            yaxis: {range: [-yRange, yRange]}}, config: {responsive: true}}, {}, {showSendToCloud:true});
};

pathButton.onclick = function() {
    if (typeof(animeData) === 'undefined') {
        alert("You haven't started the animation yet!")
    } else if (hasSkipped === true) {
        if (initialPathButtonStatus === true) {
            pathButton.innerHTML = 'show path';
            hidePath(animeData);
            initialPathButtonStatus = false;
        } else {
            pathButton.innerHTML = 'hide path';
            skipAnimation(animeData);
            initialPathButtonStatus = true;
        };
    };
};

sigmaSlider.oninput = function() {
    sigma = this.value;
};