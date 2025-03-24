import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import './Linechart.css'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Linechart = ({ historicalData }) => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (historicalData && historicalData.prices) {
            // Extract timestamps and prices
            const labels = historicalData.prices.map(entry => {
                const date = new Date(entry[0]); // Convert timestamp to Date object
                return date.toLocaleDateString(); // Format date as "MM/DD/YYYY"
            });

            const prices = historicalData.prices.map(entry => entry[1]); // Extract price values

            // Prepare Chart.js data
            setChartData({
                labels,
                datasets: [
                    {
                        label: 'Price (last 10 days)',
                        data: prices,
                        borderColor: 'rgb(75, 192, 192)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        tension: 0.4, // Smooth line
                    }
                ]
            });
        }
    }, [historicalData]);

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Crypto Price Trend' },
        },
        maintainAspectRatio: true,
    };

    return (
        <div className='line-chart'>
            {chartData ? <Line data={chartData} options={options} /> : <p>Loading chart...</p>}
        </div>
    );
};

export default Linechart;
