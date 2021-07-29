// メインページ 通貨選択のボタン
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function ContainedButtons() {
  const classes = useStyles();

  return (
    <div className={classes.root} color="inherit">
      <Button variant="contained" disableElevation>
        Bitcoin
      </Button>
      <Button variant="contained" disableElevation>
      Ethereum
      </Button>
      <Button variant="contained" disableElevation>
        aabbcc
      </Button>
      <Button variant="contained" disableElevation>
        ddeeffgg
      </Button>
      <Button variant="contained" href="#contained-buttons" disableElevation>
        hhii
      </Button>
    </div>
  );
}