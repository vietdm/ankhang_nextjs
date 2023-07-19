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
import { useRouter } from "next/router";
import { DialogQc } from "@/components/home/DialogQc";
import { fetch } from "@/libraries/axios";
import { DialogNotifGift } from "@/components/luckywheel/DialogNotifGift";

type BottomMenu = "store" | "mission" | "main" | "gift" | "user";

const Home = () => {
  const [menuActive, setMenuActive] = useState<BottomMenu>("main");
  const [ready, setReady] = useState<boolean>(false);
  const [loadedMission, setLoadedMission] = useState<boolean>(false);
  const [countGift, setCountGift] = useState<number>(0);
  const [showModalNotifGift, setShowModalNotifGift] = useState<boolean>(false);
  const router = useRouter();

  const changeTab = (tab: BottomMenu) => {
    router.push("/?t=" + tab, undefined, { shallow: true });
  };

  const initNotificationGift = () => {
    window.start_init += 1;
    if (window.start_init === 1) {
      fetch.get('/random-lucky-event').then((result: any) => {
        setCountGift(result.count);
      });
    }
  }

  useEffect(() => {
    withAuth(() => {
      setReady(true);
      initNotificationGift();
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
    if (menuActive == "mission") {
      setLoadedMission(true);
    }
  }, [menuActive]);

  return (
    <Box>
      <Box sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        background: "url(\"/imgs/bg_down_page.jpg\")",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}></Box>
      <Box minHeight="100vh" position="relative" sx={{ opacity: ready ? 1 : 0 }}>
        <Box height="calc(100vh - 90px)" overflow="auto" paddingBottom="100px">
          <StoreComponent active={menuActive == "store"} />
          <UserComponent active={menuActive == "user"} />
          {loadedMission && <MissionComponent active={menuActive == "mission"} />}
          <LuckyWheel active={menuActive == "gift"} />
          <HomeComponent active={menuActive == "main"} />
        </Box>
        <div id="Menu">
          <div className="Menu__list">
            <ul>
              <li className={"Menu__list--item " + (menuActive == "main" ? "active" : "")}>
                <a href="" onClick={(e) => {
                  e.preventDefault();
                  changeTab("main");
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
              <li className={"Menu__list--item " + (menuActive == "mission" ? "active" : "")}>
                <a href="" onClick={(e) => {
                  e.preventDefault();
                  changeTab("mission");
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
                  changeTab('main');
                }}>
                  <div className="icon">
                    <HomeOutlinedIcon />
                  </div>
                </a>
              </li>
              <li className='Menu__list--item'></li> */}
              <li className={"Menu__list--item " + (menuActive == "gift" ? "active" : "")}>
                <a href="" onClick={(e) => {
                  e.preventDefault();
                  changeTab("gift");
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
              <li className={"Menu__list--item " + (menuActive == "user" ? "active" : "")}>
                <a href="" onClick={(e) => {
                  e.preventDefault();
                  changeTab("user");
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
      {menuActive === 'main' && ready && (
        <DialogQc
          cbAfterClose={() => {
            if (countGift > 0 && window.start_init === 1) {
              setShowModalNotifGift(true);
            }
          }}
        />
      )}
      <DialogNotifGift
        open={showModalNotifGift}
        countGift={countGift}
        handleClose={() => setShowModalNotifGift(false)}
        handleSuccess={() => {
          setShowModalNotifGift(false);
          changeTab("gift");
        }}
      />
    </Box>
  );
};

export default Home;
