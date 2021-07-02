import React from 'react';
import { Line } from 'react-chartjs-2';

const data = (interactionStatistics) => {
    return {
        labels: interactionStatistics.map((viewer) => viewer.label),
        datasets: [
            {
                label: '# of Likes',
                data: interactionStatistics.map((viewer) => viewer.liked),
                fill: false,
                backgroundColor: 'red',
                borderColor: 'red',
            },
            {
                label: '# of Interested',
                data: interactionStatistics.map((viewer) => viewer.interested),
                fill: false,
                backgroundColor: 'green',
                borderColor: 'green',
            },
            {
                label: '# of Going',
                data: interactionStatistics.map((viewer) => viewer.going),
                fill: false,
                backgroundColor: 'blue',
                borderColor: 'blue',
            },
        ],
    };
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

const InteractionChart = (props) => {
    const interactionStatistics = props.interactionStatistics;
    return (
        <>
            <div className="header">
                <h6 className="title">POSTS INTERACTIONS OF LAST 6 MONTHS</h6>
                <div className="links">
                    <a className="btn btn-gh" href="https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/Line.js">
                        Github Source
                    </a>
                </div>
            </div>
            <Line data={data(interactionStatistics)} options={options} />
        </>
    );
};

export default InteractionChart;
