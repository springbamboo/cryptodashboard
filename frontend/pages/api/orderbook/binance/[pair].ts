import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const binance = async (req: NextApiRequest, res: NextApiResponse) => {
    const limit = 100;
    const httpEndPoint: string = "https://fapi.binance.com";
    const { pair } = req.query;
    if (Array.isArray(pair)) {
        return res.status(400).send("invalid pair.");
    }
    const httpOrderBook: string = `/fapi/v1/depth?symbol=${pair}&limit=${limit}`;
    const response = await axios.get(httpEndPoint + httpOrderBook);
    const newData = response.data;
    const bidOne: number =
        pair === "xrpusdt"
            ? Math.round(parseFloat(newData.bids[0][0]) * 1000) / 1000
            : parseInt(newData.bids[0][0]);
    const bidLast: number =
        pair === "xrpusdt"
            ? Math.round(parseFloat(newData.bids[limit - 1][0]) * 1000) / 1000
            : parseInt(newData.bids[limit - 1][0]);
    const askOne: number =
        pair === "xrpusdt"
            ? Math.round(parseFloat(newData.asks[0][0]) * 1000) / 1000
            : parseInt(newData.asks[0][0]);
    const askLast: number =
        pair === "xrpusdt"
            ? Math.round(parseFloat(newData.asks[limit - 1][0]) * 1000) / 1000
            : parseInt(newData.asks[limit - 1][0]);
    const delta: number = pair === "xrpusdt" ? 0.001 : 1;
    const widthBid: number =
        pair === "xrpusdt"
            ? Math.round((bidOne - bidLast + delta) * 1000)
            : bidOne - bidLast + delta;
    const xbid: number[] = [];
    const ybid: number[] = new Array(widthBid).fill(0);
    const xask: number[] = [];
    const widthAsk: number =
        pair === "xrpusdt"
            ? Math.round((askLast - askOne + delta) * 1000)
            : askLast - askOne + delta;
    const yask: number[] = new Array(widthAsk).fill(0);
    let index_bid = 0;
    for (let i = bidOne; i >= bidLast; i -= delta) {
    // for (let i = bidLast; i <= bidOne; i += delta) {
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
            pair === "xrpusdt"
                ? parseFloat((Math.floor(xask[i] * 1000) / 1000).toFixed(3))
                : Math.floor(xask[i]);
        yask[i] = parseFloat((Math.floor(yask[i] * 1000) / 1000).toFixed(3));
    }
    for (let j = 0; j < ybid.length; j++) {
        xbid[j] =
            pair === "xrpusdt"
                ? parseFloat((Math.floor(xbid[j] * 1000) / 1000).toFixed(3))
                : Math.floor(xbid[j]);
        ybid[j] = parseFloat((Math.floor(ybid[j] * 1000) / 1000).toFixed(3));
    }
    const orderbook = [xask, yask, xbid, ybid];
    return res.status(200).json(orderbook);
};

export default binance;
