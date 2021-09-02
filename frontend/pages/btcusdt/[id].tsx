// 詳細ページ
import React from "react";
import { useEffect, useState } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import OrderBook from "../../components/OrderBook";
import OrderBook2 from "../../components/OrderBook2";
import LargeTrades from "../../components/LargeTrades";
import styles from "../binance.module.css";
import CandleStick from "../../components/CandleStick";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import axios from "axios";

// 参考サイト：https://maku.blog/p/rdq3ep2/

type PathParams = {
    id: string;
};
type PageProps = {
    title: string;
    apiData: number[][];
};

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
    return {
        paths: [
            { params: { id: "binance" } },
            { params: { id: "bybit" } },
            { params: { id: "okex" } },
            { params: { id: "huobi" } },
            { params: { id: "bitfinex" } },
        ],
        fallback: false,
    };
};
export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
    const { id } = context.params as PathParams;
    const props: PageProps = {
        title: `${id}`,
        apiData: [[], [], [], []],
    };
    return { props };
};

const BookPage: React.FC<PageProps> = ({ title, apiData }: PageProps) => {
    const theme = useTheme();
    const [orderbook, setOrderBook] = useState([[], [], [], []]);
    const [kline, setKline] = useState([[], [], [], [], []]);
    useEffect(() => {
        setInterval(() => {
            const promise = axios(`http://localhost:5400/${title}/btcusdt`);
            promise
                .then((res) => {
                    setOrderBook(res.data);
                })
                .catch((err) => console.log(err));
        }, 2000);
    }, []);
    useEffect(() => {
        // setInterval(() => {
            const promise = axios(`http://localhost:5000/${title}/btcusdt`);
            promise.then((res)=>{
                setKline(res.data);
            })
            .catch((err) => console.log(err));
        // })
    })
    return (
        <>
            <Head>
                <title>{title}の詳細ページ</title>
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
                                    <CandleStick data={kline}/>
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
