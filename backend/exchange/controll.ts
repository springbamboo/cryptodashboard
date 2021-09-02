import { Coindata } from "./cointype";
import WebSocket from "ws";
import { binanceEvent } from "./binance";
import { bybitEvent } from "./bybit";
import { bitfinexEvent } from "./bitfinex";
import { huobiEvent } from "./huobi";
import { okexEvent } from "./okex";

const server = new WebSocket.Server({ port: 5001, path: "/home" });

let clients: WebSocket[] = [];

// クライアント初期接続時に送るために一時保管
const tempPairs: { [coin: string]: { [key: string]: Coindata } | null } = {
    binance: null,
    bybit: null,
    bitfinex: null,
    huobi: null,
    okex: null,
};

server.on("connection", (ws: WebSocket) => {
    // 初期値を送信
    for (const key in tempPairs) {
        if (!tempPairs.hasOwnProperty(key)) break;
        if (tempPairs[key] === null) break;
        ws.send(JSON.stringify(tempPairs[key]));
    }
    // 接続を配列に追加
    clients.push(ws);
    console.log(clients.length);
});

const eventEmitterList = [
    binanceEvent,
    bybitEvent,
    bitfinexEvent,
    huobiEvent,
    okexEvent,
];

for (const eventEmitter of eventEmitterList) {
    eventEmitter.on("change", (pairs: { [key: string]: Coindata }) => {
        // 一時保管データの更新
        const exchangeName: string = pairs["BTCUSDT"].exchange;
        tempPairs[exchangeName] = pairs;
        // クライアントへ送信
        for (let i = 0; i < clients.length; i++) {
            clients[i].send(JSON.stringify(pairs));
        }
    });
}
