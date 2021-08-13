// メインページ ヘッダ
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: { // ハンバーガーメニュー
    marginRight: theme.spacing(2),
  },
  title: { // アイコン
    flexGrow: 1,
    color: "#ccccff",
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            CRYPTO DATA
          </Typography>
          <Button>Home</Button>
          <Button>Our API</Button>
          <Button>About</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}