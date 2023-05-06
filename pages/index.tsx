import { Box, Stack } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import QrCodeScannerOutlinedIcon from "@mui/icons-material/QrCodeScannerOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useEffect, useState } from "react";
import { HomeComponent } from "@/components/home/Home";
import { getProductsList } from "./api/products";
import { Product } from "../interfaces/product";
import { UserComponent } from "@/components/user/User";
import { withAuth } from "@/interfaces/withAuth";
import { MissionComponent } from "@/components/mission";
import { LuckyWheel } from "@/components/luckywheel";
import UserTree from "./user/tree";
import { Alert } from "@/libraries/alert";

type BottomMenu = "home" | "mission" | "main" | "gift" | "user";

const Home = ({ products = [] }: { products: Product[] }) => {
  const [menuActive, setMenuActive] = useState<BottomMenu>("home");
  const [ready, setReady] = useState<boolean>(false);

  const isAddToHomeScreenSupported = () => {
    const isIos = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
    const isSafari = /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent.toLowerCase());
    const isChromeForAndroid = /chrome/i.test(window.navigator.userAgent.toLowerCase()) && /android/i.test(window.navigator.userAgent.toLowerCase());

    return (isIos && isSafari) || isChromeForAndroid;
  }

  const installApp = () => {
    const promptEvent = window.deferredPrompt;

    if (promptEvent) {
      promptEvent.prompt();
      promptEvent.userChoice.then((result) => {
        if (result.outcome === 'accepted') {
          Alert.success('Shortcut đã được cài đặt!');
        } else {
          Alert.success('Shortcut không được cài đặt');
        }

        window.deferredPrompt = null;
      });
    }
  }

  useEffect(() => {
    withAuth(() => {
      setReady(true);
      if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone == true) {
        //
      } else {
        if (isAddToHomeScreenSupported()) {
          if (confirm('Bạn có muốn cài đặt app của chúng tôi ra ngoài màn hình chính không?')) {
            setTimeout(() => {
              installApp();
            }, 1000);
          }
        }
      }
    });
  }, []);

  return (
    <Box minHeight="100vh" position="relative" sx={{ opacity: ready ? 1 : 0 }}>
      <Box height="calc(100vh - 50px)" overflow="auto">
        {menuActive == 'home' && <HomeComponent products={products} />}
        {menuActive == 'user' && <UserComponent />}
        {menuActive == 'mission' && <MissionComponent />}
        {menuActive == 'gift' && <LuckyWheel />}
        {menuActive == 'main' && <UserTree />}
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
          <HomeOutlinedIcon
            sx={{ fontSize: 32, color: menuActive == "home" ? "#fff" : "#676ddf", transition: "all .2s" }}
          />
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
          <PersonOutlineOutlinedIcon
            sx={{ fontSize: 32, color: menuActive == "user" ? "#fff" : "#676ddf", transition: "all .2s" }}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export async function getStaticProps() {
  const reponse = await getProductsList() as any;
  return {
    props: { products: reponse?.products }
  }
}
export default Home;
