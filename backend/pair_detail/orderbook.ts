import axios from "axios";
import express from "express";
const app = express();
// bid(buy) 大→小  ask(sell) 小→大
app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
app.get(`/binance/:pair`, (req, res) => {
    const limit = 100;
    const httpEndPoint: string = "https://fapi.binance.com";
    const httpOrderBook: string = `/fapi/v1/depth?symbol=${req.params.pair}&limit=${limit}`;
    const promise = axios.get(httpEndPoint + httpOrderBook);
    promise.then((response) => {
        const newData = response.data;
        const bidOne: number =
            req.params.pair === "xrpusdt"
                ? Math.round(parseFloat(newData.bids[0][0]) * 1000) / 1000
                : parseInt(newData.bids[0][0]);
        const bidLast: number =
            req.params.pair === "xrpusdt"
                ? Math.round(parseFloat(newData.bids[limit - 1][0]) * 1000) /
                  1000
                : parseInt(newData.bids[limit - 1][0]);
        const askOne: number =
            req.params.pair === "xrpusdt"
                ? Math.round(parseFloat(newData.asks[0][0]) * 1000) / 1000
                : parseInt(newData.asks[0][0]);
        const askLast: number =
            req.params.pair === "xrpusdt"
                ? Math.round(parseFloat(newData.asks[limit - 1][0]) * 1000) /
                  1000
                : parseInt(newData.asks[limit - 1][0]);
        const delta: number = req.params.pair === "xrpusdt" ? 0.001 : 1;
        const widthBid: number =
            req.params.pair === "xrpusdt"
                ? Math.round((bidOne - bidLast + delta) * 1000)
                : bidOne - bidLast + delta;
        const xbid: number[] = [];
        const ybid: number[] = new Array(widthBid).fill(0);
        const xask: number[] = [];
        const widthAsk: number =
            req.params.pair === "xrpusdt"
                ? Math.round((askLast - askOne + delta) * 1000)
                : askLast - askOne + delta;
        const yask: number[] = new Array(widthAsk).fill(0);
        let index_bid = 0;
        for (let i = bidOne; i >= bidLast; i -= delta) {
            xbid.push(i);
            for (let j = 0; j < limit; j++) {
                if (
                    parseFloat(newData.bids[j][0]) < i + delta &&
                    parseFloat(newData.bids[j][0]) >= i
                ) {
                    ybid[index_bid] += parseFloat(newData.bids[j][1]);
                }
            }
            index_bid += 1;
        }
        let index_ask = 0;
        for (let i = askOne; i <= askLast; i += delta) {
            xask.push(i);
            for (let j = 0; j < limit; j++) {
                if (
                    parseFloat(newData.asks[j][0]) >= i &&
                    parseFloat(newData.asks[j][0]) < i + delta
                ) {
                    yask[index_ask] += parseFloat(newData.asks[j][1]);
                }
            }
            index_ask += 1;
        }
        for (let i = 0; i < yask.length; i++) {
            xask[i] =
                req.params.pair === "xrpusdt"
                    ? parseFloat((Math.floor(xask[i] * 1000) / 1000).toFixed(3))
                    : Math.floor(xask[i]);
            yask[i] = parseFloat(
                (Math.floor(yask[i] * 1000) / 1000).toFixed(3)
            );
        }
        for (let j = 0; j < ybid.length; j++) {
            xbid[j] =
                req.params.pair === "xrpusdt"
                    ? parseFloat((Math.floor(xbid[j] * 1000) / 1000).toFixed(3))
                    : Math.floor(xbid[j]);
            ybid[j] = parseFloat(
                (Math.floor(ybid[j] * 1000) / 1000).toFixed(3)
            );
        }
        const orderbook = [xask, yask, xbid, ybid];
        res.end(JSON.stringify(orderbook));
    });
});
app.get("/bybit/:pair", (req, res) => {
    const pairName: string = req.params.pair;
    const bybitLimit: number = 200;
    const fix = pairName === "xrpusdt" ? 3 : 1;
    const bybitEndPoint: string = "https://api.bybit.com";
    const bybitOrderBook: string = `/spot/quote/v1/depth/merged?symbol=${pairName.toUpperCase()}&scale=${fix}&limit=${bybitLimit}`;
    const promise = axios.get(bybitEndPoint + bybitOrderBook);
    promise.then((response) => {
        const xbid: number[] = [],
            ybid: number[] = [],
            xask: number[] = [],
            yask: number[] = [];
        for (let i = response.data.result.bids.length - 1; i >= 0; i--) {
            xbid[i] = parseFloat(response.data.result.bids[i][0]);
            ybid[i] = parseFloat(response.data.result.bids[i][1]);
        }
        for (let j = 0; j < response.data.result.asks.length; j++) {
            xask[j] = parseFloat(response.data.result.asks[j][0]);
            yask[j] = parseFloat(response.data.result.asks[j][1]);
        }
        const bybitOrder = [xbid, ybid, xask, yask];
        res.end(JSON.stringify(bybitOrder));
    });
});
app.get("/huobi/:pair", (req, res) => {
    const pairName = req.params.pair;
    const newPairName = pairName.slice(0, 3) + "-" + pairName.slice(3);
    const huobiEndPoint = "https://api.hbdm.com";
    const huobiOrderBook = `/linear-swap-ex/market/depth?contract_code=${newPairName}&type=step4`;
    const promise = axios.get(huobiEndPoint + huobiOrderBook);
    promise.then((response) => {
        const xask: number[] = [],
            yask: number[] = [],
            xbid: number[] = [],
            ybid: number[] = [];
        for (let i = 0; i < response.data.tick.asks.length; i++) {
            xask[i] = response.data.tick.asks[i][0];
            yask[i] = response.data.tick.asks[i][1];
        }
        for (let j = 0; j < response.data.tick.bids.length; j++) {
            xbid[j] = response.data.tick.bids[j][0];
            ybid[j] = response.data.tick.bids[j][1];
        }
        const orderbook = [xask, yask, xbid, ybid];
        res.end(JSON.stringify(orderbook));
    });
});
app.get("/bitfinex/:pair", (req, res) => {
    const pairName: string = req.params.pair;
    const newPainName =
        pairName.slice(-1) + pairName.toUpperCase().slice(0, -1);
    const bitfinexEndPoint: string = "https://api-pub.bitfinex.com/v2/";
    const bitfinexOrderBook = `book/${newPainName}/P0`;
    const promise = axios(bitfinexEndPoint + bitfinexOrderBook);
    promise.then((response) => {
        const xask: number[] = [],
            yask: number[] = [],
            xbid: number[] = [],
            ybid: number[] = [];
        for (let i = 0; i < response.data.length; i++) {
            if (response.data[i][2] > 0) {
                xask.push(response.data[i][0]);
                yask.push(response.data[i][2]);
            } else if (response.data[i][2] < 0) {
                xbid.push(response.data[i][0]);
                ybid.push(Math.abs(response.data[i][2]));
            }
        }
        const orderbook = [xask, yask, xbid, ybid];
        res.end(JSON.stringify(orderbook));
    });
});
app.get("/okex/:pair", (req, res) => {
    const limit = 50;
    const pairName = req.params.pair;
    const depth = pairName === "xrpusdt" ? 0.0001 : 0.1;
    const newPairName =
        pairName.toUpperCase().slice(0, 3) +
        "-" +
        pairName.toUpperCase().slice(3, 7) +
        "-SWAP";
    const httpEndPont = "https://aws.okex.com";
    const okexOrder = `/api/swap/v3/instruments/${newPairName}/depth?depth=${depth}&size=${limit}`;
    const promise = axios(httpEndPont + okexOrder);
    promise.then((response) => {
        const xask: number[] = [],
            yask: number[] = [],
            xbid: number[] = [],
            ybid: number[] = [];
        for (let i = 0; i < response.data.asks.length; i++) {
            xask[i] = parseFloat(response.data.asks[i][0]);
            yask[i] = parseFloat(response.data.asks[i][1]);
        }
        for (let j = 0; j < response.data.bids.length; j++) {
            xbid[j] = parseFloat(response.data.bids[j][0]);
            ybid[j] = parseFloat(response.data.bids[j][1]);
        }
        const orderbook = [xask, yask, xbid, ybid];
        res.end(JSON.stringify(orderbook));
    });
});
app.listen(5400);
