import { Box, Typography } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { pieData } from "../utils/MockPieChartData";
import { useEffect, useState } from 'react';
import {getPortfolioDiversity} from "../utils/httpClient.js";

const PortfolioDiversity = () => {
    const [data, setData] = useState(pieData);
    useEffect(() => {
        const getData = async () => {
            const res = getPortfolioDiversity(3);
            let labels = [];
            labels = res?.map(d => d.sector);
            const totalValue = res.reduce((sum, item) => sum + item.total_value, 0);
            const percentages = res.map(item => Math.round((item.total_value / totalValue) * 100));
            
            setData({
                labels: labels,
                datasets: [
                    {
                        label: "Portfolio Allocation",
                        data: percentages,
                        borderWidth: 1,
                    },
                ],
            });
        };
        getData();
    }, []);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(2) + '%';
                    }
                }
            }
        }
    };

    return (
        <Box sx={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', maxWidth: '100%', }}>
            <Typography variant='h6' fontWeight="500">Portfolio Diversity</Typography>

            <Box sx={{ marginTop: '5px', paddingBottom: "5px", flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '90%', height: '90%' }}>
                    <Doughnut data={data} options={options} />
                </div>
            </Box>
        </Box>
    );
};

export default PortfolioDiversity;
