import { Coindata } from "./cointype";
import WebSocket from "ws";
import { binanceEvent } from "./binance";
import { bybitEvent } from "./bybit";

const server = new WebSocket.Server({ port: 5001, path: "/home" });

let clients: WebSocket[] = [];

server.on("connection", (ws: WebSocket) => {
    clients.push(ws);
    console.log(clients.length);
});

bybitEvent.on("change", (pairs: { [key: string]: Coindata }) => {
    for (let i = 0; i < clients.length; i++) {
        clients[i].send(JSON.stringify(pairs));
    }
});

binanceEvent.on("change", (pairs: { [key: string]: Coindata }) => {
    for (let i = 0; i < clients.length; i++) {
        clients[i].send(JSON.stringify(pairs));
    }
});
