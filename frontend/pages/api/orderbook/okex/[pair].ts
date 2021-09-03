import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const okex = async (req: NextApiRequest, res: NextApiResponse) => {
    const { pair } = req.query;
    if (Array.isArray(pair)) {
        return res.status(400).send("invalid pair.");
    }
    const limit = 40;
    const depth = pair === "xrpusdt" ? 0.0001 : 0.1;
    const newPairName =
        pair.toUpperCase().slice(0, 3) +
        "-" +
        pair.toUpperCase().slice(3, 7) +
        "-SWAP";
    const httpEndPont = "https://aws.okex.com";
    const okexOrder = `/api/swap/v3/instruments/${newPairName}/depth?depth=${depth}&size=${limit}`;
    const response = await axios(httpEndPont + okexOrder);
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
    return res.status(200).json(orderbook);
};

export default okex;
