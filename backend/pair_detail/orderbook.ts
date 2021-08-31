import axios from "axios";
import express from "express";

const app = express();

const httpEndPoint: string = "https://fapi.binance.com";
const httpOrderBook: string = "/fapi/v1/depth?symbol=btcusdt&limit=1000";
// bid 大→小  ask 小→大
app.get("/binance/btcusdt", (req, res) => {
    const promise = axios.get(httpEndPoint + httpOrderBook);
    promise.then((response) => {
        const newData = response.data;
        const bidOne = parseInt(newData.bids[0][0]) + 1;
        const bidLast = parseInt(newData.bids[999][0]);
        const xbid: number[] = [],
            ybid: number[] = new Array(bidOne - bidLast + 1).fill(0);
        console.log(bidOne, bidLast);
        let index = 0;
        for (let i = bidOne; i >= bidLast; i--) {
            xbid.push(i);
            for(let j = 0; j < 1000; j++){
                if(parseFloat(newData.bids[j][0]) < i + 1 && parseFloat(newData.bids[j][0]) >= i){
                    ybid[index] += parseFloat(newData.bids[j][1]);
                }
            }
            index += 1;
        }
        const orderbook = [xbid, ybid];
        res.end(JSON.stringify(orderbook));
    });
});
app.listen(5400);
