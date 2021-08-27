import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import useWsService from '../services/front_back_socket';
import {useState, useEffect} from 'react'

export default function BasicTable() {
  const [price, setPrice] = useState(0)
  useWsService(setPrice)

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
  
  function createData(Rank, Exchange, Pair ) {
    return { Rank, Exchange, Pair };
  }
  
  const rows = [
    createData('1', 'XXX', 'YYY' ),
    createData('2', 'XXX', 'YYY' ),
    createData('3', 'XXX', 'YYY' ),
    createData('4', 'XXX', 'YYY' ),
    createData('5', 'XXX', 'YYY' ),
    createData('6', 'XXX', 'YYY' ),
  ];
  const classes = useStyles();
  return (
    <div className={classes.root}>
    <TableContainer className={classes.currency} component={Paper}>
      <div className={classes.currencyName} id='largetrades'>Large Trades</div>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>AAA</TableCell>
            <TableCell align="left">BBB</TableCell>
            <TableCell align="left">CCC</TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}