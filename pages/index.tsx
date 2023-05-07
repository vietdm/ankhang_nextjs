import { Box, Stack } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import { useEffect, useState } from "react";
import { StoreComponent } from "@/components/store/Store";
import { UserComponent } from "@/components/user/User";
import { withAuth } from "@/interfaces/withAuth";
import { MissionComponent } from "@/components/mission";
import { LuckyWheel } from "@/components/luckywheel";
import { HomeComponent } from "@/components/home/Home";

type BottomMenu = "store" | "mission" | "main" | "gift" | "user";

const Home = () => {
  const [menuActive, setMenuActive] = useState<BottomMenu>("main");
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    withAuth(() => {
      setReady(true);
    });
  }, []);

  return (
    <Box minHeight="100vh" position="relative" sx={{ opacity: ready ? 1 : 0 }}>
      <Box height="calc(100vh - 50px)" overflow="auto">
        {menuActive == 'store' && <StoreComponent />}
        {menuActive == 'user' && <UserComponent />}
        {menuActive == 'mission' && <MissionComponent />}
        {menuActive == 'gift' && <LuckyWheel />}
        {menuActive == 'main' && <HomeComponent />}
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
          sx={{ backgroundColor: menuActive == "store" ? "#0984e3" : undefined, transition: "all .2s" }}
          onClick={() => setMenuActive("store")}
        >
          <StoreOutlinedIcon
            sx={{ fontSize: 32, color: menuActive == "store" ? "#fff" : "#676ddf", transition: "all .2s" }}
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
          <HomeOutlinedIcon
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

export default Home;
