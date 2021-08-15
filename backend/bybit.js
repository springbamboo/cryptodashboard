const WebSocket = require("ws");
const request = require('request');


const ws = new WebSocket("wss://stream.bybit.com/realtime_public")


ws.on("open", ()=>{
    const message = JSON.stringify({
        "op":"subscribe",
        "args":["trade.BTCUSDT"]
    })
    ws.send(message)
})

ws.on("")

