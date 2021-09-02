import WebSocket from "ws";
import axios from "axios";
import express from "express";

const app = express();

app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get("/bybit/:pair", (req, res) => {
    const pairName = req.params.pair;
    const httpEndPoint: string = "https://api.bybit.com";
    const httpKline: string = `/spot/quote/v1/kline?symbol=${pairName}&interval=1m&limit=200`;
    const promise = axios.get(httpEndPoint + httpKline);
    promise.then((response: { data: any }) => {
        const newData = response.data.result;
        const cdata = newData.map((d: string[]) => {
            return [
                d[0],
                parseFloat(d[1]),
                parseFloat(d[2]),
                parseFloat(d[3]),
                parseFloat(d[4]),
            ];
        });
        res.end(JSON.stringify(cdata));
    });
});
app.listen(5000);
