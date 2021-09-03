import WebSocket from "ws";
import { Coindata } from "./cointype";
import { generateCoindata } from "./generatecoindata";
import request from "request";
import EventEmitter from "events";
import log from "../lib/log";
export const bitfinexEvent = new EventEmitter();

const ws: WebSocket = new WebSocket("wss://api-pub.bitfinex.com/ws/2");
const exchange: string = "bitfinex";

const http_endPoint = "https://api-pub.bitfinex.com/v2/";

const pairs: { [key: string]: Coindata } = {
    BTCUSDT: generateCoindata("BTCUSDT", exchange),
    ETHUSDT: generateCoindata("ETHUSDT", exchange),
    XRPUSDT: generateCoindata("XRPUSDT", exchange),
};
const coinData: { [key: string]: [number, number, number] } = {
    BTC: [0, 0, 0], // chanID, shortValue, longValue
    ETH: [0, 0, 0],
    XRP: [0, 0, 0],
};
let fundingId: number = 0;

setInterval(() => {
    for (let i in pairs) {
        let pair: string = i.slice(0, 3);
        const http_funding_short = `stats1/pos.size:1m:t${pair}USD:short/hist`;
        const http_funding_long = `stats1/pos.size:1m:t${pair}USD:long/hist`;
        request(
            http_endPoint + http_funding_short,
            function (err, response, payload) {
                if (err) return console.log(err);
                try {
                    coinData[pair][1] = parseFloat(JSON.parse(payload)[0][1]); // shortの値を記憶
                } catch (err) {
                    return console.log(err);
                }
            }
        );
        request(
            http_endPoint + http_funding_long,
            function (err, response, payload) {
                if (err) return console.log(err);
                try {
                    coinData[pair][2] = parseFloat(JSON.parse(payload)[0][1]); // longの値を記憶
                } catch (err) {
                    return console.log(err);
                }
            }
        );
        pairs[i].ratio.short =
            coinData[pair][1] / (coinData[pair][1] + coinData[pair][2]); // shortの割合計算
        pairs[i].ratio.long =
            coinData[pair][2] / (coinData[pair][1] + coinData[pair][2]); // shortの割合計算
    }
}, 1000);

ws.on("open", () => {
    log("info", "\x1b[36mWebSocket\x1b[0m - Connected to Bitfinex");
    for (let key in coinData) {
        // price, quantity, changeのため
        const message: string = JSON.stringify({
            event: "subscribe",
            channel: "ticker",
            symbol: `t${key}USD`,
        });
        ws.send(message);
    }
    const message_funding: string = JSON.stringify({
        // fundingのため
        event: "subscribe",
        channel: "ticker",
        symbol: "fUSD",
    });
    ws.send(message_funding);
});

ws.on("message", (data: string) => {
    const payload = data;
    const jsonData = JSON.parse(payload);

    if (jsonData.pair) {
        // 各coin(btc,eth,xrp)のchannelIDを記憶
        coinData[jsonData.pair.slice(0, 3)][0] = jsonData.chanId;
    }
    if (jsonData.currency) {
        // fundingのchannelIDを記憶
        fundingId = jsonData.chanId;
    }

    for (let i in pairs) {
        // price, quantity, change
        if (
            jsonData[0] === coinData[i.slice(0, 3)][0] &&
            jsonData[1] !== "hb"
        ) {
            pairs[i].price = jsonData[1][6];
            pairs[i].quatity = jsonData[1][7] * pairs[i].price;
            pairs[i].change = jsonData[1][5];
            break;
        }
    }
    if (jsonData[0] === fundingId && jsonData[1] !== "hb") {
        // funding(btc,eth,xrp全て同じ)
        for (let i in pairs) {
            pairs[i].funding = jsonData[1][0];
        }
    }

    bitfinexEvent.emit("change", pairs);
});
