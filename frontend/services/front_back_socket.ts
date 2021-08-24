import {useState, useEffect} from 'react';

const WS_URL = 'ws://localhost:5001/home'
const socket = typeof WebSocket !== 'undefined' ? new WebSocket(WS_URL) : null

export default function useWsService(setData) {
  useEffect(() => {
    if (typeof WebSocket !== 'undefined') {
      socket.addEventListener('open', (e) => {
        console.log('open')
      })
      socket.addEventListener('message', (e) => {
        setData(JSON.parse(e.data))
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
  }, [])
  // return wsdata;
}

// export default useWsService