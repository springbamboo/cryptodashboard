export {}
import WebSocket from "ws";
import request from 'request';
import { Coindata } from "./cointype";

const ws = new WebSocket("wss://fstream.binance.com/ws");
const http_endPoint = "https://fapi.binance.com";
const http_path = "/fapi/v1/premiumIndex?symbol=BTCUSDT";
const http_ratio = "/futures/data/topLongShortPositionRatio?symbol=BTCUSDT&period=5m&limit=1";


const server = new WebSocket.Server({ port: 5001, path:"/binance"});

let clients: WebSocket[] = [];

let btcusdt:Coindata = {
    "exchange":"binance",
    "pairName":"btcusdt",
    "price":0,
    "quatity":0,
    "change":0,
    "funding":0,
    "ratio":{
        "long":0,
        "short":0
    }
};
setInterval(() => {
    request(http_endPoint + http_path, function (err, response, payload) {
        btcusdt["funding"] = JSON.parse(payload).interestRate
    }); 
},10000);

setInterval(() => {
    request(http_endPoint + http_ratio, function(err, response, payload) {
        btcusdt["ratio"]["long"] = JSON.parse(payload)[0].longAccount
        btcusdt["ratio"]["short"] = JSON.parse(payload)[0].shortAccount
    });
}, 10000)

ws.on("open", () => {
    const message = JSON.stringify(
    {
        "method": "SUBSCRIBE",
        "params":
        [
            "btcusdt@ticker",
            "btcusdt@aggTrade",
            "btcusdt@forceOrder",
        ],
        "id": 1
    });
    ws.send(message);
});

server.on('connection', (ws:WebSocket) => {
    clients.push(ws);
    console.log(clients.length);
});

ws.on("message", (data: string) => {
    const binanceData = JSON.parse(data);
    if(binanceData.e == "aggTrade"){
        btcusdt["price"] = binanceData.p;

    }
    if(binanceData.e == "24hrTicker"){
        btcusdt["quatity"] = binanceData.q;
        btcusdt["change"] = binanceData.P;
    }
    for(let i = 0; i < clients.length; i++){
        clients[i].send(JSON.stringify(btcusdt));
    }
});







