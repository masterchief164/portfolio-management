import {
    createChart as createLightWeightChart,
    ColorType,
    CrosshairMode,
} from "lightweight-charts";

export class ChartManager {
    constructor(ref, initialData, layout, type) {
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
                },
                vertLines: {
                    visible: true,
                },
            },
            layout: {
                background: {
                    type: ColorType.Solid,
                    color: layout.background,
                },
                textColor: "black",
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
