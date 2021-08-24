import WebSocket from "ws";
import pako from "pako";

const ws: WebSocket = new WebSocket("wss://awspush.okex.com:8443/ws/v3");

ws.on("open", () => {
    const message:string = JSON.stringify({
        "op": "subscribe",  
        "args":[
            "spot/ticker:BTC-USDT"
        ], 
    });
    ws.send(message);
});

ws.on("message", (data:Buffer) => {
    const payload = pako.inflateRaw(data, {to: 'string'});
    console.log(JSON.parse(payload));
})


