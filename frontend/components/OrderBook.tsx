import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

const OrderBook = () => {
    const [xAsk, setXAsk] = useState([]);
    const [yAsk, setYAsk] = useState([]);
    useEffect(() => {
        setInterval(()=>{
            const promise = axios("http://localhost:5400/binance/btcusdt");
            promise.then((res) => {
                console.log(res.data);
                setXAsk(res.data[0]);
                setYAsk(res.data[1]);
            });
        },2000)
    },[]);
    const series = [
        {
            data: yAsk,
        },
    ];
    const options = {
        chart: {
            type: "bar",
            height: 500,
        },
        dataLabels: {
            enabled: true,
        },
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
        xaxis: {
            categories: xAsk,
        },
        grid: {
            xaxis: {
                lines: {
                    show: true,
                },
            },
        },
        yaxis: {
            reversed: true,
            axisTicks: {
                show: true,
            },
        },
        theme: {
            mode: "dark",
            palette: "palette1",
            monochrome: {
                enabled: false,
                color: "#255aee",
                shadeTo: "light",
                shadeIntensity: 0.65,
            },
        },
    };
    return (
        <div id="chart">
            <ReactApexChart
                //  @ts-ignore
                options={options}
                series={series}
                type="bar"
                height={800}
        />
        </div>
    );
};
export default OrderBook;
