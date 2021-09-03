import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const bybit = async (req: NextApiRequest, res: NextApiResponse) => {
    const { pair } = req.query;
    if (Array.isArray(pair)) {
        return res.status(400).send("invalid pair.");
    }
    const bybitLimit: number = 200;
    const fix = pair === "xrpusdt" ? 3 : 1;
    const bybitEndPoint: string = "https://api.bybit.com";
    const bybitOrderBook: string = `/spot/quote/v1/depth/merged?symbol=${pair.toUpperCase()}&scale=${fix}&limit=${bybitLimit}`;
    const response = await axios.get(bybitEndPoint + bybitOrderBook);
    const xbid: number[] = [],
        ybid: number[] = [],
        xask: number[] = [],
        yask: number[] = [];
    for (let i = 0; i <= response.data.result.bids.length - 1; i++) {
        xbid[i] = parseFloat(response.data.result.bids[i][0]);
        ybid[i] = parseFloat(response.data.result.bids[i][1]);
    }
    for (let j = 0; j < response.data.result.asks.length; j++) {
        xask[j] = parseFloat(response.data.result.asks[j][0]);
        yask[j] = parseFloat(response.data.result.asks[j][1]);
    }
    const bybitOrder = [xask, yask, xbid, ybid];
    return res.status(200).json(bybitOrder);
};

export default bybit;
