import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-google-charts";

const data = [
    ["time", "low", "open", "close", "high"],
    ["1", 20, 28, 38, 45],
    ["2", 31, 38, 55, 66],
    ["3", 50, 55, 77, 80],
    ["4", 77, 77, 66, 50],
    ["5", 68, 66, 22, 15],
    ["1", 20, 28, 38, 45],
    ["2", 31, 38, 55, 66],
    ["3", 50, 55, 77, 80],
    ["4", 77, 77, 66, 50],
    ["5", 68, 66, 22, 15],
    ["1", 20, 28, 38, 45],
    ["2", 31, 38, 55, 66],
    ["3", 50, 55, 77, 80],
    ["4", 77, 77, 66, 50],
    ["5", 68, 66, 22, 15],
    ["1", 20, 28, 38, 45],
    ["2", 31, 38, 55, 66],
    ["3", 50, 55, 77, 80],
    ["4", 77, 77, 66, 50],
    ["5", 68, 66, 22, 15],
    ["1", 20, 28, 38, 45],
    ["2", 31, 38, 55, 66],
    ["3", 50, 55, 77, 80],
    ["4", 77, 77, 66, 50],
    ["5", 68, 66, 22, 15],
    ["1", 20, 28, 38, 45],
    ["2", 31, 38, 55, 66],
    ["3", 50, 55, 77, 80],
    ["4", 77, 77, 66, 50],
    ["5", 68, 66, 22, 15],
]

const option = {
    legend: "none",
    backgroundColor:"grey",
    candlestick: {
        fallingColor: { strokeWidth: 0, fill: 'red' }, 
        risingColor: { strokeWidth: 0, fill: 'green' }, 
      },
};

const CandleDisplay = () => {
    // useEffect(() => {
    //     axios
    //     .get("http://localhost:5000")
    //     .then(response => {
    //         console.log(response.data);
    //     })
    // },[])
    return (
        <div>
        <Chart
            width={"100%"}
            height={350}
            chartType="CandlestickChart"
            data={data}
            options={option}
            rootProps={{ "data-testid": "1" }}
        />
        </div>
    );
};

export default CandleDisplay;
