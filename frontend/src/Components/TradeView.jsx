import React, {useEffect, useRef} from 'react'
import { getKlinesPerDay } from '../utils/httpClient';
import { ChartManager } from '../utils/ChartManager';
import { calculateDateRange } from "../utils/utilFunctions"

const TradeView = ({period, company, type, mode}) => {
    console.log("Inside Trade View")
    const chartRef = useRef(null);
    const chartManagerRef = useRef(null);

    const getData = async() => {
        let klineData = [];
        try {
            let {fromDate, toDate} = calculateDateRange(period)
            klineData = await getKlinesPerDay(fromDate, "AAPL");
            console.log(klineData)
        } catch (error) {}

        if(chartRef) {
            if (chartManagerRef.current) {
                chartManagerRef.current.destroy();
            }
            
            const chartManager = new ChartManager(
                chartRef.current,
                [
                    ...klineData?.map((x) => ({
                        close: parseFloat(x.close),
                        high: parseFloat(x.high),
                        low: parseFloat(x.low),
                        open: parseFloat(x.open),
                        timestamp: new Date(x.date), 
                    })),
                ].sort((x, y) => (x.timestamp < y.timestamp ? -1 : 1)) || [],
                {
                    background: (mode == "light") ? "#FFFFFF" : "#0e0f14",
                    color: "white",
                },
                "candle",
                mode
            );

            chartManagerRef.current = chartManager;
        }
    }

    useEffect(() => {
        getData();
        return () => {
            if (chartManagerRef.current) {
                chartManagerRef.current.destroy();
                chartManagerRef.current = null;
            }
        };
    }, [period, mode, chartRef]);

    return (
        <div ref={chartRef} style={{ height: "500px", width: "100%", marginTop: 4 }}> </div>
    )
}

export default TradeView