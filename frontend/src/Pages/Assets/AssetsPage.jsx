import { useState } from "react";
import AssetTopbar from "../../Components/AssetTopbar";
import TradeView from "../../Components/TradeView";

const AssetsPage = () => {
    const [period, setPeriod] = useState('1M');

    const handleChange = (event) => {
        setPeriod(event.target.value);
    };
    console.log(period)

    return (
        <div style={{height: "500px", width: "1180px", marginLeft: "245px", marginTop: "100px"}}>
            <AssetTopbar period={period} handleChange={handleChange}/>
            <TradeView period={period} />
        </div>
    );
};

export default AssetsPage;