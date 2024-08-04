import { Typography, Box, colors } from '@mui/material'
import React from 'react'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import {LinearScale} from "chart.js/auto"
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import appleLogo from "../assets/apple.png";
import googleLogo from "../assets/google.png"
import bmwLogo from "../assets/bmw.jpeg"
import { Line } from "react-chartjs-2";

const baseValue = 10000; // Starting point
const fluctuationRange = 5000; // Random fluctuation amount

const generateData = () => {
    const data = [];
    const labels = ['Jun 2021', 'Dec 2021', 'Jun 2022', 'Dec 2022', 'Jun 2023', 'Dec 2023'];
    let currentValue = baseValue;
    for (let i = 0; i < labels.length; i++) {
        const fluctuation = Math.random() * fluctuationRange - fluctuationRange / 2;
        currentValue += fluctuation + 5000; // Ensure overall increase
        data.push(currentValue);
    }

    return {
        labels,
        datasets: [
            {
                data,
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1,
            },
        ],
    };
};

const options = {
    responsive: true,
    plugins: {
        // title: {
        //     display: true,
        //     text: 'Overall Performance',
        // },
        legend: {
            display: false, // Remove legend as it's not necessary in this case
        },
        },
        scales: {
        y: {
            beginAtZero: true,
            title: {
            display: false,
            text: 'Value (₹)'
            }
        }
    }
};


const data = generateData();

const DashboardGraph = () => {
    return (
        <div>
            <Box style={{display: "flex", justifyContent: "space-between" }}>
                <Box padding="15px 0px 5px 15px">
                    <Typography variant='h6' fontWeight="400" padding="0px 0px 7px 0px">
                        Overall Performance
                    </Typography>
                    <Typography variant='h5' fontWeight="500" paddingBottom="8px">
                        ₹ 252,501
                    </Typography>
                    <Box>
                        <Typography variant='h8' style={{backgroundColor: "#E1F6E1", marginLeft: "18px"}} color="#81C082">
                            +230.82%
                        </Typography>
                        <Typography variant='h12' paddingLeft="10px" fontFamily="xs" style={{opacity: "0.4"}}>
                            from July 2021
                        </Typography>
                    </Box>
                </Box>

                <Box>
                    <Box sx={{display: 'flex',flexDirection: 'column',alignItems: 'center','& > *': {m: 1,}, marginTop: "10px"}}>
                        <ButtonGroup variant="outline" aria-label="Basic button group">
                            <Button>Yearly</Button>
                            <Button>Monthly</Button>
                            <Button>Daily</Button>
                        </ButtonGroup>
                    </Box>
                    <Box style={{paddingRight: "20px"}}>
                        <AvatarGroup>
                            <Avatar alt="Remy Sharp" src={appleLogo} />
                            <Avatar alt="Travis Howard" src={googleLogo}  />
                            <Avatar alt="Agnes Walker" src={bmwLogo} />
                            {/* <Avatar alt="Trevor Henderson" src={appleLogo} /> */}
                        </AvatarGroup>
                    </Box>
                </Box>
            </Box>

            <Box style={{padding: "10px 2px"}}>
                <Line data={data} options={options} />
            </Box>
        </div>
    )
}

export default DashboardGraph