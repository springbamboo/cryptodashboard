import { createTheme } from "@material-ui/core/styles";

// const prefersDarkMode = useMediaQuery('(prefers-color-scheme: light)'); // userがダークモードを使用しているかどうかをチェック
// const theme = React.useMemo(
//   () =>
const theme = createTheme({
    palette: {
        // メインページの配色設定
        // type: prefersDarkMode ? 'dark' : 'light', // userがダークモードを使用しているかどうかでモードを切り替える
        type: "dark", // userがダークモードを使用しているかどうかでモードを切り替える
        primary: {
            light: "#757ce8",
            main: "#121212", // テーマmainカラー
            dark: "#002884",
            contrastText: "#fff",
        },
        secondary: {
            light: "#ff7961",
            main: "#ff1111",
            dark: "#ba000d",
            contrastText: "#000",
        },
        background: {
            default: "#303030",
        },
    },
});
// [prefersDarkMode],
// );

export default theme;
