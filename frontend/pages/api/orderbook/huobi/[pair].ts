import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const huobi = async (req: NextApiRequest, res: NextApiResponse) => {
    const { pair } = req.query;
    if (Array.isArray(pair)) {
        return res.status(400).send("invalid pair.");
    }
    const step: string = pair === "xrpusdt" ? 'step9':'step12' 
    const newPairName = pair.slice(0, 3) + "-" + pair.slice(3);
    const huobiEndPoint = "https://api.hbdm.com";
    const huobiOrderBook = `/linear-swap-ex/market/depth?contract_code=${newPairName}&type=${step}`;
    const response = await axios.get(huobiEndPoint + huobiOrderBook);
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
    return res.status(200).json(orderbook);
};

export default huobi;
