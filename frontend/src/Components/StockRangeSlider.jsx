import { Box, Typography, Slider } from "@mui/material";

const StockRangeSlider = ({label, min, max, currValue}) => {
    let data = [
        {
            value: min,
            label: 'L',
        },
        {
            value: max,
            label: 'H',
        },
    ];
    return (
        <Box sx={{marginTop: "20px"}}>
            <Typography variant='h6'> {label} </Typography>
            <Box sx={{display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                <Typography> {min} </Typography>
                <Typography> {max} </Typography>
            </Box>
            <Slider disabled defaultValue={currValue} marks={data} min={min} max={max} step={1} />
        </Box>
    );
};

export default StockRangeSlider;