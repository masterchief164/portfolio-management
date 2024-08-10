import { Box, Typography } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { pieData } from "../utils/MockPieChartData";

const PortfolioDiversity = () => {
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
                    <Doughnut data={pieData} options={options} />
                </div>
            </Box>
        </Box>
    );
};

export default PortfolioDiversity;
