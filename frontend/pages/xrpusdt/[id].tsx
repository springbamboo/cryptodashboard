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
import LargeTrades from "../../components/LargeTrades";
import styles from "../binance.module.css";
import CandleStick from "../../components/CandleStick";
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'

// 参考サイト：https://maku.blog/p/rdq3ep2/

type PathParams = {
  id: string;
}

type PageProps = {
  title: string;
  apiData: string;
}

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  return {
    paths: [ // pathsに追加することで localhost:30000/posts/id のページにアクセス可能
      { params: { id: 'binance' } }, // パスは BTCUSDT.[exchange名] や ETHUSDT.[exchange名] などの形式
      { params: { id: 'bybit' } },
      { params: { id: 'okex' } },
      { params: { id: 'huobi' } },
      { params: { id: 'bitfinex' } },
    ],
    fallback: false  // 上記以外のパスでアクセスした場合は 404 ページにする
  }
}


export const getStaticProps: GetStaticProps<PageProps> = async context => {
  // ファイル名が [id].tsx なので id パラメーターを取り出すことができる
  const { id } = context.params as PathParams

  // 本来はここで getBook(id) のように API を呼び出してデータを取得する
  const props: PageProps = {
    title: `${id}`,
    apiData: '40' // apiでとってきたデータをここに代入
  }

  return { props }
}


// ページコンポーネントの実装
const BookPage: React.FC<PageProps> = ({ title, apiData }: PageProps) => {
  const theme = useTheme();

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
                                <CandleStick />
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper style={{ padding: theme.spacing(2) }}>
                                <OrderBook data={apiData} />
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper style={{ padding: theme.spacing(2) }}>
                                <LargeTrades />
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper style={{ padding: theme.spacing(2) }}>
                                <LargeTrades />
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
      </>
  );

}
export default BookPage