import { useState } from "react";
import AssetTopbar from "../../Components/AssetTopbar";
import TradeView from "../../Components/TradeView";

const AssetsPage = () => {
    const [period, setPeriod] = useState('1M');
    const [stock, setStock] = useState(null);
    const [mode, setMode] = useState("light")

    const handleChange = (event) => {
        setPeriod(event.target.value);
    };
    
    const handleStock = (event, newValue) => {
        setStock(newValue);
    }

    const handleMode = (event) => {
        if(event.target.checked == true)
            setMode("dark")
        else
            setMode("light");
    }

    console.log(mode)

    return (
        <div>
            <AssetTopbar period={period} stock = {stock} handleStock={handleStock} handleChange={handleChange} handleMode={handleMode}/>
            <TradeView period={period} mode={mode}/>
        </div>
    );
};

export default AssetsPage;