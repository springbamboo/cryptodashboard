import {useState, useEffect} from 'react';

const WS_URL = 'ws://localhost:5001'

const useWsService = () => {
  const [socket, _] = useState(() => (typeof WebSocket !== 'undefined' ? new WebSocket(WS_URL) : null))
  useEffect(() => {
    if (typeof WebSocket !== 'undefined') {
      socket.addEventListener('open', (e) => {
        console.log('open')
      })
      socket.addEventListener('message', (e) => {
        // console.log(`message: ${new Date().toISOString()}\n${e.data}`)
        // console.log(e.data);
        return e.data;
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
  } )
}

export default useWsService