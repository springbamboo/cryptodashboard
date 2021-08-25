// LargeTrade
// kline
// OrderBook
import WebSocket from "ws";
interface detailData {
    exchange:string,
    pair:string,
    largeTrade:{
        side:string,
        price:number,
        quantity:number
    }
    kline:{}
    orderbook:{
        bid:{};
        ask:{}
    }
}


const ws:WebSocket = new WebSocket(" wss://fstream.binance.com/ws")

ws.on("open",() => {
    const message = JSON.stringify({
        method: "SUBSCRIBE",
        params: [
            "btcusdt@aggTrade",
            "btcusdt@kline_1m"
        ],
        id: 1,
    });
    ws.send(message);
});

ws.on("message", (payload:string) => {
    const jsonData = JSON.parse(payload); 
    if(jsonData.e === 'kline'){
        console.log(jsonData);
    }
});