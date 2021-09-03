import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { connectHomeWS, disconnectHomeWS } from "../services/front_back_socket";
import { useState, useEffect, useRef } from "react";
import styles from "./DataTable.module.css";
import millify from "millify";
import { Coindata, CoindataObj } from "../../share/model";
import { ValueScale } from "@devexpress/dx-react-chart";
import Link from "next/link";

import Image from "next/image";
import Auth from "../services/auth";

//サーバーから渡されるデータ
interface CoindataId extends Coindata {
    _id: string;
}
// 表示用データ
interface RowData {
    Rank: string;
    Exchange: string;
    Pair: string;
    Price: string;
    Long: string;
    Short: string;
    Funding: string;
    HVolume: string;
    HChanged: string;
}
type RowDataObj = { [id: string]: RowData };

// セル書式
type CellStyle = "default" | "negative" | "positive";

interface CellStyles {
    price: CellStyle;
    long: CellStyle;
    short: CellStyle;
    funding: CellStyle;
    hVolume: CellStyle;
    hChanged: CellStyle;
}
type CellStylesObj = { [id: string]: CellStyles };

const pairDigits = {
    BTCUSDT: 2,
    ETHUSDT: 2,
    XRPUSDT: 4,
};

// サーバーから渡されたデータを、表示用データに整形
const getRowData = (rank: number, coinData: CoindataId): RowData => ({
    Rank: rank.toString(),
    Exchange: coinData.exchange,
    Pair: coinData.pairName,
    Price:
        coinData.price !== null
            ? coinData.price.toFixed(pairDigits[coinData.pairName])
            : "",
    Long:
        coinData.ratio.long !== null
            ? (coinData.ratio.long * 100).toFixed(2) + "%"
            : "",
    Short:
        coinData.ratio.short !== null
            ? (coinData.ratio.short * 100).toFixed(2) + "%"
            : "",
    Funding:
        coinData.funding !== null
            ? (coinData.funding * 100).toFixed(4) + "%"
            : "",
    HVolume:
        coinData.quatity !== null
            ? millify(coinData.quatity, { precision: 2 })
            : "",
    HChanged:
        coinData.change !== null
            ? (coinData.change * 100).toFixed(2) + "%"
            : "",
});

// 増減をもとにセル書式を取得
const getCellStyles = (now: Coindata, prev: Coindata, style: CellStyles) => {
    if (!prev) return createDefaultCellStyle();
    const result: CellStyles = { ...style };
    if (now.price !== prev.price && prev.price != null) {
        result.price = now.price > prev.price ? "positive" : "negative";
    }
    result.long = now.ratio.long > prev.ratio.short ? "positive" : "default";
    result.short = now.ratio.long < prev.ratio.short ? "negative" : "default";
    result.hChanged = now.change > 0 ? "positive" : "negative";
    return result;
};

// セル書式の初期値
const createDefaultCellStyle = (): CellStyles => {
    return {
        price: "default",
        long: "default",
        short: "default",
        funding: "default",
        hChanged: "default",
        hVolume: "default",
    };
};

