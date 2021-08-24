import { useState, useEffect } from "react";

<<<<<<< Updated upstream
const WS_URL = 'ws://localhost:5001'

export default function useWsService(setPrice) {
  const [socket, _] = useState(() => (typeof WebSocket !== 'undefined' ? new WebSocket(WS_URL) : null))
  useEffect(() => {
    if (typeof WebSocket !== 'undefined') {
      socket.addEventListener('open', (e) => {
        console.log('open')
      })
      socket.addEventListener('message', (e) => {
        setPrice(JSON.parse(e.data).BTCUSDT_p)
      })
      socket.addEventListener('close', (e) => {
        console.log('close')
        console.log(e)
      })
      socket.addEventListener('error', (e) => {
        console.log('error')
        console.log(e)
      })
    }
  },[])
  // return wsdata;
=======
const WS_URL = "ws://localhost:5001/home";
const socket = typeof WebSocket !== "undefined" ? new WebSocket(WS_URL) : null;

export default function useWsService(setData) {
    useEffect(() => {
        if (typeof WebSocket !== "undefined") {
            socket.addEventListener("open", (e) => {
                console.log("open");
            });
            socket.addEventListener("message", (e) => {
                setData(JSON.parse(e.data));
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
    }, []);
    // return wsdata;
>>>>>>> Stashed changes
}

// export default useWsService
