import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import Head from "next/head";
import { AnimatePresence } from 'framer-motion';
import Router from "next/router";
import { useEffect, useState } from "react";
import { Loading } from "@/components/layout/Loading";
import Link from "next/link";

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
  const [loading, setLoading] = useState<boolean>(false);

  const start = () => {
    setLoading(true);
  }

  const end = () => {
    setLoading(false);
  }

  useEffect(() => {
    Router.events.on("routeChangeStart", start)
    Router.events.on("routeChangeComplete", end)
    Router.events.on("routeChangeError", end)
    return () => {
      Router.events.off("routeChangeStart", start)
      Router.events.off("routeChangeComplete", end)
      Router.events.off("routeChangeError", end)
    }
  }, []);

  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <title>An Khang Group</title>
        <meta name="description" content="Vì chất lượng cuộc sống của cộng đồng" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="green" />
        <meta name="apple-mobile-web-app-title" content="FreeCodeCamp" />
        <link rel="apple-touch-icon" href="/logo192.png" sizes="72x72" />
        <link rel="apple-touch-icon" href="/logo192.png" sizes="96x96" />
        <link rel="apple-touch-icon" href="/logo192.png" sizes="128x128" />
        <link rel="apple-touch-icon" href="/logo192.png" sizes="144x144" />
        <link rel="apple-touch-icon" href="/logo192.png" sizes="152x152" />
        <link rel="apple-touch-icon" href="/logo192.png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/logo192.png" sizes="384x384" />
        <link rel="apple-touch-icon" href="/logo192.png" sizes="512x512" />
      </Head>
      <ThemeProvider theme={theme}>

        <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
          <Box>
            {loading ? (
              <Loading />
            ) : (
              <Component {...pageProps} />
            )}
            <Link href='tel:0566866333' passHref>
              <Box position="fixed" sx={{
                bottom: '100px',
                right: '10px',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                boxShadow: '1px 2px 4px 1px rgba(0, 0, 0, 0.2)',
                overflow: 'hidden',
                padding: '14px',
                background: '#fff'
              }}
              >
                <img src="/phone.gif" alt="Phone Gif" style={{ width: '100%' }} />
              </Box>
            </Link>
          </Box>
        </AnimatePresence>
      </ThemeProvider>
    </>
  );
}
