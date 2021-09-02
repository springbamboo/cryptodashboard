import axios from "axios";
import express from "express";
const app = express();
app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
// app.get("/binance/:pair", (req, res) => {
//     const painName = req.params.pair;
//     const httpEndPoint: string = "https://fapi.binance.com";
//     const httpKline: string = `/fapi/v1/klines?symbol=${painName}&interval=1m&limit=500`;
//     const promise = axios.get(httpEndPoint + httpKline);
//     promise.then((response: { data: any }) => {
//         const newData = response.data;
//         const cdata = newData.map((d: string[]) => {
//             return [
//                 d[0], // T,OHLC,V
//                 parseFloat(d[1]),
//                 parseFloat(d[2]),
//                 parseFloat(d[3]),
//                 parseFloat(d[4]),
//                 // parseFloat(d[5]),
//             ];
//         });
//         res.end(JSON.stringify(cdata));
//     });
// });
// app.get("/huobi/:pair", (req, res) => {
//     const size = 150;
//     const pairName = req.params.pair;
//     const newPairName =
//         pairName.toUpperCase().slice(0, 3) +
//         "-" +
//         pairName.toUpperCase().slice(3);
//     // console.log(newPairName);
//     const huobiEndPoint = "https://api.hbdm.com";
//     const huobiKline = `/linear-swap-ex/market/history/kline?contract_code=${newPairName}&period=1min&size=${size}`;
//     const promise = axios(huobiEndPoint + huobiKline);
//     promise.then((response: { data: any }) => {
//         const newData = response.data.data;
//         const cdata = newData.map((d: { [key: string]: number }) => {
//             return [
//                 d["id"],
//                 d["open"],
//                 d["high"],
//                 d["low"],
//                 d["close"],
//                 // d["amount"]
//             ];
//         });
//         res.end(JSON.stringify(cdata));
//     });
// });
// app.get("/okex/:pair", (req, res) => {
//     const pairName = req.params.pair;
//     const newPairName =
//         pairName.toUpperCase().slice(0, 3) +
//         "-" +
//         pairName.toUpperCase().slice(3, 7) +
//         "-SWAP";
//     const httpEndPont = "https://aws.okex.com";
//     const okexKline = `/api/swap/v3/instruments/${newPairName}/candles?granularity=60`;
//     const promise = axios(httpEndPont + okexKline);
//     promise.then((response) => {
//         const newData = response.data;
//         const cdata = newData.map((d: { [key: string]: string }) => {
//             const temp = new Date(d[0]);
//             const time = temp.getTime();
//             return [
//                 time,
//                 parseFloat(d[1]),
//                 parseFloat(d[2]),
//                 parseFloat(d[3]),
//                 parseFloat(d[4])
//             ];
//         });
//         res.end(JSON.stringify(cdata));
//     });
// });
// app.get("/bitfinex/:pair", (req, res) => {
//     const pairName: string = req.params.pair;
//     const newPairName =
//         pairName.slice(-1) + pairName.toUpperCase().slice(0, -1);
//     const bitfinexEndPoint: string = "https://api-pub.bitfinex.com/v2/";
//     const bitfinexKline = `candles/trade:1m:${newPairName}/hist`;
//     const promise = axios.get(bitfinexEndPoint + bitfinexKline);
//     promise.then((response) => {
//         const newData = response.data;
//         const cdata = newData.map((d:number[])=>{
//             return [
//                 d[0],
//                 d[1],
//                 d[3],
//                 d[2],
//                 d[4],
//                 // d[5]
//             ]
//         });
//         res.end(JSON.stringify(cdata));
//     });
// });
app.get("/bybit/:pair", (req, res) => {
    const pairName = req.params.pair;
    const newPairName = pairName.toUpperCase()
    console.log(pairName);
    const httpEndPoint: string = "https://api.bybit.com";
    const httpKline: string = `/spot/quote/v1/kline?symbol=${newPairName}&interval=1m&limit=200`;
    const promise = axios.get(httpEndPoint + httpKline);
    promise.then((response) => {
         const newData = response.data.result;
         const cdata = newData.map((d: string[]) => {
             return [
                 d[0],
                 parseFloat(d[1]),
                 parseFloat(d[2]),
                 parseFloat(d[3]),
                 parseFloat(d[4]),
             ];
         });
         res.end(JSON.stringify(newData));
  });
});
app.listen(5000);
