import { Box, Stack } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import QrCodeScannerOutlinedIcon from "@mui/icons-material/QrCodeScannerOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useState } from "react";
import { HomeComponent } from "@/components/home/Home";
import { getProductsList, Product } from "./api/products";


type BottomMenu = "home" | "mission" | "main" | "gift" | "user";

const Home = ({products = []}: {products : Product[]}) => {
  const [menuActive, setMenuActive] = useState<BottomMenu>("home");
console.log(products)
  return (
    <Box minHeight="100vh" position="relative">
      <Box height="calc(100vh - 50px)" overflow="auto">
        <HomeComponent products={products}/>
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
      props:{products: reponse?.products}
  }
}
export default Home;
