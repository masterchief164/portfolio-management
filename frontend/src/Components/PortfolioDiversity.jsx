import { Typography, Box } from '@mui/material'
import { Doughnut } from 'react-chartjs-2'
import React from 'react'


const PortfolioDiversity = ({data}) => {
    const options = {
        maintainAspectRatio: true,
        aspectRatio: 1.26,
        pieceLabel: {
            render: function(d) { return d.labels + " (" + d.percentage + "%)" },
            fontColor: '#000',
            position: 'outside',
            segment: true
        }
    }
    
    return (
        <div style={{padding: "20px"}}>
            <Typography variant='h6' fontWeight="500"> Portfolio Diversity </Typography>

            <Box style={{marginTop: "15px"}}>
                <Doughnut data={data} options={options}/>
            </Box>
        </div>
    )
}

export default PortfolioDiversity