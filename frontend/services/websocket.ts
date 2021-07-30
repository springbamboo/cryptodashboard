import {useState, useEffect, useRef} from 'react';

const WS_URL = 'ws://localhost:5001'

const useWsService = () => {
  // init Websocket (only on client side)
  const [socket, _] = useState(() => (typeof WebSocket !== 'undefined' ? new WebSocket(WS_URL) : null))
  const [data, setData] = useState();
  useEffect(() => {
    if (typeof WebSocket !== 'undefined') {
      socket.addEventListener('open', (e) => {
        console.log('open')
      })

      socket.addEventListener('message', (e) => {
        console.log(`message: ${new Date().toISOString()}\n${e.data}`)
        setData(e.data)
      })

      socket.addEventListener('close', (e) => {
        console.log('close')
        console.log(e)
      })

      socket.addEventListener('error', (e) => {
        console.log('error')
        console.log(e)
      })
      return () => {
        socket.close()
      }
    }
  })
  return data;
}