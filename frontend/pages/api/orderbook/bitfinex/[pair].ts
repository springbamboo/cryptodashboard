import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const bitfinex = async (req: NextApiRequest, res: NextApiResponse) => {
    const { pair } = req.query;
    if (Array.isArray(pair)) {
        return res.status(400).send("invalid pair.");
    }
    const newPainName = pair.slice(-1) + pair.toUpperCase().slice(0, -1);
    const bitfinexEndPoint: string = "https://api-pub.bitfinex.com/v2/";
    const bitfinexOrderBook = `book/${newPainName}/P0`;
    const response = await axios(bitfinexEndPoint + bitfinexOrderBook);
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
    return res.status(200).json(orderbook);
};

export default bitfinex;
