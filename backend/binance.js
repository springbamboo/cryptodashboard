const WebSocket = require("ws");
const ws = new WebSocket("wss://fstream.binance.com/ws");
const request = require('request');

const http_endPoint = "https://fapi.binance.com";
const http_path = "/fapi/v1/premiumIndex?symbol=BTCUSDT";
const http_ratio = "/futures/data/topLongShortPositionRatio?symbol=BTCUSDT&period=5m&limit=1"
const http_depth = "/fapi/v1/depth?symbol=BTCUSDT&limit=1000"

const server = new WebSocket.Server({ port: 5001, path:"/binance"});

let clients = [];

let newData = {
    "btcusdt":{
        "price":null,
        "quatity":null,
        "change":null,
        "liquidation":null,
        "funding":null,
        "ratio":{
            "long":null,
            "short":null
        }
    }
};
setInterval(() => {
    request(http_endPoint + http_path, function (err, response, payload) {
        newData["btcusdt"]["funding"] = JSON.parse(payload).interestRate
    }); 
},10000);

setInterval(() => {
    request(http_endPoint + http_ratio, function(err, response, payload) {
        newData["btcusdt"]["ratio"]["long"] = JSON.parse(payload)[0].longAccount
        newData["btcusdt"]["ratio"]["short"] = JSON.parse(payload)[0].shortAccount
    });
}, 10000)

setInterval(() => {
    request(http_endPoint + http_depth, function(err, response, payload) {
        console.log(JSON.parse(payload).asks[0][1])
        console.log(JSON.parse(payload).bids[0][1])
    });
}, 1000)

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

server.on('connection', (ws) => {
    clients.push(ws);
    console.log(clients.length);
});

ws.on("message", (data) => {
    const binanceData = JSON.parse(data);
    if(binanceData.e == "aggTrade"){
        newData["btcusdt"]["price"] = binanceData.p;

    }
    if(binanceData.e == "24hrTicker"){
        newData["btcusdt"]["quatity"] = binanceData.q;
        newData["btcusdt"]["change"] = binanceData.P;
    }
    if(binanceData.e == "forceOrder"){
        newData["btcusdt"]["liquidation"] = binanceData.o.q;
    }
    for(let i = 0; i < clients.length; i++){
        clients[i].send(JSON.stringify(newData));
    }
});







