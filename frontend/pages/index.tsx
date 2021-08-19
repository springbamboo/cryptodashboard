// メインページ
import React from 'react';
import { useEffect, useState } from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Header from '../components/Header'
import CurrencySwitchButton from '../components/CurrencySwitchButton'
import DataTable from '../components/DataTable'
import Footer from '../components/Footer'
import styles from './index.module.css';

export default function Home() {
  return (
    <div className={styles.background}>
        <div>
          <Header />
        </div>
        <div>
          <CurrencySwitchButton />
          <DataTable />
        </div>
        <div>
          <Footer />
        </div>
    </div>
  )
}
