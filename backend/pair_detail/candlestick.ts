import axios from "axios";
import express from "express";
const app = express();
app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
app.get("/binance/btcusdt", (req, res) => {
    const httpEndPoint: string = "https://fapi.binance.com";
    const httpKline: string =
        "/fapi/v1/klines?symbol=btcusdt&interval=1m&limit=500";
    const promise = axios.get(httpEndPoint + httpKline);
    promise.then((response: { data: any }) => {
        const newData = response.data;
        const cdata = newData.map((d: string[]) => {
            return [
                d[0],
                parseFloat(d[1]),
                parseFloat(d[2]),
                parseFloat(d[3]),
                parseFloat(d[4]),
                // parseFloat(d[5]),
            ];
        });
        res.end(JSON.stringify(cdata));
    });
});

app.listen(5000);
