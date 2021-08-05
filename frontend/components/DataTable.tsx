import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(Rank, Exchange, Pair, Price, Long, Short, Funding, HVolume, HChanged ) {
  return { Rank, Exchange, Pair, Price, Long, Short, Funding, HVolume, HChanged };
}

const rows = [
  createData('1', 'Binance', 'BTCSUDT',1234, '48%', '51%', '0.01%', '21.437B', '-5.27%' ),
  createData('1', 'Bybit', 'BTCSUDT', 37411.25, '48%', '51%', '0.01%', '21.437B', '-5.27%' ),
  createData('1', 'Ftx', 'BTCSUDT', 37411.25, '48%', '51%', '0.01%', '21.437B', '-5.27%' ),
  createData('1', 'Ftx', 'BTCSUDT', 37411.25, '48%', '51%', '0.01%', '21.437B', '-5.27%' ),
];

export default function BasicTable() {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
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
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.Rank}>
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
  );
}