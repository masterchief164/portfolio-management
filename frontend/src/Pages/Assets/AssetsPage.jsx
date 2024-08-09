import { useState } from "react";
import AssetTopbar from "../../Components/AssetTopbar";
import TradeView from "../../Components/TradeView";
import AssetTable from "../../Components/AssetTable";
const demoData = [
    {
      name: 'Apple Inc.',
      symbol: 'AAPL',
      price: '$175.85',
      quantity: 0,
      buy: true,
      sell: true
    },
    {
      name: 'Microsoft Corporation',
      symbol: 'MSFT',
      price: '$340.12',
      quantity: 0,
      buy: true,
      sell: false
    },
    {
      name: 'Amazon.com, Inc.',
      symbol: 'AMZN',
      price: '$135.50',
      quantity: 1,
      buy: true,
      sell: true
    },
    
    {
      name: 'Meta Platforms, Inc.',
      symbol: 'META',
      price: '$291.25',
      quantity: 3,
      buy: true,
      sell: true
    }
  ];

  
const AssetsPage = () => {
    const [period, setPeriod] = useState('1M');
    const [stock, setStock] = useState(null);
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

    console.log(mode);

    return (
        <div>
        
            <AssetTopbar period={period} stock = {stock} handleStock={handleStock} handleChange={handleChange} handleMode={handleMode}/>
            <TradeView period={period} mode={mode}/>
            <div>
                <AssetTable data={demoData}/>
            </div>
        </div>
    );
};

export default AssetsPage;