import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});


export default function BasicTable() {
    cosnt series = []
    return (
        <div>
            Orderbook
        </div>
    );
}
