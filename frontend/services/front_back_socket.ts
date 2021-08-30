import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { CoindataObj } from "../../share/model";

const WS_URL_BASE = "ws://localhost:5001";

function connectWS<T>(path: string, setValue: Dispatch<SetStateAction<T>>) {
    if (typeof WebSocket === "undefined") return null;
    const url = `${WS_URL_BASE}/${path}`;
    const socket = new WebSocket(url);
    socket.addEventListener("open", (e) => {
        console.log("open");
    });
    socket.addEventListener("message", (e) => {
        setValue(JSON.parse(e.data) as T);
    });
    socket.addEventListener("close", (e) => {
        console.log("close");
        console.log(e);
    });
    socket.addEventListener("error", (e) => {
        console.log("error");
        console.log(e);
    });
}

export const connectHomeWS = (
    setvalue: Dispatch<SetStateAction<CoindataObj>>
) => connectWS<CoindataObj>("home", setvalue);
// export default useWsService
