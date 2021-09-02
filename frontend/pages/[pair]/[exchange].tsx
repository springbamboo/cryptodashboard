// 詳細ページ
import React from "react";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { useTheme } from "@material-ui/core/styles";
import OrderBook from "../../components/OrderBook";
import OrderBook2 from "../../components/OrderBook2";
import styles from "../binance.module.css";
import CandleStick from "../../components/CandleStick";
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";

// 参考サイト：https://maku.blog/p/rdq3ep2/
const BookPage = ({}) => {
    const theme = useTheme();
    const [orderbook, setOrderBook] = useState([[], [], [], []]);
    const [kline, setKline] = useState([[], [], [], [], []]);
    const { exchange, pair } = useRouter().query;
    useEffect(() => {
        if (!exchange || !pair) return;
        const timer = setInterval(() => {
            axios(`/api/orderbook/${exchange}/${pair}`)
                .then((res) => setOrderBook(res.data))
                .catch((err) => console.log(err));
            axios(`/api/candlestick/${exchange}/${pair}`)
                .then((res) => setKline(res.data))
                .catch((err) => console.log(err));
        }, 2000);
        return () => clearInterval(timer);
    }, [exchange, pair]);
    return (
        <>
            <Head>
                <title>
                    Details: {pair} ({exchange})
                </title>
            </Head>
            <div>
                <div>
                    <Header />
                </div>
                <div>
                    <div className={styles.content}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Paper style={{ padding: theme.spacing(2) }}>
                                    <CandleStick data={kline} />
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper style={{ padding: theme.spacing(2) }}>
                                    <OrderBook data={orderbook} />
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper style={{ padding: theme.spacing(2) }}>
                                    <OrderBook2 data={orderbook} />
                                </Paper>
                            </Grid>
                            {/* <Grid item xs={6}>
                            <Paper style={{ padding: theme.spacing(2) }}>
                                <LargeTrades />
                            </Paper>
                        </Grid> */}
                        </Grid>
                    </div>
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </>
    );
};
export default BookPage;
