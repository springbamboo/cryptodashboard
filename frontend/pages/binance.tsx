// メインページああああ
import React from 'react';
import { useEffect, useState } from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Header from '../components/Header'
import Footer from '../components/Footer'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import OrderBook from '../components/OrderBook'
import LargeTrades from '../components/LargeTrades'
import styles from './binance.module.css';

export default function Home() {

    const useStyles = makeStyles((theme) => ({
        paper: {
            padding: theme.spacing(2),
        },
    }));
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
        <div className={styles.background}>
            <ThemeProvider theme={theme}>
                <div>
                    <Header />
                </div>
                <div>
                    <div className={styles.content}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <Paper className={classes.paper}>
                                    <OrderBook />
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper className={classes.paper}>
                                    <LargeTrades />
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper className={classes.paper}>
                                    <LargeTrades />
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper className={classes.paper}>
                                    <LargeTrades />
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <div>
                    <Footer />
                </div>
            </ThemeProvider>
        </div>
    )
}
