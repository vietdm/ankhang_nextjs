
import React, { useState, useEffect } from "react"
import { Box, Stack } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import QrCodeScannerOutlinedIcon from "@mui/icons-material/QrCodeScannerOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Link from "next/link";
import { useRouter } from "next/router";

type BottomMenu = "home" | "mission" | "main" | "gift" | "user";

const Layout = ({ children }: { children: any }) => {
  const [menuActive, setMenuActive] = useState<BottomMenu>("user");
  const router = useRouter();
  useEffect(() => {
    if (router.asPath === '/') setMenuActive('home')
    else setMenuActive(router.asPath.split('/')[1] as BottomMenu)
  }, [])

  return (
    <Box minHeight="100vh" position="relative">
      <Box height="calc(100vh - 50px)" overflow="auto">
        {children}
      </Box>
      <Stack
        position="absolute"
        bottom={0}
        left={0}
        zIndex={99}
        width="100vw"
        height="50px"
        direction="row"
        sx={{
          background: "#7dd6df",
        }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          width="20%"
          sx={{ backgroundColor: menuActive == "home" ? "#0984e3" : undefined, transition: "all .2s" }}
          onClick={() => setMenuActive("home")}
        >
          <Link href="/" passHref>
            <HomeOutlinedIcon
              sx={{ fontSize: 32, color: menuActive == "home" ? "#fff" : "#676ddf", transition: "all .2s" }}
            />
          </Link>
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          width="20%"
          sx={{ backgroundColor: menuActive == "mission" ? "#0984e3" : undefined, transition: "all .2s" }}
          onClick={() => setMenuActive("mission")}
        >
          <AssignmentTurnedInOutlinedIcon
            sx={{ fontSize: 32, color: menuActive == "mission" ? "#fff" : "#676ddf", transition: "all .2s" }}
          />
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          width="20%"
          sx={{ backgroundColor: menuActive == "main" ? "#0984e3" : undefined, transition: "all .2s" }}
          onClick={() => setMenuActive("main")}
        >
          <QrCodeScannerOutlinedIcon
            sx={{ fontSize: 32, color: menuActive == "main" ? "#fff" : "#676ddf", transition: "all .2s" }}
          />
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          width="20%"
          sx={{ backgroundColor: menuActive == "gift" ? "#0984e3" : undefined, transition: "all .2s" }}
          onClick={() => setMenuActive("gift")}
        >
          <CardGiftcardOutlinedIcon
            sx={{ fontSize: 32, color: menuActive == "gift" ? "#fff" : "#676ddf", transition: "all .2s" }}
          />
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          width="20%"
          sx={{ backgroundColor: menuActive == "user" ? "#0984e3" : undefined, transition: "all .2s" }}
          onClick={() => setMenuActive("user")}
        >
          <Link href="/user" passHref>
            <PersonOutlineOutlinedIcon
              sx={{ fontSize: 32, color: menuActive == "user" ? "#fff" : "#676ddf", transition: "all .2s" }}
            />
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
}
export default Layout;
