import React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const PerformanceCards = (total_invst, curr_val, gains_losses, returns) => {
  return (
    <div style={{display: "flex", paddingTop: "20px", paddingLeft: "35px", paddingRight: "26px", justifyContent: "space-between"}}>
        <React.Fragment>
            <CardContent sx={{backgroundColor: "white", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", paddingBottom: "-15px",paddingTop: "8px", width: "185px"}}>
                <Typography variant='h5' color="#2d88fd" paddingBottom="5px" sx={{float: "right"}} > Total Investment </Typography>
                <Typography sx={{float: "right"}} variant='h5' fontWeight="500"> $1,473,980 </Typography>
            </CardContent>
        </React.Fragment>

        <React.Fragment>
            <CardContent sx={{backgroundColor: "white", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", paddingBottom: "-15px",paddingTop: "8px", width: "165px"}}>
                <Typography variant='h5' color="#2d88fd" paddingBottom="5px" sx={{float: "right"}}> Current Value </Typography>
                <Typography sx={{float: "right"}} variant='h5' fontWeight="500"> $3,210,290 </Typography>
            </CardContent>
        </React.Fragment>

        <React.Fragment>
            <CardContent sx={{backgroundColor: "white", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", paddingBottom: "-15px",paddingTop: "8px", width: "200px"}}>
                <Typography variant='h5' color="#2d88fd" paddingBottom="5px" sx={{float: "right"}}> Overall Gain/Loss </Typography>
                <Typography sx={{float: "right"}} variant='h5' fontWeight="500" color="#2bfe27"> +$1,736,310 </Typography>
            </CardContent>
        </React.Fragment>

        <React.Fragment>
            <CardContent sx={{backgroundColor: "white", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", paddingBottom: "-15px",paddingTop: "8px", width: "160px"}}>
                <Typography variant='h5' color="#2d88fd" paddingBottom="5px" sx={{float: "right"}}> Returns (%) </Typography>
                <Typography sx={{float: "right"}} variant='h5' fontWeight="500" color="#2bfe27"> +28.96% </Typography>
            </CardContent>
        </React.Fragment>
    </div>
  );
};

export default PerformanceCards;