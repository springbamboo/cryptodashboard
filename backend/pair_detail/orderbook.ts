import axios from "axios";
import express from "express";

const app = express();

const httpEndPoint: string = "https://fapi.binance.com";
const httpOrderBook: string = "/fapi/v1/depth?symbol=btcusdt&limit=1000";

app.get("/binance/btcusdt", (req, res) => {
    const promise = axios.get(httpEndPoint + httpOrderBook);
    promise.then((payload) => {
        res.end(JSON.stringify(payload.data));
    });
});
app.listen(5400);


