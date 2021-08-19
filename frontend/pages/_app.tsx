import '../styles/globals.css'
import React from 'react'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import { ThemeProvider } from '@material-ui/core'
import theme from './theme'

const MyApp = ({ Component, pageProps }: AppProps) => {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
