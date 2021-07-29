// メインページ
import React from 'react';
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Header from '../components/Header'
import AppBarTest from '../components/AppBarTest'
import CurrencySwitchButton from '../components/CurrencySwitchButton'
import DataTable from '../components/DataTable'
// import AppBar from '@material-ui/core/AppBar';
// import Button from '@material-ui/core/Button';
import { Button } from '@material-ui/core';
import AppleIcon from '@material-ui/icons/Apple';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

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

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)'); // userがダークモードを使用しているかどうかをチェック
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: { // メインページの配色設定
          type: prefersDarkMode ? 'dark' : 'light', // userがダークモードを使用しているかどうかでモードを切り替える
          primary: {
            light: '#757ce8',
            main: '#121212', // テーマmainカラー
            dark: '#002884',
            contrastText: '#fff',
          },
          secondary: {
            light: '#ff7961',
            main: '#ff1111',
            dark: '#ba000d',
            contrastText: '#000',
          },
          // background: {
          //   paper: "#000000"
          // }
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme} >
      <div>
        {/* <Button variant="contained" color="primary">Hello World</Button> */}
        <AppBarTest />
      </div>
      <div>
        {/* <Header /> */}
        {/* Share */}
        {/* Icon koko dayo https://material-ui.com/components/material-icons/ */}
        <CurrencySwitchButton />
        <DataTable />
        <AppleIcon />
        {/* <AppleIcon color="primary" /> */}
        <AppleIcon color="secondary" />
        <AppleIcon style={{ color: '#888' }}  />
        <AppleIcon color="disabled" />
        <AppleIcon />
      </div>
    </ThemeProvider>
  )
}
