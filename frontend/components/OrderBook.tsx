import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

const OrderBook = (props: any) => {
    const data: number[][] = props.data;
    // console.log(data[1]);
    const series = [
        {
            data: data[1],
        },
    ];
    const options = {
        chart: {
            type: "bar",
            height: 600,
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
            categories: data[0],
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
                height={600}
            />
        </div>
    );
};
export default OrderBook;
