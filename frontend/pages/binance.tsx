// メインページああああ
import React from 'react';
import { useEffect, useState } from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Header from '../components/Header'
import CurrencySwitchButton from '../components/CurrencySwitchButton'
import DataTable from '../components/DataTable'
import Footer from '../components/Footer'
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import OrderBook from '../components/OrderBook'

export default function Home() {

    const useStyles = makeStyles({
        background: {
            backgroundColor: '#555555',
        }
    });
    const classes = useStyles();

    // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: light)'); // userがダークモードを使用しているかどうかをチェック
    // const theme = React.useMemo(
    //   () =>
    const theme = createTheme({
        palette: { // メインページの配色設定
            // type: prefersDarkMode ? 'dark' : 'light', // userがダークモードを使用しているかどうかでモードを切り替える
            type: 'dark', // userがダークモードを使用しているかどうかでモードを切り替える
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
        }
    });
    // [prefersDarkMode],
    // );

    return (
        <div className={classes.background}>
            <ThemeProvider theme={theme}>
                <div>
                    {/* <Header /> */}
                </div>
                <div>
                    <OrderBook />
                </div>
                <div>
                    {/* <Footer /> */}
                </div>
            </ThemeProvider>
        </div>
    )
}
