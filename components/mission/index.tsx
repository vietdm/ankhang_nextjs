import { Alert } from '@/libraries/alert';
import { fetch } from '@/libraries/axios';
import { youtubeParser } from '@/utils';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import YouTube from 'react-youtube';

export const MissionComponent = () => {
    const [limit, setLimit] = useState<number>(0);
    const [videoMission, setVideoMission] = useState<string | null>(null);
    const [listVideoMission, setListVideoMission] = useState<any>([]);
    const [missionId, setMissionId] = useState<number>(0);
    const [calledMission, setCalledMission] = useState<boolean>(false);

    useEffect(() => {
        fetch.get('/mission-list/video').then(result => {
            const idVideo = youtubeParser(result.mission[0].content.url);
            setLimit(result.limit);
            setVideoMission(idVideo);
            setMissionId(result.mission[0].id);
            setListVideoMission(result.mission);
        });
    }, []);

    const opts = {
        width: String(window.innerWidth),
        height: String(window.innerWidth * 0.609375),
        playerVars: {
            autoplay: 1,
        },
    };

    const onReady = (event: any) => {
        event.target.pauseVideo();
    }

    const onStateChange = (event: any) => {
        const playerState = event.target.getPlayerState();

        if (playerState === YouTube.PlayerState.ENDED && !calledMission) {
            fetch.post('/mission/update', { mission_list_id: missionId }).then(result => {
                Alert.success(result.message);
                setLimit(result.limit);
                setCalledMission(true);
            }).catch(error => {
                setCalledMission(true);
            });
        }
    }

    return (
        <Box>
            <Typography variant="h6" textAlign="center" marginY={1}>Video nhiệm vụ</Typography>
            {videoMission != null && <YouTube videoId={videoMission} opts={opts} onReady={onReady} onStateChange={onStateChange} onProgress={console.log} />}
            <Box marginTop={3}>
                <Typography component="p" textAlign="center">Hôm nay bạn còn {limit} lần xem có thưởng!</Typography>
            </Box>
        </Box>
    );
}
