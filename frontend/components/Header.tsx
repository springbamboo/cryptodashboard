// メインページ ヘッダ
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import Auth from "../services/auth";
import { AccountCircle } from "@material-ui/icons";
import Image from "next/image";

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
    space: {
        width: 5,
    }
}));

export default function ButtonAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" color="inherit">
                <Toolbar>
                    <Image
                        src={`/images/Logo1.png`}
                        width={40}
                        height={40}
                        alt="Logo"
                    />
                    <span className={classes.space}></span>
                    <Typography variant="h6" className={classes.title}>
                        <Link href="/">QRYPTO DATA</Link>
                    </Typography>
                    <Link href="/">
                        <Button>Home</Button>
                    </Link>
                    {Auth.isLogin ? (
                        <Button startIcon={<AccountCircle />}>
                            {Auth.userStatus.username}
                        </Button>
                    ) : (
                        <Link href="/login" passHref>
                            <Button>Login</Button>
                        </Link>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}
