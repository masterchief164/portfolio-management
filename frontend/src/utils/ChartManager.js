import {
    createChart as createLightWeightChart,
    ColorType,
    CrosshairMode,
} from "lightweight-charts";

export class ChartManager {
    constructor(ref, initialData, layout, type, mode) {
        const chart = createLightWeightChart(ref, {
            // autoSize: true,
            overlayPriceScales: {
                ticksVisible: true,
                borderVisible: true,
            },
            crosshair: {
                mode: CrosshairMode.Normal,
            },
            rightPriceScale: {
                visible: true,
                ticksVisible: true,
                entireTextOnly: true,
            },
            grid: {
                horzLines: {
                    visible: true,
                    color: mode == "dark" ? "#444" : "#D6DCDE",
                },
                vertLines: {
                    visible: true,
                    color: mode == "dark" ? "#444" : "#D6DCDE",
                },
            },
            layout: {
                background: {
                    type: ColorType.Solid,
                    color: layout.background,
                },
                textColor: mode == "dark" ? "white" : "black",
            },
        });
        this.chart = chart;
        this.candleSeries = chart.addCandlestickSeries();

        this.candleSeries.setData(
            initialData.map((data) => ({
                ...data,
                time: data.timestamp / 1000,
            }))
        );

        // Setting the border color for the horizontal axis
        this.chart.timeScale().applyOptions({
            borderColor: "#71649C",
        });
        this.chart.timeScale().fitContent();
    }

    destroy() {
        if (this.chart) {
            this.chart.remove();
            this.chart = null;
        }
    }
}
