import { Box, Typography, Slider } from "@mui/material";

const StockRangeSlider = ({label, min, max, currValue}) => {
    let data = [
        {
            value: min,
            label: 'L',
            color: "#FFFFFF"
        },
        {
            value: max,
            label: 'H',
            color: "#FFFFFF"
        },
    ];
    return (
        <Box sx={{marginTop: "20px"}}>
            <Typography variant='h6' color= "#FFFFFF"> {label} </Typography>
            <Box sx={{display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                <Typography color= "#FFFFFF"> {min} </Typography>
                <Typography color= "#FFFFFF"> {max} </Typography>
            </Box>
            <Slider disabled value={currValue} marks={data} min={min} max={max} step={1} />
        </Box>
    );
};

export default StockRangeSlider;