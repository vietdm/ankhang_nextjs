import { Box } from "@mui/material";
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
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';

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
      <div id="Menu">
        <div className="Menu__list">
          <ul>
            <li className={'Menu__list--item ' + (menuActive == 'store' ? 'active' : '')}>
              <a href="" onClick={(e) => {
                e.preventDefault();
                setMenuActive('store');
              }}>
                <div className="icon">
                  <StoreOutlinedIcon />
                </div>
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
              </a>
            </li>
            <li className={'Menu__list--item main ' + (menuActive == 'main' ? 'active' : '')}>
              <a href="" onClick={(e) => {
                e.preventDefault();
                setMenuActive('main');
              }}>
                <div className="icon">
                  <HomeOutlinedIcon />
                </div>
              </a>
            </li>

            <li className={'Menu__list--item ' + (menuActive == 'gift' ? 'active' : '')}>
              <a href="" onClick={(e) => {
                e.preventDefault();
                setMenuActive('gift');
              }}>
                <div className="icon">
                  <CardGiftcardOutlinedIcon />
                </div>
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
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Box>
  );
};

export default Home;
