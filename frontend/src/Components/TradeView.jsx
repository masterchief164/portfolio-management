import React, {useEffect, useRef} from 'react'
import { getKlinesPerDay } from '../utils/httpClient';
import { ChartManager } from '../utils/ChartManager';
import { calculateDateRange } from "../utils/utilFunctions"

const TradeView = ({period, company, type}) => {
    console.log("Inside Trade View")
    const chartRef = useRef(null);
    const chartManagerRef = useRef(null);

    const getData = async() => {
        let klineData = [];
        try {
            let {fromDate, toDate} = calculateDateRange(period)
            // console.log(fromDate, "   ", toDate)
            klineData = await getKlinesPerDay(fromDate, "AAPL");
            console.log(klineData)
        } catch (error) {}

        if(chartRef) {
            if (chartManagerRef.current) {
                chartManagerRef.current.destroy();
            }
            // console.log(klineData)
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
                    background: "#FFFFFF",
                    color: "white",
                },
                "candle"
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
    }, [period, chartRef]);

    return (
        <div ref={chartRef} style={{ height: "500px", width: "100%", marginTop: 4 }}> </div>
    )
}

export default TradeView