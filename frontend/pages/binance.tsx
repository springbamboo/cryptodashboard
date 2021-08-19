// メインページああああ
import React from 'react';
import { useEffect, useState } from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Header from '../components/Header'
import Footer from '../components/Footer'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import OrderBook from '../components/OrderBook'
import LargeTrades from '../components/LargeTrades'
import styles from './binance.module.css';

export default function Home() {

    const useStyles = makeStyles((theme) => ({
        paper: {
            padding: theme.spacing(2),
        },
    }));
    const classes = useStyles();

    return (
        <div className={styles.background}>
                <div>
                    <Header />
                </div>
                <div>
                    <div className={styles.content}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <Paper className={classes.paper}>
                                    <OrderBook />
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper className={classes.paper}>
                                    <LargeTrades />
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper className={classes.paper}>
                                    <LargeTrades />
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper className={classes.paper}>
                                    <LargeTrades />
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <div>
                    <Footer />
                </div>
        </div>
    )
}