export {}
import WebSocket from "ws";
import request from 'request';

const ws = new WebSocket("wss://stream.bybit.com/realtime_public")

const server = new WebSocket.Server({ port: 5001, path:"/bybit"});

let clients: WebSocket[] = [];

interface Coindata {
    "exchange":string
    "pairName":string
    "price":number
    "quatity":number
    "change":number
    "funding":number
    "ratio":{
        "long":number
        "short":number
    }
}

let btcusdt:Coindata = {
    "exchange":"bybit",
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

ws.on("open", ()=>{
    const message = JSON.stringify({
        "op":"subscribe",
        "args":["instrument_info.100ms.BTCUSDT"]
    })
    ws.send(message)
})

server.on('connection', (ws:WebSocket) => {
    clients.push(ws);
    console.log(clients.length);
});

let temp = 0;
let flag = 1;
ws.on("message", (data:string) => {
    let type = JSON.parse(data).type
    if(type == 'snapshot'){
        btcusdt["change"] = parseFloat(JSON.parse(data).data.price_24h_pcnt_e6) / 1000000;
        btcusdt["price"] = JSON.parse(data).data.last_price_e4;
    }
    if(type == 'delta'){
        if(JSON.parse(data).data.update[0].price_24h_pcnt_e6 !== undefined){
            btcusdt["change"] = parseFloat(JSON.parse(data).data.update[0].price_24h_pcnt_e6) / 1000000;
        }
        let price = JSON.parse(data).data.update[0].index_price;
        if(flag == 1){
            temp = price;
            flag = 0;
        }
        else{
            if(Math.abs(price - temp) >= 1){
                temp = price;
                btcusdt["price"] = price;
            }
        }
    }
    for(let i = 0; i < clients.length; i++){
        clients[i].send(JSON.stringify(btcusdt));
    }
})

