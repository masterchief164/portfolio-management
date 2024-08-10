import {useEffect, useRef} from 'react';
import { getKlinesPerDay } from '../utils/httpClient';
import { ChartManager } from '../utils/ChartManager';
import { calculateDateRange } from "../utils/utilFunctions";

const TradeView = ({period, mode, company}) => {
    const chartRef = useRef(null);
    const chartManagerRef = useRef(null);

    useEffect(() => {
        const getData = async () => {
            let klineData = [];
            try {
                let { fromDate } = calculateDateRange(period);
                klineData = await getKlinesPerDay(fromDate, company);
            } catch (error) {
                console.log(error);
            }
    
            if (chartRef.current) {
                if (chartManagerRef.current) {
                    chartManagerRef.current.destroy();
                }
    
                if (klineData && klineData.length > 0) {
                    const chartManager = new ChartManager(
                        chartRef.current,
                        klineData
                            .map(x => ({
                                close: parseFloat(x.close),
                                high: parseFloat(x.high),
                                low: parseFloat(x.low),
                                open: parseFloat(x.open),
                                timestamp: new Date(x.date),
                            }))
                            .sort((x, y) => (x.timestamp < y.timestamp ? -1 : 1)),
                        {
                            background: mode === "light" ? "#FFFFFF" : "#0e0f14",
                            color: "white",
                        },
                        "candle",
                        mode
                    );
    
                    chartManagerRef.current = chartManager;
                }
            }
        };
        getData();
    }, [period, mode, company, chartRef]);

    return (
        <div ref={chartRef} style={{ height: "500px", width: "100%", marginTop: 4 }}> </div>
    );
};

export default TradeView;