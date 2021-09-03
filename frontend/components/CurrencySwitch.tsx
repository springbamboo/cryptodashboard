// メインページ 通貨選択のボタン
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AnchorLink from "react-anchor-link-smooth-scroll";
import styles from "./CurrencySwitch.module.css";

export default function ContainedButtons() {
    return (
        <div className={styles.root} color="inherit">
            <span className={styles.button}>
                <Button variant="outlined" disableElevation>
                    <AnchorLink href="#bitcoin">Bitcoin</AnchorLink>
                </Button>
            </span>

            <span className={styles.button}>
                <Button variant="outlined" disableElevation>
                    <AnchorLink href="#ethereum">Ethereum</AnchorLink>
                </Button>
            </span>

            <span className={styles.button}>
                <Button variant="outlined" disableElevation>
                    <AnchorLink href="#ripple">Ripple</AnchorLink>
                </Button>
            </span>
        </div>
    );
}
