import WebSocket from "ws";
import pako from "pako";
import { Coindata } from "./cointype";
import { generateCoindata } from "./generatecoindata";
import request from "request";
import EventEmitter from "events";
import log from "../lib/log";
export const huobiEvent = new EventEmitter();

const ws: WebSocket = new WebSocket("wss://api.huobi.pro/ws");
const exchange: string = "huobi";

const http_endPoint = "https://api.hbdm.com/linear-swap-api/v1";
const coinNameHttp = ["BTC-USDT", "ETH-USDT", "XRP-USDT"];

const pairs: { [key: string]: Coindata } = {
    BTCUSDT: generateCoindata("BTCUSDT", exchange),
    ETHUSDT: generateCoindata("ETHUSDT", exchange),
    XRPUSDT: generateCoindata("XRPUSDT", exchange),
};

setInterval(() => {
    for (let i = 0; i < coinNameHttp.length; i++) {
        let pair: string = coinNameHttp[i];
        const http_ratio = `/swap_elite_account_ratio?contract_code=${pair}&period=1day`;
        request(http_endPoint + http_ratio, function (err, response, payload) {
            if (err) return console.log(err);
            try {
                const ratioData = JSON.parse(payload);
                if (ratioData.data.list[1]) {
                    pairs[pair.replace("-", "")].ratio.short =
                        ratioData.data.list[1].sell_ratio;
                    pairs[pair.replace("-", "")].ratio.long =
                        ratioData.data.list[1].buy_ratio;
                }
            } catch (err) {
                return console.log(err);
            }
        });
    }
}, 1000);

ws.on("open", () => {
    log("info", "\x1b[36mWebSocket\x1b[0m - Connected to Huobi");
    const messageBTC: string = JSON.stringify({
        sub: "market.btcusdt.detail",
        id: "id1",
    });
    const messageETH: string = JSON.stringify({
        sub: "market.ethusdt.detail",
        id: "id1",
    });
    const messageXRP: string = JSON.stringify({
        sub: "market.xrpusdt.detail",
        id: "id1",
    });
    ws.send(messageBTC);
    ws.send(messageETH);
    ws.send(messageXRP);
});

ws.on("message", (data: Buffer) => {
    const payload = pako.inflate(data, { to: "string" });
    const jsonData = JSON.parse(payload);
    if (jsonData.tick) {
        for (let i in pairs) {
            if (!jsonData.tick) continue;
            const coinName = jsonData.ch.match(/\..*\./)[0].slice(1, -1);
            if (i.toLowerCase() === coinName) {
                pairs[i].price = parseFloat(jsonData.tick.close);
                pairs[i].quatity = parseFloat(jsonData.tick.vol);
                pairs[i].change =
                    parseFloat(jsonData.tick.close) /
                        parseFloat(jsonData.tick.open) -
                    1;
            }
        }
    }
    huobiEvent.emit("change", pairs);
});

for (let i = 0; i < coinNameHttp.length; i++) {
    let pair: string = coinNameHttp[i];
    const http_funding = `/swap_funding_rate?contract_code=${pair}`;
    request(http_endPoint + http_funding, function (err, response, payload) {
        const fundingData = JSON.parse(payload);
        //console.log(JSON.parse(payload));
        if (fundingData.data) {
            pairs[pair.replace("-", "")].funding =
                fundingData.data.funding_rate;
        }
        //console.log(pairs);
    });
}
