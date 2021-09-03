import React from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

const OrderBook2 = (props: any) => {
    const data: number[][] = props.data;
    const series = [
        {
            data: data[1],
        },
    ];
    const options = {
        chart: {
            type: "bar",
            height: "auto",
        },
        title: {
            text: "ASK",
            align: 'center',
            margin: 5,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
              fontSize:  '20px',
              fontWeight:  'bold',
              fontFamily:  undefined,
              color:  'red'
            },
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
            reversed: false,
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
export default OrderBook2;
