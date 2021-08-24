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
        args: [
            "spot/ticker:BTC-USDT",
            "spot/ticker:ETH-USDT",
            "spot/ticker:XRP-USDT",
            "swap/funding_rate:BTC-USDT-SWAP",
            "swap/funding_rate:ETH-USDT-SWAP",
            "swap/funding_rate:XRP-USDT-SWAP",
        ],
    });
    ws.send(message);
});

ws.on("message", (data: Buffer) => {
    const payload = pako.inflateRaw(data, { to: "string" });
    const jsonData = JSON.parse(payload);
    // console.log(jsonData);
    if (jsonData.table === "spot/ticker") {
        if (jsonData.data) {
            for (let i in pairs) {
                if (i === jsonData.data[0].instrument_id.replace("-", "")) {
                    pairs[i].price = parseFloat(jsonData.data[0].last);
                    pairs[i].quatity = parseFloat(
                        jsonData.data[0].quote_volume_24h
                    );
                    pairs[i].change =
                        1 -
                        parseFloat(jsonData.data[0].open_24h) /
                            parseFloat(jsonData.data[0].last);
                }
            }
        }
    } else if (jsonData.table === "swap/funding_rate") {
        if (jsonData.data) {
            for (let i in pairs) {
                if (
                    i ===
                    jsonData.data[0].instrument_id.replace("-", "").slice(0, 7)
                ) {
                    pairs[i].funding = jsonData.data[0].funding_rate;
                }
            }
        }
    }
    // console.log(pairs);
    for(let i = 0; i < clients.length; i++){
        clients[i].send(JSON.stringify(pairs));
    }
    console.log(JSON.parse(payload));
});
