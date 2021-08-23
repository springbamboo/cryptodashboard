import {useState, useEffect} from 'react';

const WS_URL = 'ws://localhost:5001/home'

export default function useWsService(setPrice) {
  const [socket, _] = useState(() => (typeof WebSocket !== 'undefined' ? new WebSocket(WS_URL) : null))
  // const [wsdata, setWsData] = useState(0);
  useEffect(() => {
    if (typeof WebSocket !== 'undefined') {
      socket.addEventListener('open', (e) => {
        console.log('open')
      })
      socket.addEventListener('message', (e) => {
        console.log(JSON.parse(e.data).BTCUSDT_p)
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
  })
  // return wsdata;
}

// export default useWsService