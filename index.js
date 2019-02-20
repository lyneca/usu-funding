var chartjs = require('chart.js');

function getOldPoints(price) {
    return [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((x) => {
        return { x: x, y: x * 6 }
    })
}

function getNewPoints(price) {
    return [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((x) => {
        return { x: x, y: price * 0.3 + x }
    })
}

function getLine(price) {
    return [
        { x: 0, y: price },
        { x: 100, y: price },
    ]
}

let ctx = document.getElementById('canvas').getContext('2d');

let input = document.getElementById('price-range');
let breakEvenNew = document.getElementById('break-even-new');
let breakEvenOld = document.getElementById('break-even-old');
let percentRefunded = document.getElementById('percent-refunded');
let priceSpan = document.getElementById('price');

let chart = new chartjs.Chart(ctx, {
    type: 'line',
    data: {
        labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        datasets: [
            {
                label: "Old Funding",
                data: getOldPoints(input.value),
                backgroundColor: "rgba(0, 0, 255, 0.9)",
                borderColor: "rgba(0, 0, 255, 0.9)",
                fill: false
            },
            {
                label: "New Funding",
                data: getNewPoints(input.value),
                backgroundColor: "rgba(255, 0, 0, 0.9)",
                borderColor: "rgba(255, 0, 0, 0.9)",
                fill: false
            },
            {
                label: "Event Price",
                data: getLine(input.value)
            }
        ]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: `USU funding provided for \$${input.value} event`
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: "USU Members Attending"
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: "Amount Refunded"
                }
            }]

        }
    }
});

function updateData() {
    chart.options.title.text = `USU funding provided for \$${input.value} event`;
    chart.data.datasets[0].data = getOldPoints(input.value);
    chart.data.datasets[1].data = getNewPoints(input.value);
    chart.data.datasets[2].data = getLine(input.value);
    breakEvenOld.innerText = Math.ceil(input.value / 6);
    breakEvenNew.innerText = Math.ceil(input.value - (input.value * 0.3));
    percentRefunded.innerText = '$' + (input.value * 0.3).toFixed(2);
    chart.update()
}

input.oninput = updateData;

updateData();