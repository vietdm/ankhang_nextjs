import { Alert } from '@/libraries/alert';
import { fetch } from '@/libraries/axios';
import { youtubeParser } from '@/utils';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectCoverflow } from "swiper";
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import axios from "axios";

export const MissionComponent = () => {
    const [limit, setLimit] = useState<number>(0);
    const [videoMission, setVideoMission] = useState<string | null>(null);
    const [listVideoMission, setListVideoMission] = useState<any>({});
    const [missionId, setMissionId] = useState<number>(0);
    const [calledMission, setCalledMission] = useState<boolean>(false);

    useEffect(() => {
        fetch.get('/mission-list/video').then(async (result: any) => {
            const idVideo = youtubeParser(result.mission[0].content.url);
            setLimit(result.limit);
            setVideoMission(idVideo);
            setMissionId(result.mission[0].id);

            let listMission: any = {};

            for (const mission of result.mission) {
                const videoId = youtubeParser(mission.content.url);
                listMission[videoId] = {
                    id: mission.id
                };
                await axios.get('https://noembed.com/embed?dataType=json&url=https://www.youtube.com/watch?v=' + videoId).then(({ data }) => {
                    listMission[videoId].title = data.title;
                });
            }
            setListVideoMission(listMission);
        });
    }, []);

    const opts: YouTubeProps['opts'] = {
        width: String(window.innerWidth),
        height: String(window.innerWidth * 0.609375),
        playerVars: {
            autoplay: 1,
            rel: 0
        },
    };

    const onReady = (event: any) => {
        event.target.pauseVideo();
    }

    const onStateChange = (event: any) => {
        const playerState = event.target.getPlayerState();

        if (playerState === YouTube.PlayerState.ENDED && !calledMission) {
            fetch.post('/mission/update', { mission_list_id: missionId }).then((result: any) => {
                Alert.success(result.message);
                setLimit(result.limit);
                setCalledMission(true);
            }).catch(() => {
                setCalledMission(true);
            });
        }
    }

    const changeVideo = (videoId: any) => {
        setVideoMission(videoId);
        setMissionId(listVideoMission[videoId].id);
        setCalledMission(false);
    }

    return (
        <Box>
            <Typography variant="h6" textAlign="center" marginY={1}>Video nhiệm vụ</Typography>
            {videoMission != null && (
                <YouTube
                    videoId={videoMission}
                    opts={opts}
                    onReady={onReady}
                    onStateChange={onStateChange}
                />
            )}
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
                    className="mySwiper"
                >
                    {Object.keys(listVideoMission).map((ms: string, index: number) => (
                        <SwiperSlide style={{ width: '50%' }} key={index} onClick={() => changeVideo(ms)}>
                            <img src={`https://img.youtube.com/vi/${ms}/hqdefault.jpg`} style={{ width: '100%' }} />
                            <h4>{listVideoMission[ms].title}</h4>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
            <Box marginTop={3}>
                <Typography component="p" textAlign="center">Hôm nay bạn còn <b style={{ color: "blue" }}>{limit}</b> lần xem có thưởng!</Typography>
            </Box>
        </Box>
    );
}
