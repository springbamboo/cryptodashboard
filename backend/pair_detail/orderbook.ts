import axios from "axios";
import express from "express";
const app = express();
const limit = 1000;
const httpEndPoint: string = "https://fapi.binance.com";
// bid 大→小  ask 小→大
app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
app.get(`/binance/:pair`, (req, res) => {
    // console.log(req.params.pair);
    const httpOrderBook: string = `/fapi/v1/depth?symbol=${req.params.pair}&limit=${limit}`;
    const promise = axios.get(httpEndPoint + httpOrderBook);
    promise.then((response) => {
        const newData = response.data;
        const bidOne:number = req.params.pair === 'xrpusdt' ? Math.round(parseFloat(newData.bids[0][0]) * 1000) / 1000:parseInt(newData.bids[0][0]);
        const bidLast:number = req.params.pair === 'xrpusdt' ? Math.round(parseFloat(newData.bids[limit - 1][0]) * 1000) / 1000:parseInt(newData.bids[limit - 1][0]);
        const askOne:number = req.params.pair === 'xrpusdt' ? Math.round(parseFloat(newData.asks[0][0]) * 1000) / 1000:parseInt(newData.asks[0][0]);
        const askLast:number = req.params.pair === 'xrpusdt' ? Math.round(parseFloat(newData.asks[limit - 1][0]) * 1000) / 1000:parseInt(newData.asks[limit - 1][0]);
        const delta: number = req.params.pair === 'xrpusdt' ? 0.001 : 1;
        const widthBid:number = req.params.pair === 'xrpusdt' ? Math.round((bidOne - bidLast + delta) *  1000): bidOne - bidLast + delta;
        const xbid: number[] = [];
        const ybid: number[] = new Array(widthBid).fill(0);
        const xask: number[] = [];
        const widthAsk:number = req.params.pair === 'xrpusdt' ? Math.round((askLast - askOne + delta) *  1000): askLast - askOne + delta;
        const yask: number[] = new Array(widthAsk).fill(0);
        let index_bid = 0;
        for (let i = bidOne; i >= bidLast; i-= delta) {
            xbid.push(i);
            for(let j = 0; j < limit; j++){
                if(parseFloat(newData.bids[j][0]) < i + delta && parseFloat(newData.bids[j][0]) >= i){
                    ybid[index_bid] += parseFloat(newData.bids[j][1]);
                }
            }
            index_bid += 1;
        }
        let index_ask = 0;
        for(let i = askOne; i <= askLast; i+=delta){
            xask.push(i);
            for(let j = 0; j < limit; j++){
                if(parseFloat(newData.asks[j][0]) >= i && parseFloat(newData.asks[j][0]) < i + delta){
                    yask[index_ask] += parseFloat(newData.asks[j][1]);
                }
            }
            index_ask += 1;
        }
        for(let i = 0; i < yask.length; i++){
            xask[i] = req.params.pair === 'xrpusdt' ? parseFloat((Math.floor(xask[i] * 1000) / 1000).toFixed(3)) : Math.floor(xask[i]);
            yask[i] = parseFloat((Math.floor(yask[i] * 1000) / 1000).toFixed(3));
        }
        for(let j = 0; j < ybid.length; j++){
            xbid[j] = req.params.pair === 'xrpusdt' ? parseFloat((Math.floor(xbid[j] * 1000) / 1000).toFixed(3)) : Math.floor(xbid[j]);
            ybid[j] = parseFloat((Math.floor(ybid[j] * 1000) / 1000).toFixed(3));
        }
        const orderbook = [xask, yask, xbid, ybid];
        res.end(JSON.stringify(orderbook));
    });
});
app.listen(5400);
