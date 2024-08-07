import { Box, Typography } from '@mui/material';
import StockRangeSlider from './StockRangeSlider';

const AssetSidebar = () => {
    return (
    <Box sx={{padding: "2% 4%", height: "96%", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
        <Typography variant='h4' fontWeight="500" sx={{marginBottom: "4px"}}> HDFC Bank Ltd. </Typography>
        <Typography variant='h2' fontWeight="400"> $1,623.50 </Typography>
        <Typography variant='h5' color="#39a97c" sx={{ paddingLeft: "10px" }}> +22.30 (1.39%) </Typography>

        <StockRangeSlider label={"Day Range"} min={1602.20} max={1630.00} currValue={1623.50}/>
        <StockRangeSlider label={"52 Week Range"} min={1363.55} max={1794.00} currValue={1623.50} />

        <Box sx={{display: "flex", justifyContent: "space-between",marginTop: "25px"}}>
            <Box> 
                <Typography variant='h6'> Volume </Typography>
                <Typography variant='h6'> 21,173,132 </Typography>
            </Box>
            <Box>
                <Typography variant='h6' > Bid/Ask </Typography>
                <Typography variant='h6'> 1627.45 / 1628.45 </Typography>
            </Box>
        </Box>
    </Box>
    );
};

export default AssetSidebar;