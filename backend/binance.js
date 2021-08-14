const WebSocket = require("ws");
const ws = new WebSocket("wss://fstream.binance.com/ws");

const server = new WebSocket.Server({ port: 5001, path:"/binance"});

ws.on("open", () => {
    const message = JSON.stringify(
    {
        "method": "SUBSCRIBE",
        "params":
        [
            "btcusdt@ticker",
            "btcusdt@aggTrade",
            "btcusdt@forceOrder"
        ],
        "id": 1
    });
    ws.send(message);
});
let newData = {
    "btcusdt":{
        "price":null,
        "quatity":null,
        "change":null,
        "liquidation":null
    }
};

let clients = [];

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
        console.log(binanceData.e)
        newData["btcusdt"]["liquidation"] = binanceData.o.q;
    }
    for(let i = 0; i < clients.length; i++){
        clients[i].send(JSON.stringify(newData));
    }
});







