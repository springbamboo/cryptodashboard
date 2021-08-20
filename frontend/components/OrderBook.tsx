import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import useWsService from '../services/front_back_socket';
import React, {useState, useEffect} from 'react'

export default function BasicTable() {
  const [price, setPrice] = useState(0)
  useWsService(setPrice)

  const [maxTotal, setMaxTotal] = useState(100)

  function backChart(value: number) {
    return { color: 'red', background: `linear-gradient(to left, #f00 ${100 * value/maxTotal}%, #000 ${100 * value/maxTotal}%)` };
  }

  // React.useEffect(() => {
  //   setMaxTotal( Math.max(値1,値2,値3) ); // apiで得たデータで最大値を計算しmaxTotalに更新
  // }, [price])

  const useStyles = makeStyles({
    root: {
      padding: 20,
    },
    table: {
      // minWidth: 650,
    },
    currency: {
      marginBottom: 20,
    },
    currencyName: {
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: '#333333',
    }
  });

  function createData(Rank, Exchange, Price, Size, Total ) {
    return { Rank, Exchange, Price, Size, Total };
  }

  const rows = [
    createData('1', 'XXX', 100, 200, 30 ),
    createData('2', 'XXX', 100, 200, 20 ),
    createData('3', 'XXX', 100, 200, 10 ),
    createData('4', 'XXX', 100, 200, 50 ),
    createData('5', 'XXX', 100, 200, 80 ),
  ];
  const classes = useStyles();
  return (
    <div className={classes.root}>
    <TableContainer className={classes.currency} component={Paper}>
      <div className={classes.currencyName} id='largetrades'>Order Book</div>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Exchange</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Size</TableCell>
            <TableCell align="left">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,i) => (
            <TableRow key={i} style={backChart(row.Total)}>
              <TableCell component="th" scope="row">{row.Exchange}</TableCell>
              <TableCell align="left">{row.Price}</TableCell>
              <TableCell align="left">{row.Size}</TableCell>
              <TableCell align="left">{row.Total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </div>
  );
}