import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import useWsService from "../services/front_back_socket";
import { useState, useEffect, useRef } from "react";
import styles from "./DataTable.module.css";
import millify from "millify";

//サーバーから渡されるデータ
interface Coindata {
    exchange: string;
    pairName: string;
    price: number;
    quatity: number;
    change: number;
    funding: number;
    ratio: {
        long: number;
        short: number;
    };
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

export default function BasicTable() {
    // サーバーからのデータ初期化
    function createDefaultCoinData(): Coindata {
        return {
            exchange: "",
            pairName: "",
            price: null,
            quatity: null,
            change: null,
            funding: null,
            ratio: {
                long: null,
                short: null,
            },
        };
    }
    const defaultCoinData: { [key: string]: Coindata } = {
        BTCUSDT: createDefaultCoinData(),
        ETHUSDT: createDefaultCoinData(),
        XRPUSDT: createDefaultCoinData(),
    };

    // サーバーから渡されたデータを、表示用データに整形
    function getRowData(rank: number, coinData: Coindata): RowData {
        return {
            Rank: rank.toString(),
            Exchange: coinData.exchange,
            Pair: coinData.pairName,
            Price: coinData.price !== null ? coinData.price.toString() : "",
            Long:
                coinData.ratio.long !== null
                    ? (coinData.ratio.long * 100).toFixed(4) + "%"
                    : "",
            Short:
                coinData.ratio.short !== null
                    ? (coinData.ratio.short * 100).toFixed(4) + "%"
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
                    ? millify(coinData.change, { precision: 2 })
                    : "",
        };
    }

    function createData(
        Rank,
        Exchange,
        Pair,
        Price,
        Long,
        Short,
        Funding,
        HVolume,
        HChanged
    ): RowData {
        return {
            Rank,
            Exchange,
            Pair,
            Price,
            Long,
            Short,
            Funding,
            HVolume,
            HChanged,
        };
    }

    // セル書式初期化
    function createDefaultCellStyle(): CellStyles {
        return {
            price: "default",
            long: "default",
            short: "default",
            funding: "default",
            hChanged: "default",
            hVolume: "default",
        };
    }

    // サーバーからのデータ
    const [data, setData] = useState(defaultCoinData);
    const prevDataRef = useRef(data);

    // 表示用データ
    const rowsBtc = [
        getRowData(1, data.BTCUSDT),
        createData(
            "2",
            "Bybit",
            "BTCUSDT",
            0,
            "48%",
            "51%",
            "0.01%",
            "21.437B",
            "-5.27%"
        ),
        createData(
            "3",
            "Ftx",
            "BTCUSDT",
            0,
            "48%",
            "51%",
            "0.01%",
            "21.437B",
            "-5.27%"
        ),
        createData(
            "4",
            "Ftx",
            "BTCUSDT",
            0,
            "48%",
            "51%",
            "0.01%",
            "21.437B",
            "-5.27%"
        ),
    ];

    const rowsEth = [
        getRowData(1, data.ETHUSDT),
        createData(
            "2",
            "Bybit",
            "BTCUSDT",
            0,
            "48%",
            "51%",
            "0.01%",
            "21.437B",
            "-5.27%"
        ),
        createData(
            "3",
            "Ftx",
            "BTCUSDT",
            0,
            "48%",
            "51%",
            "0.01%",
            "21.437B",
            "-5.27%"
        ),
        createData(
            "4",
            "Ftx",
            "BTCUSDT",
            0,
            "48%",
            "51%",
            "0.01%",
            "21.437B",
            "-5.27%"
        ),
    ];

    const rowsXrp = [
        getRowData(1, data.XRPUSDT),
        createData(
            "2",
            "Bybit",
            "BTCUSDT",
            0,
            "48%",
            "51%",
            "0.01%",
            "21.437B",
            "-5.27%"
        ),
        createData(
            "3",
            "Ftx",
            "BTCUSDT",
            0,
            "48%",
            "51%",
            "0.01%",
            "21.437B",
            "-5.27%"
        ),
        createData(
            "4",
            "Ftx",
            "BTCUSDT",
            0,
            "48%",
            "51%",
            "0.01%",
            "21.437B",
            "-5.27%"
        ),
    ];

    // セル書式
    const cellStylesBtc = useRef<CellStyles[]>([
        createDefaultCellStyle(),
        createDefaultCellStyle(),
        createDefaultCellStyle(),
        createDefaultCellStyle(),
    ]);
    useEffect(() => {
        // とりあえずBinance + BTCUSDTだけ対応
        for (let i = 0; i < 1; i++) {
            const now = data.BTCUSDT;
            const prev = prevDataRef.current.BTCUSDT;
            if (now.price !== prev.price && prev.price != null) {
                cellStylesBtc.current[i].price =
                    now.price > prev.price ? "positive" : "negative";
            }
            if (now.ratio.long !== prev.ratio.long && prev.ratio.long != null) {
                cellStylesBtc.current[i].long =
                    now.ratio.long > prev.ratio.long ? "positive" : "negative";
            }
            if (
                now.ratio.short !== prev.ratio.short &&
                prev.ratio.short != null
            ) {
                cellStylesBtc.current[i].short =
                    now.ratio.short > prev.ratio.short
                        ? "positive"
                        : "negative";
            }
            cellStylesBtc.current[i].hChanged =
                now.change > 0 ? "positive" : "negative";
        }
        prevDataRef.current = data;
    }, [data]);
    useWsService(setData);

    return (
        <div className={styles.root}>
            <TableContainer className={styles.currency} component={Paper}>
                <div className={styles.currencyName} id="bitcoin">
                    BITCOIN
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
                    <TableBody>
                        {rowsBtc.map((row, i) => (
                            <TableRow key={i}>
                                <TableCell component="th" scope="row">
                                    {row.Rank}
                                </TableCell>
                                <TableCell align="left">
                                    {row.Exchange}
                                </TableCell>
                                <TableCell align="left">{row.Pair}</TableCell>
                                <TableCell
                                    align="left"
                                    className={
                                        styles[cellStylesBtc.current[i].price]
                                    }
                                >
                                    {row.Price}
                                </TableCell>
                                <TableCell
                                    align="left"
                                    className={
                                        styles[cellStylesBtc.current[i].long]
                                    }
                                >
                                    {row.Long}
                                </TableCell>
                                <TableCell
                                    align="left"
                                    className={
                                        styles[cellStylesBtc.current[i].short]
                                    }
                                >
                                    {row.Short}
                                </TableCell>
                                <TableCell
                                    align="left"
                                    className={
                                        styles[cellStylesBtc.current[i].funding]
                                    }
                                >
                                    {row.Funding}
                                </TableCell>
                                <TableCell
                                    align="left"
                                    className={
                                        styles[cellStylesBtc.current[i].hVolume]
                                    }
                                >
                                    {row.HVolume}
                                </TableCell>
                                <TableCell
                                    align="left"
                                    className={
                                        styles[
                                            cellStylesBtc.current[i].hChanged
                                        ]
                                    }
                                >
                                    {row.HChanged}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TableContainer className={styles.currency} component={Paper}>
                <div className={styles.currencyName} id="ethereum">
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
                    <TableBody>
                        {rowsEth.map((row, i) => (
                            <TableRow key={i}>
                                <TableCell component="th" scope="row">
                                    {row.Rank}
                                </TableCell>
                                <TableCell align="left">
                                    {row.Exchange}
                                </TableCell>
                                <TableCell align="left">{row.Pair}</TableCell>
                                <TableCell align="left">{row.Price}</TableCell>
                                <TableCell align="left">{row.Long}</TableCell>
                                <TableCell align="left">{row.Short}</TableCell>
                                <TableCell align="left">
                                    {row.Funding}
                                </TableCell>
                                <TableCell align="left">
                                    {row.HVolume}
                                </TableCell>
                                <TableCell align="left">
                                    {row.HChanged}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TableContainer className={styles.currency} component={Paper}>
                <div className={styles.currencyName} id="ripple">
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
                    <TableBody>
                        {rowsXrp.map((row, i) => (
                            <TableRow key={i}>
                                <TableCell component="th" scope="row">
                                    {row.Rank}
                                </TableCell>
                                <TableCell align="left">
                                    {row.Exchange}
                                </TableCell>
                                <TableCell align="left">{row.Pair}</TableCell>
                                <TableCell align="left">{row.Price}</TableCell>
                                <TableCell align="left">{row.Long}</TableCell>
                                <TableCell align="left">{row.Short}</TableCell>
                                <TableCell align="left">
                                    {row.Funding}
                                </TableCell>
                                <TableCell align="left">
                                    {row.HVolume}
                                </TableCell>
                                <TableCell align="left">
                                    {row.HChanged}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
