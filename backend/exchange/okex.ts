import WebSocket from "ws";
import pako from "pako";
import { Coindata } from "./cointype";
import { generateCoindata } from "./generatecoindata";
import request from "request";


const ws: WebSocket = new WebSocket("wss://awspush.okex.com:8443/ws/v3");
const server = new WebSocket.Server({port:5001});

const exchange: string = "okex";

const http_endPoint = "https://www.okex.com";

const coinNameHttp = ["btc", "eth", "xrp"];

const pairs: { [key: string]: Coindata } = {
    BTCUSDT: generateCoindata("BTCUSDT", exchange),
    ETHUSDT: generateCoindata("ETHUSDT", exchange),
    XRPUSDT: generateCoindata("XRPUSDT", exchange),
};

let clients: WebSocket[] = [];

setInterval(() => {
    for (let i = 0; i < coinNameHttp.length; i++) {
        let pair: string = coinNameHttp[i];
        const http_funding = `/api/information/v3/${pair}/long_short_ratio`;
        request(
            http_endPoint + http_funding,
            function (err, response, payload) {
                pairs[pair.toUpperCase() + "USDT"].ratio.short =
                    100 / (1 + parseFloat(JSON.parse(payload)[0][1]));
                pairs[pair.toUpperCase() + "USDT"].ratio.long =
                    100 - pairs[pair.toUpperCase() + "USDT"].ratio.short;
            }
        );
    }
}, 1000);

server.on("connection", (ws) => {
    clients.push(ws);
    console.log(clients.length);
})

ws.on("open", () => {
    const message: string = JSON.stringify({
        op: "subscribe",
        args: ["spot/ticker:BTC-USDT"],
    });
    ws.send(message);
});

ws.on("message", (data: Buffer) => {
    const payload = pako.inflateRaw(data, { to: "string" });
    console.log(JSON.parse(payload));
});
