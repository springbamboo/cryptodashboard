// メインページ 通貨選択のボタン
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            marginTop: 20,
            marginLeft: 20,
        },
    },
}));

export default function ContainedButtons() {
    const classes = useStyles();

    return (
        <div className={classes.root} color="inherit">
            <Button
                onClick={() => {
                    window.location.href = "#bitcoin";
                }}
                variant="contained"
                disableElevation
            >
                Bitcoin
            </Button>
            <Button variant="contained" disableElevation>
                Ethereum
            </Button>
            <Button
                onClick={() => {
                    window.location.href = "#AAAAAA";
                }}
                variant="contained"
                disableElevation
            >
                Ripple
            </Button>
        </div>
    );
}
