import {useState} from "react";
import AssetTopbar from "../../Components/AssetTopbar";
import TradeView from "../../Components/TradeView";
import { Box, useMediaQuery } from "@mui/material";
import AssetSidebar from "../../Components/AssetSidebar";
import { useTheme } from '@mui/material/styles';
import { companies } from "../../utils/AssetData";
import AssetTable from "../../Components/AssetTable";

const AssetsPage = () => {
    const [period, setPeriod] = useState('1M');
    const [stock, setStock] = useState("");
    const [mode, setMode] = useState("light");

    const handleChange = (event) => {
        setPeriod(event.target.value);
    };
    
    const handleStock = (event, newValue) => {
        setStock(newValue);
    };

    const handleMode = (event) => {
        if(event.target.checked === true)
            setMode("dark");
        else
            setMode("light");
    };

    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.down('lg'));
    return (
        <div style={{marginTop: "-35px"}}>
            <Box sx={{ display: "flex", flexDirection: isLargeScreen ? "column" : "row",gap: "20px", justifyContent: "space-between", padding: "20px 10px 20px 20px"}}>
                {!isLargeScreen && (
                    <Box sx={{ width: "30%",  backgroundColor: "#414a4c"}}>
                        <AssetSidebar stock={companies.find((c) => c.name===stock)?.symbol}/>
                    </Box>
                )}
                <Box sx={{ width: isLargeScreen ? "100%" : "70%" }}>
                    <AssetTopbar 
                        period={period} 
                        stock={stock} 
                        handleStock={handleStock} 
                        handleChange={handleChange} 
                        handleMode={handleMode}
                    />
                    <TradeView period={period} mode={mode} company={companies.find((c) => c.name===stock)?.symbol}/> 
                </Box>
            </Box>

            <div style={{padding: "20px"}}>
                <AssetTable/>
            </div>
        </div>
    );
};

export default AssetsPage;