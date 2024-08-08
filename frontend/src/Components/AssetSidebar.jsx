import { Box, Typography } from '@mui/material';
import StockRangeSlider from './StockRangeSlider';
import { useEffect , useState} from 'react';
import { getStockInfo } from '../utils/httpClient';

const AssetSidebar = ({stock}) => {
    const [stockData, setStockData] = useState(null);
    
    const updateInfo = async(stock) => {
        const data = await getStockInfo(stock);
        setStockData(data[0]);
    };

    useEffect(() => {
        updateInfo(stock);
    }, [stock]);

    if (!stockData) {
        return <div>Loading...</div>;
    }

    const {
        name,
        price,
        change,
        changesPercentage,
        dayHigh,
        dayLow,
        yearHigh,
        yearLow,
        volume,
        priceAvg50
    } = stockData;

    // Convert change to a number for comparison
    const changeNumber = parseFloat(change);
    
    // Set color based on change
    const changeColor = changeNumber < 0 ? 'red' : '#39a97c';

    const formattedPercentage = Math.abs(parseFloat(changesPercentage)).toFixed(2);

    return (
    <Box sx={{padding: "2% 4%", height: "96%", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
        <Typography variant='h5' fontWeight="500" sx={{marginBottom: "4px"}}> {name} </Typography>
        <Typography variant='h3' fontWeight="400"> ${price} </Typography>
        <Typography variant='h5' color={changeColor} sx={{ paddingLeft: "10px" }}> {changeNumber > 0 ? `+${change}` : change} ({formattedPercentage}%) </Typography>

        <StockRangeSlider label={"Day Range"} min={dayLow} max={dayHigh} currValue={price}/>
        <StockRangeSlider label={"52 Week Range"} min={yearLow} max={yearHigh} currValue={price} />

        <Box sx={{display: "flex", justifyContent: "space-between",marginTop: "25px"}}>
            <Box> 
                <Typography variant='h6'> Volume </Typography>
                <Typography variant='h6'> {volume} </Typography>
            </Box>
            <Box>
                <Typography variant='h6' > Bid/Ask </Typography>
                <Typography variant='h6'> {priceAvg50} </Typography>
            </Box>
        </Box>
    </Box>
    );
};

export default AssetSidebar;