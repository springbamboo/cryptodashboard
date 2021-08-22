import { eventEmitter } from "./binance";
import { Coindata } from "./cointype";
import WebSocket from "ws";

const server = new WebSocket.Server({ port: 5001, path: "/home" });

let clients: WebSocket[] = [];

server.on("connection", (ws: WebSocket) => {
    clients.push(ws);
    console.log(clients.length);
});

eventEmitter.on("change", (pairs: { [key: string]: Coindata }) => {
    for (let i = 0; i < clients.length; i++) {
        clients[i].send(JSON.stringify(pairs));
    }
});
