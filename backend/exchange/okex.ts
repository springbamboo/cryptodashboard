import WebSocket from "ws";
import pako from "pako";
import { Coindata } from "./cointype";
import { generateCoindata } from "./generatecoindata";

const ws: WebSocket = new WebSocket("wss://awspush.okex.com:8443/ws/v3");
const exchange: string = "okex";

const pairs: {[key: string]: Coindata} = {
    BTCUSDT:generateCoindata("BTCUSDT", exchange),
    ETHUSDT:generateCoindata("ETHUSDT", exchange),
    XRPUSDT:generateCoindata("XRPUSDT", exchange)
};

ws.on("open", () => {
    const message:string = JSON.stringify({
        "op": "subscribe",  
        "args":[
            "spot/ticker:BTC-USDT",
            "spot/ticker:ETH-USDT",
            "spot/ticker:XRP-USDT"
        ], 
    });
    ws.send(message);
});

ws.on("message", (data:Buffer) => {
    const payload = pako.inflateRaw(data, {to: 'string'});
    const jsonData = JSON.parse(payload);
    if(jsonData.data){

        console.log(JSON.parse(payload).data[0].instrument_id);
    }
});


