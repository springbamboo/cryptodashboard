import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import useWsService from '../services/front_back_socket';
import { useState, useEffect } from 'react'
import styles from './DataTable.module.css'

export default function BasicTable() {
  const [price, setPrice] = useState(0)
  useWsService(setPrice)

  function createData(Rank, Exchange, Pair, Price, Long, Short, Funding, HVolume, HChanged ) {
    return { Rank, Exchange, Pair, Price, Long, Short, Funding, HVolume, HChanged };
  }

  const rows = [
    createData('1', 'Binance', 'BTCSUDT',price, '48%', '51%', '0.01%', '21.437B', '-5.27%' ),
    createData('2', 'Bybit', 'BTCSUDT', 37411.25, '48%', '51%', '0.01%', '21.437B', '-5.27%' ),
    createData('3', 'Ftx', 'BTCSUDT', 37411.25, '48%', '51%', '0.01%', '21.437B', '-5.27%' ),
    createData('4', 'Ftx', 'BTCSUDT', 37411.25, '48%', '51%', '0.01%', '21.437B', '-5.27%' ),
  ];
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
          {rows.map((row,i) => (
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
          {rows.map((row,i) => (
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
      <div className={styles.currencyName} id='AAAAAA'>AAAAAA</div>
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
          {rows.map((row,i) => (
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