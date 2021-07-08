// ✔値段 -ws   
// ✔取引高(過去24時間) -ws
// ロングとショートの割合 -https
// オーダーブック(depth chart) -ws
// Large トレード記録(トレード履歴から絞る) -ws
// ファンディングFunding -https/ws

const WebSocket = require("ws");
const ws = new WebSocket("wss://fstream.binance.com/ws");

const server = new WebSocket.Server({ port: 5001});

ws.on("open", () => {
    const message = JSON.stringify(
    {
        "method": "SUBSCRIBE",
        "params":
        [
            "btcusdt@ticker",
            "btcusdt@aggTrade"
        ],
        "id": 1
    });
    ws.send(message);
});
let newData = {
    "BTCUSDT_p":null, 
    "BTCUSDT_q":null
};

let clients = [];

server.on('connection', (ws) => {
    clients.push(ws);
    console.log(clients.length);
});

ws.on("message", (data) => {
    const binanceData = JSON.parse(data);
    if(binanceData.e == "aggTrade"){
        newData["BTCUSDT_p"] = binanceData.p;
    }
    if(binanceData.e == "24hrTicker"){
        newData["BTCUSDT_q"] = binanceData.q;
    }
    for(let i = 0; i < clients.length; i++){
        clients[i].send(JSON.stringify(newData));
    }
});






