import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material";
import Head from "next/head";

const theme = createTheme({
  typography: {
    fontFamily: `"Mulish", "Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    button: {
      textTransform: "none",
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <title>An Khang</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.ico" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="green" />
        <meta name="apple-mobile-web-app-title" content="FreeCodeCamp" />
        <link rel="apple-touch-icon" href="/logo.png" sizes="72x72" />
        <link rel="apple-touch-icon" href="/logo.png" sizes="96x96" />
        <link rel="apple-touch-icon" href="/logo.png" sizes="128x128" />
        <link rel="apple-touch-icon" href="/logo.png" sizes="144x144" />
        <link rel="apple-touch-icon" href="/logo.png" sizes="152x152" />
        <link rel="apple-touch-icon" href="/logo.png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/logo.png" sizes="384x384" />
        <link rel="apple-touch-icon" href="/logo.png" sizes="512x512" />
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
