// メインページ フッタ
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        // ハンバーガーメニュー
        marginRight: theme.spacing(2),
    },
    title: {
        // アイコン
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
                    <Typography variant="h6" className={classes.title}>
                        CRYPTO DATA
                    </Typography>
                    <Button>About</Button>
                    <Button>Developers</Button>
                    <Button>API DOC</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
