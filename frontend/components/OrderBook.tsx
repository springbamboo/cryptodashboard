import React from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

const OrderBook = (props: any) => {
    const data: number[][] = props.data;
    const series = [
        {
            data: data[3],
        },
    ];
    const options = {
        chart: {
            type: "bar",
            height: "auto",
        },
        title: {
            text: "BID",
            align: 'center',
            margin: 5,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
              fontSize:  '20px',
              fontWeight:  'bold',
              fontFamily:  undefined,
              color:  'green'
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
            // /decimalsInFloat:3,
            categories: data[2],

        },
        grid: {
            xaxis: {
                lines: {
                    show: true,
                },
            },
        },
        yaxis: {
            // decimalsInFloat:3,
            reversed: true,
            axisTicks: {
                show: true,
            },
            opposite: false,
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
