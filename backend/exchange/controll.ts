import { Coindata } from "./cointype";
import WebSocket from "ws";
import { binanceEvent } from "./binance";
import { bybitEvent } from "./bybit";
import { bitfinexEvent } from "./bitfinex";
import { huobiEvent } from "./huobi";
import { okexEvent } from "./okex";

const server = new WebSocket.Server({ port: 5001, path: "/home" });

let clients: WebSocket[] = [];

server.on("connection", (ws: WebSocket) => {
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
        for (let i = 0; i < clients.length; i++) {
            clients[i].send(JSON.stringify(pairs));
        }
    });
}
