import React from "react";
import dynamic from "next/dynamic";
import axios from "axios";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

const CandleStick = (props) => {
    // const [klineDdata, setKlineData] = useState([]);
    const index:number[] = props.data[props.data.length - 1];
    const lastPrice = index[4];
    const series = [
        {
            data: props.data,
        },
    ];

    // useEffect(() => {
    //     const promise = axios("http://localhost:5000/binance/btcusdt");
    //     promise
    //         .then((res) => {
    //             setKlineData(res.data);
    //         })
    //         .catch((err) => console.log(err));
    // }, []);

    const options = {
        chart: {
            type: "candlestick",
            height: 350,
            background: "#424242",
        },
        title: {
            text: lastPrice,
            backgrouond: "white",
            align: "Center",
            style: {
                fontSize:  '20px',
                fontWeight:  'bold',
                fontFamily:  undefined,
                color:  '#ffffff'
              },
        },
        xaxis: {
            type: "datetime",
        },
        yaxis: {
            tooltip: {
                enabled: false,
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
                type="candlestick"
                height={350}
            />
        </div>
    );
};

export default CandleStick;
