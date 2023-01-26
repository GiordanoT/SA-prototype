import React from 'react';
import "./charts.scss";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface IProps {label: string, data: Map<string, number>}
function LineChart(props: IProps) {

    const options = {
        responsive: true,
        animation: {duration: 0.2},
        plugins: { legend: {display: false} },
        scales: { y: { max: 100, min: 0, ticks: { stepSize: 20 } } }
    };
    const data = {
        labels: [...props.data.keys()],
        datasets: [
            {
                label: props.label,
                data: [...props.data.values()],
                borderColor: 'rgb(91, 225, 44)',
                backgroundColor: 'rgba(91, 225, 44, 0.5)',
            }
        ],
    };
    return(<div className={"card w-50 shadow p-3"}>
        <label className={"text-uppercase mb-2"}><b>{props.label}</b></label>
        <Line options={options} data={data} />
    </div>);
}

export default LineChart;
