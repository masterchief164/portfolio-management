import React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

// total_invst, curr_val, gains_losses, returns
const PerformanceCards = () => {
    return (
        <div style={{ display: "flex", paddingTop: "20px", paddingLeft: "35px", paddingRight: "26px", justifyContent: "space-between", gap: "20px" }}>
          <React.Fragment>
            <CardContent sx={{ backgroundColor: "white", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", padding: "10px", display: "flex", flexDirection: "column", justifyContent: "space-between", width: "20%" }}>
              <Typography variant='h5' color="#2d88fd" sx={{ margin: "auto" }}> Total Investment </Typography>
              <Typography variant='h5' fontWeight="500" sx={{ margin: "auto" }}> $1,473,980 </Typography>
            </CardContent>
          </React.Fragment>
      
          <React.Fragment>
            <CardContent sx={{ backgroundColor: "white", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", padding: "10px", display: "flex", flexDirection: "column", justifyContent: "space-between", width: "20%" }}>
              <Typography variant='h5' color="#2d88fd" sx={{ margin: "auto" }}> Current Value </Typography>
              <Typography variant='h5' fontWeight="500" sx={{ margin: "auto" }}> $3,210,290 </Typography>
            </CardContent>
          </React.Fragment>
      
          <React.Fragment>
            <CardContent sx={{ backgroundColor: "white", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", padding: "10px", display: "flex", flexDirection: "column", justifyContent: "space-between", width: "20%" }}>
              <Typography variant='h5' color="#2d88fd" sx={{ margin: "auto" }}> Overall Gain/Loss </Typography>
              <Typography variant='h5' fontWeight="500" color="#2bfe27" sx={{ margin: "auto" }}> +$1,736,310 </Typography>
            </CardContent>
          </React.Fragment>
      
          {/* <React.Fragment style={{ paddingBottom: "10px" }}> */}
            <CardContent sx={{ backgroundColor: "white", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", padding: "10px 10px 10px 10px", display: "flex", flexDirection: "column", justifyContent: "space-between", width: "20%" }}>
              <Typography variant='h5' color="#2d88fd" sx={{ margin: "auto" }}> Returns (%) </Typography>
              <Typography variant='h5' fontWeight="500" color="#2bfe27" sx={{ margin: "auto" }}> +28.96% </Typography>
            </CardContent>
          {/* </React.Fragment> */}
        </div>
      );
      
};

export default PerformanceCards;