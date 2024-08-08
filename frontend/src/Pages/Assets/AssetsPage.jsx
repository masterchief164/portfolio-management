import { useState } from "react";
import AssetTopbar from "../../Components/AssetTopbar";
import TradeView from "../../Components/TradeView";
import { Box, useMediaQuery } from "@mui/material";
import AssetSidebar from "../../Components/AssetSidebar";
import { useTheme } from '@mui/material/styles';
import { companies } from "../../utils/AssetData";

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
        if(event.target.checked == true)
            setMode("dark");
        else
            setMode("light");
    };

    // console.log(stock);
    // console.log(companies.find((c) => c.name=== "MicroStrategy Incorporated")?.symbol)
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('lg'));
    return (
        <div style={{marginTop: "-35px"}}>
            <Box sx={{ display: "flex", flexDirection: isMediumScreen ? "column" : "row",gap: "20px", justifyContent: "space-between", padding: "20px 10px 20px 20px"}}>
                {!isMediumScreen && (
                    <Box sx={{ width: "30%" }}>
                        <AssetSidebar stock={companies.find((c) => c.name===stock)?.symbol}/>
                    </Box>
                )}
                <Box sx={{ width: isMediumScreen ? "100%" : "70%" }}>
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

        </div>
    );
};

export default AssetsPage;