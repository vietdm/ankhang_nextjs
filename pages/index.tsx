import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { StoreComponent } from "@/components/store/Store";
import { UserComponent } from "@/components/user/User";
import { withAuth } from "@/interfaces/withAuth";
import { MissionComponent } from "@/components/mission";
import { LuckyWheel } from "@/components/luckywheel";
import { HomeComponent } from "@/components/home/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
// import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import { Layout } from "@/components/layout";
import { useRouter } from "next/router";

type BottomMenu = "store" | "mission" | "main" | "gift" | "user";

const Home = () => {
  const [menuActive, setMenuActive] = useState<BottomMenu>("main");
  const [ready, setReady] = useState<boolean>(false);
  const [loadedMission, setLoadedMission] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    withAuth(() => {
      setReady(true);
    });
  }, []);

  useEffect(() => {
    if (!router.query?.t) {
      return;
    }
    const tab = router.query.t as string;
    if (!["store", "mission", "main", "gift", "user"].includes(tab)) {
      return;
    }
    setMenuActive(tab as BottomMenu);
  }, [router.query]);

  useEffect(() => {
    if (menuActive == 'mission') {
      setLoadedMission(true);
    }
  }, [menuActive]);

  return (
    <Layout>
      <Box minHeight="100vh" position="relative" sx={{ opacity: ready ? 1 : 0 }}>
        <Box height="calc(100vh - 90px)" overflow="auto">
          <StoreComponent active={menuActive == 'store'} />
          <UserComponent active={menuActive == 'user'} />
          {loadedMission && <MissionComponent active={menuActive == 'mission'} />}
          <LuckyWheel active={menuActive == 'gift'} />
          <HomeComponent active={menuActive == 'main'} />
        </Box>
        <div id="Menu">
          <div className="Menu__list">
            <ul>
              <li className={'Menu__list--item ' + (menuActive == 'main' ? 'active' : '')}>
                <a href="" onClick={(e) => {
                  e.preventDefault();
                  setMenuActive('main');
                }}>
                  <div className="icon">
                    <HomeOutlinedIcon />
                  </div>
                  <Typography
                    component="span"
                    fontSize="12px"
                    fontWeight={500}
                  >
                    Trang chủ
                  </Typography>
                </a>
              </li>
              <li className={'Menu__list--item ' + (menuActive == 'mission' ? 'active' : '')}>
                <a href="" onClick={(e) => {
                  e.preventDefault();
                  setMenuActive('mission');
                }}>
                  <div className="icon">
                    <AssignmentTurnedInOutlinedIcon />
                  </div>
                  <Typography
                    component="span"
                    fontSize="12px"
                    fontWeight={500}
                  >
                    Nhiệm vụ
                  </Typography>
                </a>
              </li>
              {/* <li className={'Menu__list--item main ' + (menuActive == 'main' ? 'active' : '')}>
                <a href="" onClick={(e) => {
                  e.preventDefault();
                  setMenuActive('main');
                }}>
                  <div className="icon">
                    <HomeOutlinedIcon />
                  </div>
                </a>
              </li>
              <li className='Menu__list--item'></li> */}
              <li className={'Menu__list--item ' + (menuActive == 'gift' ? 'active' : '')}>
                <a href="" onClick={(e) => {
                  e.preventDefault();
                  setMenuActive('gift');
                }}>
                  <div className="icon">
                    <CardGiftcardOutlinedIcon />
                  </div>
                  <Typography
                    component="span"
                    fontSize="12px"
                    fontWeight={500}
                  >
                    Vòng quay
                  </Typography>
                </a>
              </li>
              <li className={'Menu__list--item ' + (menuActive == 'user' ? 'active' : '')}>
                <a href="" onClick={(e) => {
                  e.preventDefault();
                  setMenuActive('user');
                }}>
                  <div className="icon">
                    <PersonOutlineOutlinedIcon />
                  </div>
                  <Typography
                    component="span"
                    fontSize="12px"
                    fontWeight={500}
                  >
                    Tài khoản
                  </Typography>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Box>
    </Layout>
  );
};

export default Home;
