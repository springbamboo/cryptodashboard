import { CoindataObj } from "../../../share/model";
import WebSocket from "ws";
import { binanceEvent } from "./binance";
import { bybitEvent } from "./bybit";
import { bitfinexEvent } from "./bitfinex";
import { huobiEvent } from "./huobi";
import { okexEvent } from "./okex";
import http from "http";
import log from "../lib/log";

const WebSocketServer = (httpServer: http.Server) => {
    log("info", "Starting WebSocket server...");
    // const PORT = parseInt(process.env.PORT) || 8080;
    // const server = new WebSocket.Server({ port: PORT, path: "/home" });
    const server = new WebSocket.Server({ server: httpServer });
    log("success", "Successfully started WebSocket server");
    // console.log(`Websocket server listening on port ${PORT}`);

    let clients = new Set<WebSocket>();

    // クライアント初期接続時に送るために一時保管
    const tempPairs: { [coin: string]: CoindataObj | null } = {
        binance: null,
        bybit: null,
        bitfinex: null,
        huobi: null,
        okex: null,
    };

    const logConnections = () => {
        log("info", `\x1b[36mWebSocket\x1b[0m - Connections: ${clients.size}`);
    };

    server.on("connection", (ws: WebSocket) => {
        // 初期値を送信
        for (const key in tempPairs) {
            if (!tempPairs.hasOwnProperty(key)) break;
            if (tempPairs[key] === null) break;
            ws.send(JSON.stringify(tempPairs[key]));
        }
        // 接続を配列に追加
        clients.add(ws);
        logConnections();
        ws.on("close", () => {
            logConnections();
        });
    });

    const eventEmitterList = [
        binanceEvent,
        bybitEvent,
        bitfinexEvent,
        huobiEvent,
        okexEvent,
    ];

    for (const eventEmitter of eventEmitterList) {
        eventEmitter.on("change", (pairs: CoindataObj) => {
            // 一時保管データの更新
            const exchangeName: string = pairs["BTCUSDT"].exchange;
            tempPairs[exchangeName] = pairs;
            // クライアントへ送信
            for (const client of clients) {
                client.send(JSON.stringify(pairs));
            }
        });
    }
};

export default WebSocketServer;
