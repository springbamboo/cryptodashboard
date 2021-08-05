// メインページ
import React from 'react';
import { useEffect, useState } from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AppBarTest from '../components/AppBarTest'
import CurrencySwitchButton from '../components/CurrencySwitchButton'
import DataTable from '../components/DataTable'
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

// const WS_URL = 'ws://localhost:5001'

export default function Home() {
  // const [socket, _] = useState(() => (typeof WebSocket !== 'undefined' ? new WebSocket(WS_URL) : null))
  // useEffect(() => {
  //   if (typeof WebSocket !== 'undefined') {
  //     // socket.addEventListener('open', (e) => {
  //     //   console.log('open')
  //     // })
  //     socket.addEventListener('message', (e) => {
  //       // console.log(`message: ${new Date().toISOString()}\n${e.data}`)
  //       // console.log(JSON.parse(e.data).BTCUSDT_p)
  //       let cube = JSON.parse(e.data).BTCUSDT_p

  //     })
  //     socket.addEventListener('close', (e) => {
  //       console.log('close')
  //       console.log(e)
  //     })
  //     socket.addEventListener('error', (e) => {
  //       console.log('error')
  //       console.log(e)
  //     })
  //   } 
  // })

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: light)'); // userがダークモードを使用しているかどうかをチェック
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: { 
          type: 'dark', 
          primary: {
            light: '#757ce8',
            main: '#121212', 
            dark: '#002884',
            contrastText: '#fff',
          },
          secondary: {
            light: '#ff7961',
            main: '#ff1111',
            dark: '#ba000d',
            contrastText: '#000',
          },
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme} >
      <div>
        <AppBarTest />
      </div>
      <div>
        <CurrencySwitchButton />
        <DataTable />
      </div>
    </ThemeProvider>
  )

}

