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

interface IProps {label: string, first: Map<string, number>, second: Map<string, number>}
function DoubleLineChart(props: IProps) {

    const options = {
        responsive: true,
        animation: {duration: 0.2},
        plugins: { legend: {display: false} }
    };
    const data = {
        labels: [...props.first.keys()],
        datasets: [
            {
                label: 'Productions',
                data: [...props.first.values()],
                borderColor: 'rgb(91, 225, 44)',
                backgroundColor: 'rgba(91, 225, 44, 0.5)',
            },
            {
                label: 'Consumptions',
                data: [...props.second.values()],
                borderColor: 'rgb(234, 66, 40)',
                backgroundColor: 'rgba(234, 66, 40, 0.5)',
            }
        ],
    };
    return(<div className={"card w-50 shadow p-3"}>
        <label className={"mb-2"}><b>{props.label.toUpperCase()} (w)</b></label>
        <Line options={options} data={data} />
    </div>);
}

export default DoubleLineChart;