export default function BasicTable() {
    // 直近1回のサーバーからのデータ
    const [wsData, setWsData] = useState<CoindataObj>({});
    // サーバーからのデータを結合したもの
    const [coinDataList, setCoinDataList] = useState<CoindataId[]>([]);
    // 前回のCoinDataListの値
    const prevDataRef = useRef<CoindataId[]>(coinDataList);
    // CoinDataListを表示文字列に加工したもの
    const [rowsData, setRowsData] = useState<RowDataObj>({});
    // セル書式
    const [cellStyles, setCellStyles] = useState<CellStylesObj>({});

    // CoinDataListの結合/更新
    // 既に同じ取引所と通貨ペアのデータがあれば更新し、なければ追加する
    const updateCoinDataList = () => {
        // deep copy
        const newCoinDataList = JSON.parse(JSON.stringify(coinDataList));
        for (const key in wsData) {
            if (!wsData.hasOwnProperty(key)) continue;
            // 受信したデータ
            const wsItem = wsData[key];
            // 取引所と通貨ペアごとに固有の値
            const itemId = `${wsItem.exchange}--${wsItem.pairName}`;
            // 受信したデータにidをつける
            const newItem = { ...wsItem, _id: itemId };
            // 受信したデータと同じ取引所と通貨ペアを検索
            const index = coinDataList.findIndex((item) => item._id == itemId);
            if (index !== -1) {
                // 既に取引所と通貨ペアのデータが存在する場合は更新
                newCoinDataList[index] = newItem;
            } else {
                // 取引所と通貨ペアが存在しない場合は追加
                newCoinDataList.push(newItem);
            }
        }
        setCoinDataList(newCoinDataList);
        return newCoinDataList;
    };

    // 表示文字列と表示スタイルの更新
    const updateDisplayData = (coinDataList: CoindataId[]) => {
        // deep copy
        const newRowsData = Object.fromEntries<RowData>(
            Object.entries(rowsData).map(([key, val]) => [key, { ...val }])
        );
        const newCellStyles = Object.fromEntries<CellStyles>(
            Object.entries(cellStyles).map(([key, val]) => [key, { ...val }])
        );
        // 表示文字列と、スタイルの更新
        for (const coinData of coinDataList) {
            const id = coinData._id;
            newCellStyles[id] = getCellStyles(
                coinData,
                prevDataRef.current.find((item) => item._id === id),
                cellStyles[id]
            );
            newRowsData[id] = getRowData(1, coinData);
        }
        prevDataRef.current = coinDataList;
        setRowsData(newRowsData);
        setCellStyles(newCellStyles);
    };

    // WebSocketと接続
    // 受け取ったデータはwsDataへ保管
    useEffect(() => {
        const socket = connectHomeWS();
        const listener = (e) => {
            setWsData(JSON.parse(e.data) as CoindataObj);
        };
        socket.addEventListener("message", listener);
      return () => {
        socket.removeEventListener("message", listener);
        disconnectHomeWS();
      }
    }, []);

    // wsDataが更新されたら(WS経由でデータが来たら)
    // CoinDataListで過去のデータと結合/更新
    // 表示用文字列と表示スタイルを更新
    useEffect(() => {
        const newCoinDataList = updateCoinDataList();
        updateDisplayData(newCoinDataList);
    }, [wsData]);

    const getTableBody = (symbol: string) => {
        return Object.entries(rowsData)
            .filter(([key, val]) => val.Pair === symbol)
            .map(([key, val], i) => (
                <TableRow
                    key={key}
                    className={Auth.isLogin || i == 0 ? "" : styles.blur}
                >
                    <TableCell component="th" scope="row">
                        {val.Rank}
                    </TableCell>
                    <TableCell align="left">
                        <div className={styles.logoParent}>
                            <Image
                                src={`/images/${val.Exchange}.png`}
                                width={20}
                                height={20}
                                alt="Logo"
                            />
                            <span className={styles.logoSpace}></span>
                            <Link
                                // href={`${symbol.toLowerCase()}/${val.Exchange}`}
                                href={
                                    Auth.isLogin || i == 0
                                        ? `${symbol.toLowerCase()}/${
                                              val.Exchange
                                          }`
                                        : ""
                                }
                            >
                                <a
                                    className={
                                        Auth.isLogin || i == 0
                                            ? styles.exchange
                                            : styles.clickprevent
                                    }
                                >
                                    {val.Exchange}
                                </a>
                            </Link>
                        </div>
                    </TableCell>
                    <TableCell align="left">{val.Pair}</TableCell>
                    <TableCell
                        align="left"
                        className={styles[cellStyles[key].price]}
                    >
                        {val.Price}
                    </TableCell>
                    <TableCell
                        align="left"
                        className={styles[cellStyles[key].long]}
                    >
                        {val.Long}
                    </TableCell>
                    <TableCell
                        align="left"
                        className={styles[cellStyles[key].short]}
                    >
                        {val.Short}
                    </TableCell>
                    <TableCell
                        align="left"
                        className={styles[cellStyles[key].funding]}
                    >
                        {val.Funding}
                    </TableCell>
                    <TableCell
                        align="left"
                        className={styles[cellStyles[key].hVolume]}
                    >
                        {val.HVolume}
                    </TableCell>
                    <TableCell
                        align="left"
                        className={styles[cellStyles[key].hChanged]}
                    >
                        {val.HChanged}
                    </TableCell>
                </TableRow>
            ));
    };

    return (
        <div className={styles.root}>
            <TableContainer className={styles.currency} component={Paper}>
                <div className={styles.currencyName} id="bitcoin">
                    <Image
                        src="/images/BTCUSDT.png"
                        width={20}
                        height={20}
                        alt="Logo"
                    />
                    <div className={styles.logoSpace}></div>
                    BITCOIN
                </div>
                <Table className={styles.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Rank</TableCell>
                            <TableCell align="left">Exchange</TableCell>
                            <TableCell align="left">Pair</TableCell>
                            <TableCell align="left">Price</TableCell>
                            <TableCell align="left">Long&nbsp;(%)</TableCell>
                            <TableCell align="left">Short&nbsp;(%)</TableCell>
                            <TableCell align="left">Funding</TableCell>
                            <TableCell align="left">24H&nbsp;Volume</TableCell>
                            <TableCell align="left">24H&nbsp;Changed</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{getTableBody("BTCUSDT")}</TableBody>
                </Table>
            </TableContainer>
            <TableContainer className={styles.currency} component={Paper}>
                <div className={styles.currencyName} id="ethereum">
                    <Image
                        src="/images/ETHUSDT.png"
                        width={20}
                        height={20}
                        alt="Logo"
                    />
                    <div className={styles.logoSpace}></div>
                    ETHEREUM
                </div>
                <Table className={styles.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Rank</TableCell>
                            {/* <TableCell align="left">Exchange</TableCell> */}
                            <TableCell align="left">Exchange</TableCell>
                            <TableCell align="left">Pair</TableCell>
                            <TableCell align="left">Price</TableCell>
                            <TableCell align="left">Long&nbsp;(%)</TableCell>
                            <TableCell align="left">Short&nbsp;(%)</TableCell>
                            <TableCell align="left">Funding</TableCell>
                            <TableCell align="left">24H&nbsp;Volume</TableCell>
                            <TableCell align="left">24H&nbsp;Changed</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{getTableBody("ETHUSDT")}</TableBody>
                </Table>
            </TableContainer>
            <TableContainer className={styles.currency} component={Paper}>
                <div className={styles.currencyName} id="ripple">
                    <Image
                        src="/images/XRPUSDT.png"
                        width={20}
                        height={20}
                        alt="Logo"
                    />
                    <div className={styles.logoSpace}></div>
                    RIPPLE
                </div>
                <Table className={styles.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Rank</TableCell>
                            {/* <TableCell align="left">Exchange</TableCell> */}
                            <TableCell align="left">Exchange</TableCell>
                            <TableCell align="left">Pair</TableCell>
                            <TableCell align="left">Price</TableCell>
                            <TableCell align="left">Long&nbsp;(%)</TableCell>
                            <TableCell align="left">Short&nbsp;(%)</TableCell>
                            <TableCell align="left">Funding</TableCell>
                            <TableCell align="left">24H&nbsp;Volume</TableCell>
                            <TableCell align="left">24H&nbsp;Changed</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{getTableBody("XRPUSDT")}</TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
