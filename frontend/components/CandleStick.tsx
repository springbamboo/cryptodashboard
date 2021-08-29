import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

const CandleStick = () => {
    const [klineDdata, setKlineData] = useState([]);
    const series = [
        {
            data: klineDdata,
        },
    ];
    // console.log(series[0].data);
    useEffect(() => {
        const promise = axios("http://localhost:5000/binance/btcusdt");
        promise.then((res) => {
            setKlineData(res.data);
            console.log(res.data[49][4]);
        }).catch(err => console.log(err));
    },[]);

    const options = {
        chart: {
            type: "candlestick",
            height: 350,
            background: "black",
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
