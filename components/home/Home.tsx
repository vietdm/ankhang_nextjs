import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Box, Stack, Typography } from "@mui/material";
import { BoxMenu } from "./BoxMenu";
import { useUser } from "@/hooks/useUser";
import { userLevel } from "@/utils";
import { useEffect, useState } from "react";
import { fetch } from "@/libraries/axios";
import Countdown from "react-countdown";

export const HomeComponent = () => {
    const { user } = useUser();
    const [dateCount, setDateCount] = useState<any>(null);
    const [dashboardData, setDashboardData] = useState<any>(null);

    useEffect(() => {
        fetch.post('/user/dashboard').then((result: any) => {
            setDashboardData(result);
        });
        const timeEnd = new Date('2023-05-10 20:00:00');
        setDateCount(timeEnd);
    }, []);

    return (
        <Box>
            <Swiper
                pagination={true}
                modules={[Pagination, Autoplay]}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                spaceBetween={30}
                loop={true}
            >
                <SwiperSlide>
                    <Box>
                        <img src="/imgs/banner1.jpg" alt="Banner1" style={{ width: '100%' }} />
                    </Box>
                </SwiperSlide>
                <SwiperSlide>
                    <Box>
                        <img src="/imgs/banner3.jpg" alt="Banner3" style={{ width: '100%' }} />
                    </Box>
                </SwiperSlide>
                <SwiperSlide>
                    <Box>
                        <img src="/imgs/banner4.jpg" alt="Banner4" style={{ width: '100%' }} />
                    </Box>
                </SwiperSlide>
                <SwiperSlide>
                    <Box>
                        <img src="/imgs/banner5.jpg" alt="Banner5" style={{ width: '100%' }} />
                    </Box>
                </SwiperSlide>
            </Swiper>
            <Box marginY={3}>
                <Typography variant="h5" textAlign="center">Count Down...</Typography>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '34px'
                }}>
                    {dateCount && <Countdown date={dateCount} />}
                </div>
            </Box>
            <Stack direction="row" flexWrap="wrap" padding="5px" marginTop={2}>
                <BoxMenu>
                    <Typography color="#0049a5" fontWeight="700" component="h4" fontSize={17}>Điểm AKG</Typography>
                    <Typography color="#0049a5" fontWeight="700" component="p" fontSize={16} textAlign="right">{user?.akg_point}</Typography>
                </BoxMenu>
                <BoxMenu>
                    <Typography color="#0049a5" fontWeight="700" component="h4" fontSize={17}>Chức vụ</Typography>
                    <Typography color="#0049a5" fontWeight="700" component="p" fontSize={16} textAlign="right">{userLevel(user?.level)}</Typography>
                </BoxMenu>
                <BoxMenu>
                    <Typography color="#0049a5" fontWeight="700" component="h4" fontSize={17}>Tổng doanh số</Typography>
                    <Typography color="#0049a5" fontWeight="700" component="p" fontSize={16} textAlign="right">0</Typography>
                </BoxMenu>
                <BoxMenu>
                    <Typography color="#0049a5" fontWeight="700" component="h4" fontSize={17}>Tổng hoa hồng</Typography>
                    <Typography color="#0049a5" fontWeight="700" component="p" fontSize={16} textAlign="right">{dashboardData?.money_bonus}</Typography>
                </BoxMenu>
                <BoxMenu>
                    <Typography color="#0049a5" fontWeight="700" component="h4" fontSize={17}>Hoa hồng ngày</Typography>
                    <Typography color="#0049a5" fontWeight="700" component="p" fontSize={16} textAlign="right">{dashboardData?.money_bonus_day}</Typography>
                </BoxMenu>
                <BoxMenu>
                    <Typography color="#0049a5" fontWeight="700" component="h4" fontSize={17}>Tổng thành viên</Typography>
                    <Typography color="#0049a5" fontWeight="700" component="p" fontSize={16} textAlign="right">0</Typography>
                </BoxMenu>
            </Stack>
        </Box>
    )
}
