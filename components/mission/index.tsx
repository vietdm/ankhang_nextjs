import { Alert } from "@/libraries/alert";
import { fetch } from "@/libraries/axios";
import { randomNumber, youtubeParser } from "@/utils";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { Options } from "youtube-player/dist/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectCoverflow } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import axios from "axios";
import { Loading } from "../layout/Loading";
import { CallSupport } from "../ui/CallSupport";

const timeCallApiMissionUpdate = 90; //giây

export const MissionComponent = ({ active = false }: { active?: boolean }) => {
  const [swiper, setSwiper] = useState<any>(null);
  const [limit, setLimit] = useState<number>(0);
  const [videoMission, setVideoMission] = useState<string | null>(null);
  const [listVideoMission, setListVideoMission] = useState<any>({});
  const [missionId, setMissionId] = useState<number>(0);
  const [calledMission, setCalledMission] = useState<boolean>(false);
  const [player, setPlayer] = useState<any>(null);
  const [opts, setOpts] = useState<Options>({
    width: 0,
    height: 0,
    playerVars: {
      autoplay: 1,
      rel: 0,
      controls: 0,
    },
  });

  const slideTo = (index: number) => {
    if (swiper) swiper.slideTo(index);
  };

  useEffect(() => {
    fetch.get("/mission-list/video").then(async (result: any) => {
      setLimit(result.limit);

      let listMission: any = {};

      for (const mission of result.mission) {
        const videoId = youtubeParser(mission.content.url);
        listMission[videoId] = {
          id: mission.id,
        };
        await axios.get("https://noembed.com/embed?dataType=json&url=https://www.youtube.com/watch?v=" + videoId).then(({ data }) => {
          listMission[videoId].title = data.title;
        });
      }
      setListVideoMission(listMission);
    });

    setOpts({
      ...opts,
      width: String(window.innerWidth),
      height: String(window.innerWidth * 0.609375),
    });
  }, []);

  const onReady = (event: any) => {
    setPlayer(event.target);
    event.target.pauseVideo();
  };

  const callApiMissionUpdate = () => {
    fetch.post("/mission/update", { mission_list_id: missionId }).then((result: any) => {
      Alert.success(result.message);
      setLimit(result.limit);
      setCalledMission(true);
    }).catch((error) => {
      Alert.error(error.message);
      setCalledMission(true);
    });
  }

  const onStateChange = (event: any) => {
    const playerState = event.target.getPlayerState();

    if (playerState === YouTube.PlayerState.ENDED && !calledMission) {
      callApiMissionUpdate();
    }
  };

  const changeVideo = (videoId: any) => {
    setVideoMission(videoId);
    setMissionId(listVideoMission[videoId].id);
    setCalledMission(false);
  };

  const togglePlayVideo = () => {
    if (!player) return;
    if (player.getPlayerState() == YouTube.PlayerState.PLAYING) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };

  useEffect(() => {
    const intervalListenPlayVideo = setInterval(() => {
      if (!player) return;
      if (player.getPlayerState() != YouTube.PlayerState.PLAYING) return;
      const currentTime = Math.floor(player.getCurrentTime());
      if (currentTime < timeCallApiMissionUpdate) return;
      if (calledMission) return;
      callApiMissionUpdate();
    }, 1000);

    return () => {
      clearInterval(intervalListenPlayVideo);
    }
  }, [player, calledMission]);

  useEffect(() => {
    try {
      if (!active && player) {
        player.pauseVideo();
      }
    } catch (e) {
      //
    }
  }, [active]);

  useEffect(() => {
    const lengthMission = Object.keys(listVideoMission).length;
    if (lengthMission <= 0) return;
    const indexMissionActive = randomNumber(0, lengthMission);
    const videoId = Object.keys(listVideoMission)[indexMissionActive];
    setVideoMission(videoId);
    setMissionId(listVideoMission[videoId].id);
    setTimeout(() => slideTo(indexMissionActive), 500);
  }, [listVideoMission]);

  return (
    <Box display={active ? "block" : "none"}>
      {!player && <Loading height="calc(100% - 90px)" />}
      <Typography variant="h6" textAlign="center" marginY={1}>Video nhiệm vụ</Typography>
      {videoMission != null && (
        <Box position="relative">
          <YouTube
            videoId={videoMission}
            opts={opts}
            onReady={onReady}
            onStateChange={onStateChange}
          />
          <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height={opts.height + "px"}
            zIndex={9999}
            onClick={() => togglePlayVideo()}
          ></Box>
        </Box>
      )}
      {Object.keys(listVideoMission).length > 0 && (
        <Box marginTop={3}>
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
            onSwiper={setSwiper}
            className="mySwiper"
          >
            {Object.keys(listVideoMission).map((ms: string, index: number) => (
              <SwiperSlide style={{ width: "50%" }} key={index} onClick={() => changeVideo(ms)}>
                <img src={`https://img.youtube.com/vi/${ms}/hqdefault.jpg`} style={{ width: "100%" }} alt="" />
                <h4>{listVideoMission[ms].title}</h4>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      )}
      <Box marginTop={3}>
        <Typography component="p" textAlign="center">Hôm nay bạn còn <b style={{ color: "blue" }}>{limit}</b> lần xem có
          thưởng!</Typography>
      </Box>
      <CallSupport bottom="100px" />
    </Box>
  );
};
