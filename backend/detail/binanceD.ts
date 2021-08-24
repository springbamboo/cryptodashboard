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
    kline:{

    }
    orderbook:{
        bid:{

        };
        ask:{

        }
    }
}


const ws:WebSocket = new WebSocket(" wss://fstream.binance.com/ws")

ws.on("open",() => {
    const message = JSON.stringify({
        method: "SUBSCRIBE",
        params: [
            "btcusdt@aggTrade"
        ],
        id: 1,
    });
    ws.send(message);
});

ws.on("message", (data:string) => {
    console.log(JSON.parse(data).p,JSON.parse(data).q);
});