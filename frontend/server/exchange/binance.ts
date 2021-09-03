export {};
import WebSocket from "ws";
import request from "request";
import { Coindata } from "./cointype";
import { generateCoindata } from "./generatecoindata";
import EventEmitter from "events";
export const binanceEvent = new EventEmitter();

const exchange: string = "binance";
let pair: string;
const ws: WebSocket = new WebSocket("wss://fstream.binance.com/ws");
const http_endPoint = "https://fapi.binance.com";

// const server = new WebSocket.Server({ port: 5001, path: "/binance" });

const coinNameHttp = ["BTCUSDT", "ETHUSDT", "XRPUSDT"];

// let clients: WebSocket[] = [];

const pairs: { [key: string]: Coindata } = {
    BTCUSDT: generateCoindata("BTCUSDT", exchange),
    ETHUSDT: generateCoindata("ETHUSDT", exchange),
    XRPUSDT: generateCoindata("XRPUSDT", exchange),
};

setInterval(() => {
    for (let i = 0; i < coinNameHttp.length; i++) {
        pair = coinNameHttp[i];
        let http_ratio = `/futures/data/topLongShortPositionRatio?symbol=${pair}&period=5m&limit=1`;
        request(http_endPoint + http_ratio, function (err, response, payload) {
            if (err) return console.log(err);
            try {
                pairs[JSON.parse(payload)[0].symbol].ratio.long = parseFloat(
                    JSON.parse(payload)[0].longAccount
                );
                pairs[JSON.parse(payload)[0].symbol].ratio.short = parseFloat(
                    JSON.parse(payload)[0].shortAccount
                );
            } catch (err) {
                return console.log(err);
            }
        });
    }
}, 5000);

ws.on("open", () => {
    const message = JSON.stringify({
        method: "SUBSCRIBE",
        params: [
            "btcusdt@ticker",
            "ethusdt@ticker",
            "xrpusdt@ticker",
            "btcusdt@markPrice",
            "ethusdt@markPrice",
            "xrpusdt@markPrice",
        ],
        id: 1,
    });
    ws.send(message);
});

// server.on("connection", (ws: WebSocket) => {
//     clients.push(ws);
//     console.log(clients.length);
// });

ws.on("message", (data: string) => {
    if (JSON.parse(data).e === "24hrTicker") {
        const pairName = JSON.parse(data).s;
        for (let i in pairs) {
            if (i === pairName) {
                pairs[pairName].price = parseFloat(JSON.parse(data).c);
                pairs[pairName].change = parseFloat(JSON.parse(data).P) / 100;
                pairs[pairName].quatity = parseFloat(JSON.parse(data).q);
            }
        }
    }
    if (JSON.parse(data).e === "markPriceUpdate") {
        for (let j in pairs) {
            if (j === JSON.parse(data).s) {
                pairs[j].funding = parseFloat(JSON.parse(data).r);
            }
        }
    }
    // for (let i = 0; i < clients.length; i++) {
    //     clients[i].send(JSON.stringify(pairs));
    // }
    binanceEvent.emit("change", pairs);
});
