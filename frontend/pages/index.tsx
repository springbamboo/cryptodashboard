import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import AppBarTest from '../components/AppBarTest'
// import AppBar from '@material-ui/core/AppBar';
// import Button from '@material-ui/core/Button';
import { Button } from '@material-ui/core';
import AppleIcon from '@material-ui/icons/Apple';

const DynamicComponentWithNoSSR = dynamic(() => import('./index'), { ssr: false })
const WS_URL = 'ws://localhost:5001'


export default function Home() {
  // init Websocket (only on client side)
  const [socket, _] = useState(() => (typeof WebSocket !== 'undefined' ? new WebSocket(WS_URL) : null))
  useEffect(() => {
    if (typeof WebSocket !== 'undefined') {
      socket.addEventListener('open', (e) => {
        console.log('open')
      })

      socket.addEventListener('message', (e) => {
        console.log(`message: ${new Date().toISOString()}\n${e.data}`)
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
  return (
    <>
      <div>
      {/* <Button variant="contained" color="primary">Hello World</Button> */}
      <AppBarTest />
      </div>
      <div>
        <Header />
        {/* Share */}
        {/* Icon koko dayo https://material-ui.com/components/material-icons/ */}
        <AppleIcon />
        <AppleIcon color="primary" />
        <AppleIcon color="secondary" />
        <AppleIcon style={{ color: '#888' }}  />
        <AppleIcon color="disabled" />
        <AppleIcon />
        <AppleIcon />
        <AppleIcon />
        <AppleIcon />
        <AppleIcon />
        <AppleIcon />
        <AppleIcon />
        <AppleIcon />
        <AppleIcon />
        <AppleIcon />
        <AppleIcon />
        <AppleIcon />
        <AppleIcon />
      </div>
    </>
  )
}
