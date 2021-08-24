export {};
import WebSocket from "ws";
import request from "request";
import { Coindata } from "./cointype";
import { generateCoindata } from "./generatecoindata";
import { EventEmitter } from "stream";
export const bybitEvent = new EventEmitter();

let pair: string;
const exchange: string = "bybit";

const ws: WebSocket = new WebSocket("wss://stream.bybit.com/realtime_public");
const http_endPoint = "https://api.bybit.com";

// const server: WebSocket.Server = new WebSocket.Server({
//     port: 5001,
//     path: "/bybit",
// });
// let clients: WebSocket[] = [];

const pairs: { [key: string]: Coindata } = {
    BTCUSDT: generateCoindata("BTCUSDT", exchange),
    ETHUSDT: generateCoindata("ETHUSDT", exchange),
    XRPUSDT: generateCoindata("XRPUSDT", exchange),
};

const coinNameHttp = ["BTCUSDT", "ETHUSDT", "XRPUSDT"];

setInterval(() => {
    for (let i = 0; i < coinNameHttp.length; i++) {
        pair = coinNameHttp[i];
        let http_ratio = `/v2/public/account-ratio?symbol=${pair}&period=5min`;
        request(http_endPoint + http_ratio, (err, response, payload) => {
            for (let j in pairs) {
                if (j === JSON.parse(payload).result[0].symbol)
                    // console.log(JSON.parse(payload).result[0])
                    pairs[JSON.parse(payload).result[0].symbol].ratio.long =
                        JSON.parse(payload).result[0].buy_ratio;
                pairs[JSON.parse(payload).result[0].symbol].ratio.short =
                    JSON.parse(payload).result[0].sell_ratio;
            }
        });
    }
}, 2000);

ws.on("open", () => {
    const message: string = JSON.stringify({
        op: "subscribe",
        args: [
            "instrument_info.100ms.BTCUSDT",
            "instrument_info.100ms.ETHUSDT",
            "instrument_info.100ms.XRPUSDT",
        ],
    });
    ws.send(message);
});

// server.on("connection", (ws: WebSocket) => {
//     clients.push(ws);
//     console.log(clients.length);
// });

ws.on("message", (data: string) => {
    let type: string = JSON.parse(data).type;
    if (type === "snapshot") {
        for (let i in pairs) {
            if (i === JSON.parse(data).data.symbol) {
                const snapshot = JSON.parse(data).data;
                pairs[JSON.parse(data).data.symbol].change =
                    parseFloat(snapshot.price_24h_pcnt_e6) / 1000000;
                pairs[JSON.parse(data).data.symbol].price =
                    parseFloat(snapshot.last_price_e4) / 10000;
                pairs[JSON.parse(data).data.symbol].quatity =
                    parseFloat(snapshot.turnover_24h_e8) / 100000000;
                pairs[JSON.parse(data).data.symbol].funding =
                    parseFloat(snapshot.funding_rate_e6) / 10000;
            }
        }
    }
    if (type === "delta") {
        for (let j in pairs) {
            if (j === JSON.parse(data).data.update[0].symbol) {
                const delta = JSON.parse(data).data.update[0];
                pairs[delta.symbol].change =
                    parseFloat(delta.price_24h_pcnt_e6) / 1000000 ||
                    pairs[delta.symbol].change;
                pairs[delta.symbol].quatity =
                    parseFloat(delta.turnover_24h_e8) / 100000000 ||
                    pairs[delta.symbol].quatity;
                pairs[delta.symbol].price =
                    parseFloat(delta.last_price_e4) / 10000 ||
                    pairs[delta.symbol].price;
                pairs[delta.symbol].funding =
                    parseFloat(delta.funding_rate_e6) / 1000000 ||
                    pairs[delta.symbol].funding;
            }
        }
    }
    // for (let i = 0; i < clients.length; i++) {
    //     clients[i].send(JSON.stringify(pairs));
    // }
    bybitEvent.emit("change", pairs);
});
