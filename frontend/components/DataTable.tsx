import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import useWsService from '../services/front_back_socket';
import { useState, useEffect, useRef } from 'react'
import styles from './DataTable.module.css'

interface Coindata {
  "exchange":string
  "pairName":string
  "price":number
  "quatity":number
  "change":number
  "funding":number
  "ratio":{
      "long":number
      "short":number
  }
}

type CellStyle = 'default' | 'negative' | 'positive'

interface CellStyles {
  price: CellStyle
  long: CellStyle
  short: CellStyle
  funding: CellStyle
  hVolume: CellStyle
  hChanged: CellStyle
}

export default function BasicTable() {
  function createDefaultCellStyle(): CellStyles {
    return {
      price: 'default',
      long: 'default',
      short: 'default',
      funding: 'negative',
      hChanged: 'default',
      hVolume: 'positive',
    }
  }
  function createDefaultCoinData(): Coindata {
    return {
      exchange: "",
      pairName: "",
      price: 0,
      quatity: 0,
      change: 0,
      funding: 0,
      ratio: {
          long:0,
          short:0
      }
    }
  }

  const defaultData :{[key:string]:Coindata} = {
    BTCUSDT: createDefaultCoinData(),
    ETHUSDT: createDefaultCoinData(),
    XRPUSDT: createDefaultCoinData(),
  };

  const [data, setData] = useState(defaultData)
  const prevDataRef = useRef(data);

  function createData(Rank, Exchange, Pair, Price, Long, Short, Funding, HVolume, HChanged ) {
    return { Rank, Exchange, Pair, Price, Long, Short, Funding, HVolume, HChanged };
  }

  const rowsBtc = [
    createData('1', 'Binance', data.BTCUSDT.pairName, data.BTCUSDT.price, data.BTCUSDT.ratio.long, data.BTCUSDT.ratio.short, data.BTCUSDT.funding, data.BTCUSDT.quatity, data.BTCUSDT.change),
    createData('2', 'Bybit', 'BTCUSDT', 0, '48%', '51%', '0.01%', '21.437B', '-5.27%' ),
    createData('3', 'Ftx', 'BTCUSDT', 0, '48%', '51%', '0.01%', '21.437B', '-5.27%' ),
    createData('4', 'Ftx', 'BTCUSDT', 0, '48%', '51%', '0.01%', '21.437B', '-5.27%' ),
  ];

  const rowsEth = [
    createData('1', 'Binance', data.ETHUSDT.pairName, data.ETHUSDT.price, data.ETHUSDT.ratio.long, data.ETHUSDT.ratio.short, data.ETHUSDT.funding, data.ETHUSDT.quatity, data.ETHUSDT.change),
    createData('2', 'Bybit', 'BTCUSDT', 0, '48%', '51%', '0.01%', '21.437B', '-5.27%' ),
    createData('3', 'Ftx', 'BTCUSDT', 0, '48%', '51%', '0.01%', '21.437B', '-5.27%' ),
    createData('4', 'Ftx', 'BTCUSDT', 0, '48%', '51%', '0.01%', '21.437B', '-5.27%' ),
  ];

  const rowsXrp = [
    createData('1', 'Binance', data.XRPUSDT.pairName, data.XRPUSDT.price, data.XRPUSDT.ratio.long, data.XRPUSDT.ratio.short, data.XRPUSDT.funding, data.XRPUSDT.quatity, data.XRPUSDT.change),
    createData('2', 'Bybit', 'BTCUSDT', 0, '48%', '51%', '0.01%', '21.437B', '-5.27%' ),
    createData('3', 'Ftx', 'BTCUSDT', 0, '48%', '51%', '0.01%', '21.437B', '-5.27%' ),
    createData('4', 'Ftx', 'BTCUSDT', 0, '48%', '51%', '0.01%', '21.437B', '-5.27%' ),
  ];
  const cellStylesBtc: CellStyles[] = [
    createDefaultCellStyle(),
    createDefaultCellStyle(),
    createDefaultCellStyle(),
    createDefaultCellStyle(),
  ]
  useEffect(() => {
    prevDataRef.current = data;
  }, [data]);
  useWsService(setData)

  return (
    <div className={styles.root}>

    <TableContainer className={styles.currency} component={Paper}>
      <div className={styles.currencyName} id='bitcoin'>BITCOIN</div>
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
          {rowsBtc.map((row,i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {row.Rank}
              </TableCell>
              <TableCell align="left">{row.Exchange}</TableCell>
              <TableCell align="left">{row.Pair}</TableCell>
              <TableCell align="left" className={styles[cellStylesBtc[i].price]}>{row.Price}</TableCell>
              <TableCell align="left" className={styles[cellStylesBtc[i].long]}>{row.Long}</TableCell>
              <TableCell align="left" className={styles[cellStylesBtc[i].short]}>{row.Short}</TableCell>
              <TableCell align="left" className={styles[cellStylesBtc[i].funding]}>{row.Funding}</TableCell>
              <TableCell align="left" className={styles[cellStylesBtc[i].hVolume]}>{row.HVolume}</TableCell>
              <TableCell align="left" className={styles[cellStylesBtc[i].hChanged]}>{row.HChanged}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <TableContainer className={styles.currency} component={Paper}>
      <div className={styles.currencyName} id='ethereum'>ETHEREUM</div>
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
          {rowsEth.map((row,i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {row.Rank}
              </TableCell>
              <TableCell align="left">{row.Exchange}</TableCell>
              <TableCell align="left">{row.Pair}</TableCell>
              <TableCell align="left">{row.Price}</TableCell>
              <TableCell align="left">{row.Long}</TableCell>
              <TableCell align="left">{row.Short}</TableCell>
              <TableCell align="left">{row.Funding}</TableCell>
              <TableCell align="left">{row.HVolume}</TableCell>
              <TableCell align="left">{row.HChanged}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <TableContainer className={styles.currency} component={Paper}>
      <div className={styles.currencyName} id='ripple'>RIPPLE</div>
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
          {rowsXrp.map((row,i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {row.Rank}
              </TableCell>
              <TableCell align="left">{row.Exchange}</TableCell>
              <TableCell align="left">{row.Pair}</TableCell>
              <TableCell align="left">{row.Price}</TableCell>
              <TableCell align="left">{row.Long}</TableCell>
              <TableCell align="left">{row.Short}</TableCell>
              <TableCell align="left">{row.Funding}</TableCell>
              <TableCell align="left">{row.HVolume}</TableCell>
              <TableCell align="left">{row.HChanged}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

