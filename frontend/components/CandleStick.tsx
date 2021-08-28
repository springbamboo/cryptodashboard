import React from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

const CandleStick = () => {
    const series = [{
        data: [
        ]
    }
    ];
    const options = {
        chart: {
            type: "candlestick",
            height: 350,
            background:'black'
        },
        title: {
            text: "CandleStick Chart",
            align: "left",
        },
        xaxis: {
            type: "datetime",
        },
        yaxis: {
            tooltip: {
                enabled: false,
            },
        },
    };

    return (
        <div id="chart">
            <ReactApexChart
                //  @ts-ignore
                options={options}
                series={series}
                type="candlestick"
                height={350}
            />
        </div>
    );
};

export default CandleStick;
