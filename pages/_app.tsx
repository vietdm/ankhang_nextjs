import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import Head from "next/head";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
// import { useState } from "react";
import { Loading } from "@/components/layout/Loading";
import { asset } from "@/utils";

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
  // const [loading, setLoading] = useState<boolean>(false);
  const loading = false;
  const router = useRouter();

  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <title>An Khang Group</title>
        <meta name="description" content="Vì chất lượng cuộc sống gia đình bạn" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={asset("logo192.png")} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="green" />
        <meta name="apple-mobile-web-app-title" content="FreeCodeCamp" />

        <meta property="og:title" content="An Khang Group" />
        <meta property="og:type" content="article" />
        <meta property="og:description" content="Vì chất lượng cuộc sống gia đình bạn" />
        <meta property="og:site_name" content="AnKhang" />
        <meta property="og:image" content={asset("logo192.png")} />
        <meta property="og:image:alt" content="An Khang Group" />
        <meta property="og:url" content={"https://ankhangmilk.com" + router.pathname} />

        <link rel="apple-touch-icon" href={asset("logo192.png")} sizes="72x72" />
        <link rel="apple-touch-icon" href={asset("logo192.png")} sizes="96x96" />
        <link rel="apple-touch-icon" href={asset("logo192.png")} sizes="128x128" />
        <link rel="apple-touch-icon" href={asset("logo192.png")} sizes="144x144" />
        <link rel="apple-touch-icon" href={asset("logo192.png")} sizes="152x152" />
        <link rel="apple-touch-icon" href={asset("logo192.png")} sizes="192x192" />
        <link rel="apple-touch-icon" href={asset("logo192.png")} sizes="384x384" />
        <link rel="apple-touch-icon" href={asset("logo192.png")} sizes="512x512" />
        <link rel="canonical" href={"https://ankhangmilk.com" + router.pathname} />
        <script>window.start_init=0</script>
      </Head>
      <ThemeProvider theme={theme}>

        <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
          <Box position="relative">
            {loading ? (
              <Loading />
            ) : (
              <Component {...pageProps} />
            )}
          </Box>
        </AnimatePresence>
      </ThemeProvider>
    </>
  );
}
