const WebSocket = require("ws");
const request = require('request');
const ws = new WebSocket("wss://stream.bybit.com/realtime_public")

const server = new WebSocket.Server({ port: 5001, path:"/bybit"});

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
}

ws.on("open", ()=>{
    const message = JSON.stringify({
        "op":"subscribe",
        "args":["instrument_info.100ms.BTCUSDT"]
    })
    ws.send(message)
})

server.on('connection', (ws) => {
    clients.push(ws);
    console.log(clients.length);
});

let temp = 0;
let flag = 1;
ws.on("message", (data) => {
    let type = JSON.parse(data).type
    if(type == 'snapshot'){
        newData["btcusdt"]["change"] = parseFloat(JSON.parse(data).data.price_24h_pcnt_e6) / 1000000;
        newData["btcusdt"]["price"] = JSON.parse(data).data.last_price_e4;
    }
    if(type == 'delta'){
        if(JSON.parse(data).data.update[0].price_24h_pcnt_e6 !== undefined){
            newData["btcusdt"]["change"] = parseFloat(JSON.parse(data).data.update[0].price_24h_pcnt_e6) / 1000000;
        }
        let price = JSON.parse(data).data.update[0].index_price;
        if(flag == 1){
            temp = price;
            flag = 0;
        }
        else{
            if(Math.abs(price - temp) >= 1){
                temp = price
                newData["btcusdt"]["price"] = price
            }
        }
    }
    for(let i = 0; i < clients.length; i++){
        clients[i].send(JSON.stringify(newData));
    }
})

