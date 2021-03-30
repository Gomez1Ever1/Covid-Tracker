import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Chart.module.css';

const Chart = ({data: { confirmed, recovered, deaths }, country}) => {
    const [dailyData, setDailyData] = useState([]);
    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        };
        fetchAPI();
    });
    const barChart = confirmed ?
        (
            <Bar data={{
                label: ["Infected", "Recovered", "Deaths"],
                datasets: [{
                    labels: "People",
                    backgroundColor: [
                        "rgba(0,0,255,0.5)",
                        "rgba(0,255,0,0.5)",
                        "rgba(255,0,0,0.5)"
                    ],
                    data: [confirmed, recovered, deaths]
                }]
            }} option={{
                legend: { display: false },
                title: { display: true, text: "Current state in" + country }
            }
            }></Bar>
        ) : null
    );
const lineChart = (
    dailyData.length ? (
        <Line
            data={{
                labels: dailyData.map(({ date }) => date),
                datasets: [{
                    data: dailyData.map(({ confirmed }) => confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true
                }, {
                    data: dailyData.map(({ deaths }) => deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    backgroundColr: 'rgba(255,0,0,0.5)',
                    fill: true
                }]
            }} />) : null
);
return (
    <div className={styles.container}>
        {lineChart}
    </div>
)
};
export default Chart; 
