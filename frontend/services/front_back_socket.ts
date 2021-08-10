import {useState, useEffect} from 'react';

const WS_URL = 'ws://localhost:5001'

export default function useWsService() {
  const [socket, _] = useState(() => (typeof WebSocket !== 'undefined' ? new WebSocket(WS_URL) : null))
  const [wsdata, setWsData] = useState(0);
  useEffect(() => {
    if (typeof WebSocket !== 'undefined') {
      socket.addEventListener('open', (e) => {
        console.log('open')
      })
      socket.addEventListener('message', (e) => {
        // console.log(`message: ${new Date().toISOString()}\n${e.data}`)
        // console.log(e.data);
        setWsData( e.data );
        // return e.data;
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
  return wsdata;
}

// export default useWsService