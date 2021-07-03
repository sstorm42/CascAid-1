import React from 'react';
import { Line } from 'react-chartjs-2';

const data = (viewerStatistics) => {
    return {
        labels: viewerStatistics.map((viewer) => viewer.label),
        datasets: [
            {
                label: '# of Views',
                data: viewerStatistics.map((viewer) => viewer.views),
                fill: true,
                backgroundColor: '#5f9ea0',
                borderColor: '#5f9ea0',
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

const LineChart = (props) => {
    const viewerStatistics = props.viewerStatistics;
    console.log('🚀 ~ file: line-chart.js ~ line 33 ~ LineChart ~ viewerStatistics', viewerStatistics);
    return (
        <>
            <div className="header">
                <h6 className="title">POSTS VIEWS OF LAST 6 MONTHS</h6>
                <div className="links">
                    <a className="btn btn-gh" href="https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/Line.js">
                        Github Source
                    </a>
                </div>
            </div>
            <Line data={data(viewerStatistics)} options={options} />
        </>
    );
};

export default LineChart;
