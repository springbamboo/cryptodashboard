import React from 'react'
import styles from './Header.module.css'

const Header = () => {
  const now = new Date()

  return (
    <>
      <div className={styles.largeText}>
        Header DESU! <br/>
        yay!
        <p>Hello world, it is {now.toString()}</p>
      </div>
    </>
  )
}

export default Header
