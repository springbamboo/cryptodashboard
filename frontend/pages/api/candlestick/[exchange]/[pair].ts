import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const candlestick = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.query.exchange) {
        case "binance":
            return binance(req, res);
        case "huobi":
            return huobi(req, res);
        case "okex":
            return okex(req, res);
        case "bitfinex":
            return bitfinex(req, res);
        case "bybit":
            return bybit(req, res);
    }
    return res.status(400).send("invalid exchange name.");
};

const binance = async (req: NextApiRequest, res: NextApiResponse) => {
    const pairName = req.query.pair;
    if (Array.isArray(pairName)) {
        return res.status(400).send("invalid pair.");
    }
    const httpEndPoint: string = "https://fapi.binance.com";
    const httpKline: string = `/fapi/v1/klines?symbol=${pairName}&interval=1m&limit=500`;
    const response = await axios.get(httpEndPoint + httpKline);
    const newData = response.data;
    const cdata = newData.map((d: string[]) => [
        d[0],
        parseFloat(d[1]),
        parseFloat(d[2]),
        parseFloat(d[3]),
        parseFloat(d[4]),
        // parseFloat(d[5]),
    ]);
    res.status(200).json(cdata);
};

const huobi = async (req: NextApiRequest, res: NextApiResponse) => {
    const pairName = req.query.pair;
    if (Array.isArray(pairName)) {
        return res.status(400).send("invalid pair.");
    }
    const size = 150;
    const newPairName =
        pairName.toUpperCase().slice(0, 3) +
        "-" +
        pairName.toUpperCase().slice(3);
    const huobiEndPoint = "https://api.hbdm.com";
    const huobiKline = `/linear-swap-ex/market/history/kline?contract_code=${newPairName}&period=1min&size=${size}`;
    const response: { data: any } = await axios(huobiEndPoint + huobiKline);
    const newData = response.data.data;
    const cdata = newData.map((d: { [key: string]: number }) => [
        d["id"],
        d["open"],
        d["high"],
        d["low"],
        d["close"],
        // d["amount"]
    ]);
    res.status(200).json(cdata);
};
const okex = async (req: NextApiRequest, res: NextApiResponse) => {
    const pairName = req.query.pair;
    if (Array.isArray(pairName)) {
        return res.status(400).send("invalid pair.");
    }
    const newPairName =
        pairName.toUpperCase().slice(0, 3) +
        "-" +
        pairName.toUpperCase().slice(3, 7) +
        "-SWAP";
    const httpEndPont = "https://aws.okex.com";
    const okexKline = `/api/swap/v3/instruments/${newPairName}/candles?granularity=60`;
    const response = await axios(httpEndPont + okexKline);
    const newData = response.data;
    const cdata = newData.map((d: { [key: string]: string }) => {
        const temp = new Date(d[0]);
        const time = temp.getTime();
        return [
            time,
            parseFloat(d[1]),
            parseFloat(d[2]),
            parseFloat(d[3]),
            parseFloat(d[4]),
            // parseFloat(d[6])
        ];
    });
    res.status(200).json(cdata);
};
const bitfinex = async (req: NextApiRequest, res: NextApiResponse) => {
    const pairName = req.query.pair;
    if (Array.isArray(pairName)) {
        return res.status(400).send("invalid pair.");
    }
    const newPairName =
        pairName.slice(-1) + pairName.toUpperCase().slice(0, -1);
    const bitfinexEndPoint: string = "https://api-pub.bitfinex.com/v2/";
    const bitfinexKline = `candles/trade:1m:${newPairName}/hist`;
    const response = await axios.get(bitfinexEndPoint + bitfinexKline);
    const newData = response.data;
    const cdata = newData.map((d: number[]) => {
        return [
            d[0],
            d[1],
            d[3],
            d[4],
            d[2],
            // d[5]
        ];
    });
    res.status(200).json(cdata);
};
const bybit = async (req: NextApiRequest, res: NextApiResponse) => {
    const pairName = req.query.pair;
    if (Array.isArray(pairName)) {
        return res.status(400).send("invalid pair.");
    }
    const newPairName = pairName.toUpperCase();
    const httpEndPoint: string = "https://api.bybit.com";
    const httpKline: string = `/spot/quote/v1/kline?symbol=${newPairName}&interval=1m&limit=200`;
    const response = await axios.get(httpEndPoint + httpKline);
    const newData = response.data.result;
    const cdata = newData.map((d: string[]) => [
        d[0],
        parseFloat(d[1]),
        parseFloat(d[2]),
        parseFloat(d[3]),
        parseFloat(d[4]),
        // parseFloat(d[5])
    ]);
    res.status(200).json(cdata);
};

export default candlestick;
