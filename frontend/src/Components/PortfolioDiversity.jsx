import { Typography, Box } from '@mui/material'
import { Pie, Doughnut } from 'react-chartjs-2'
import React from 'react'

const data = {
    labels: ['Big Tech', 'Stocks', 'Energy', 'Ecommerce', 'Funds'],
    datasets: [
        {
            label: 'Portfolio Allocation',
            data: [60, 12, 0, 12, 6],
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

const options = {
    maintainAspectRatio: true,
    aspectRatio: 1.34
}


const PortfolioDiversity = () => {
  return (
    <div style={{padding: "20px"}}>
        <Typography variant='h6' fontWeight="500"> Portfolio Diversity </Typography>

        <Box style={{marginTop: "30px"}}>
            <Doughnut data={data} options={options}/>
        </Box>
    </div>
  )
}

export default PortfolioDiversity