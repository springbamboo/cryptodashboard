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
    <div className={classes.root}>
      <Button variant="contained">Bitcoin</Button>
      <Button variant="contained" color="primary">
      Ethereum
      </Button>
      <Button variant="contained" color="secondary">
        aabbcc
      </Button>
      <Button variant="contained" disabled>
        ddeeffgg
      </Button>
      <Button variant="contained" color="primary" href="#contained-buttons">
        hhii
      </Button>
    </div>
  );
}