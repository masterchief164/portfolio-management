import { Typography, Box } from '@mui/material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import appleLogo from "../assets/apple.png";
import googleLogo from "../assets/google.png";
import bmwLogo from "../assets/bmw.jpeg";
import { Line } from "react-chartjs-2";
// import { useSelector } from "react-redux";
import {Chart as ChartJS, registerables} from 'chart.js';


ChartJS.register(...registerables);

const options = {
    responsive: true,
    plugins: {
            legend: {
                display: false, // Remove legend as it's not necessary in this case
            },
        },
        scales: {
        y: {
            beginAtZero: true,
        }
    },
    // aspectRatio: 3,
    maintainAspectRatio: false
};

const DashboardGraph = ({generateData}) => {
    const data = generateData();

    const handleClick = (e) => {
        console.log(e.target.innerText);
    };
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', height: '100%'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Box padding="15px 0px 5px 15px">
                    <Typography variant='h6' fontWeight="400" padding="0px 0px 7px 0px">
                        Overall Performance
                    </Typography>
                    <Typography variant='h5' fontWeight="500" paddingBottom="8px">
                        $ 252,501
                    </Typography>
                    <Box>
                        <Typography variant='h8' sx={{backgroundColor: "#E1F6E1", marginLeft: "18px"}} color="#81C082">
                            +230.82%
                        </Typography>
                        <Typography variant='h12' paddingLeft="10px" fontFamily="xs" sx={{opacity: "0.4"}}>
                            from July 2021
                        </Typography>
                    </Box>
                </Box>

                <Box>
                    <Box sx={{display: 'flex',flexDirection: 'column',alignItems: 'center','& > *': {m: 1,}, marginTop: "10px"}}>
                        <ButtonGroup variant="outline" aria-label="Basic button group">
                            <Button onClick={handleClick}>Yearly</Button>
                            <Button onClick={handleClick}>Monthly</Button>
                            <Button onClick={handleClick}>Daily</Button>
                        </ButtonGroup>
                    </Box>
                    <Box sx={{paddingRight: "20px"}}>
                        <AvatarGroup>
                            <Avatar alt="Remy Sharp" src={appleLogo} />
                            <Avatar alt="Travis Howard" src={googleLogo}  />
                            <Avatar alt="Agnes Walker" src={bmwLogo} />
                        </AvatarGroup>
                    </Box>
                </Box>
            </Box>

            <Box sx={{padding: "10px 2px", flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Line data={data} options={options} />
            </Box>
        </Box>
    );

};

export default DashboardGraph;