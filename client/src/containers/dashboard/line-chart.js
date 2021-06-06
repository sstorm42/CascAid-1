import React from 'react';
import { Line } from 'react-chartjs-2';

const data = {
    labels: ['December 20', 'January 21', 'February 21', 'March 21', 'April 21', 'May 21'],
    datasets: [
        {
            label: '# of Views',
            data: [120, 190, 300, 500, 2000, 3],
            fill: true,
            backgroundColor: '#5f9ea0',
            borderColor: '#5f9ea0',
        },
    ],
};

const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};

const LineChart = () => (
    <>
        <div className="header">
            <h6 className="title">POSTS VIEWS OF LAST 6 MONTH</h6>
            <div className="links">
                <a className="btn btn-gh" href="https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/Line.js">
                    Github Source
                </a>
            </div>
        </div>
        <Line data={data} options={options} />
    </>
);

export default LineChart;
