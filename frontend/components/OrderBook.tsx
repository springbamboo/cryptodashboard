import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

export default function BasicTable() {
    const series = [
        {
            data: [400, 430, 448, 470, 540, 580, 690],
        },
    ];
    const options = {
        chart: {
            type: "bar",
            height: 350,
        },
        dataLabels:{
            enabled: true
        },
        plotOptions:{
            bar: {
              horizontal: true,
            }
        },
        xaxis:{
            categories: ['June', 'July', 'August', 'September', 'October', 'November', 'December'],
        },
        grid:{
            xaxis: {
              lines: {
                show: true
              }
            }
        },
        yaxis:{
            reversed: true,
            axisTicks: {
              show: true
            }
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
        }
    };
    return (
    <div id = "chart">    
    <ReactApexChart 
    //  @ts-ignore
    options={options} 
    series={series} 
    type="bar" 
    height={350} />
    </div>

        
    );
}
