import "../styles/globals.css";
import React from "react";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import theme from "../services/theme";

const MyApp = ({ Component, pageProps }: AppProps) => {
    React.useEffect(() => {
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);
    return (
        // テーマ設定
        <ThemeProvider theme={theme}>
            {/* CSS初期化、この中に背景色指定が含まれる */}
            <CssBaseline />
            {/* 各ページの内容 */}
            <Component {...pageProps} />
        </ThemeProvider>
    );
};

export default MyApp;
