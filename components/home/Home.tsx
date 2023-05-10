import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Box, Button, Stack, Typography } from "@mui/material";
import { BoxMenu } from "./BoxMenu";
import { useUser } from "@/hooks/useUser";
import { formatMoney, userLevel } from "@/utils";
import { useEffect, useState } from "react";
import { fetch } from "@/libraries/axios";
import Countdown from "react-countdown";
import Image from "next/image";
import { UserHelper } from "@/utils/helper/UserHelper";
import { Alert } from "@/libraries/alert";

export const HomeComponent = () => {
    const { user } = useUser();
    const [dateCount, setDateCount] = useState<any>(null);
    const [dashboardData, setDashboardData] = useState<any>(null);

    useEffect(() => {
        fetch.post('/user/dashboard').then((result: any) => {
            setDashboardData(result);
        });
        const timeEnd = new Date('2023-05-20 15:00:00');
        setDateCount(timeEnd);
    }, []);

    return (
        <Box paddingBottom="50px">
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
            <Stack direction="row" width="90%" margin="1.5rem auto 0 auto" sx={{
                backgroundColor: '#e3e3e3',
                padding: '14px',
                borderRadius: '14px',
                background: "radial-gradient(#f4f9fd, #bae4f4)",
                boxShadow: '0 4px 4px 1px rgba(0, 0, 0, 0.2)'
            }}>
                <Stack width="80px" direction="row" justifyContent="center" alignItems="center">
                    <Box position="relative" textAlign="center" height={80} width={80}>
                        <Image fill alt={'avatar'} src="/user.png" style={{ borderRadius: '50%', margin: '0 auto' }} />
                    </Box>
                </Stack>
                <Box width="calc(100% - 80px)">
                    <Typography component="h4" textAlign="center" sx={{ fontSize: '22px' }} fontWeight="600">
                        {user?.fullname}
                    </Typography>
                    <Typography component="h6" textAlign="center" sx={{ fontSize: '16px' }} fontWeight="400">
                        Mã KH: <b>{user?.username}</b>
                    </Typography>
                    <Typography component="h6" textAlign="center" sx={{ fontSize: '16px' }} fontWeight="400">
                        Gói tham gia: <b style={{ textTransform: 'uppercase' }}>{user?.package_joined && UserHelper.getPackageName(user.package_joined)}</b>
                    </Typography>
                </Box>
            </Stack>
            <Box marginY={3}>
                <Typography variant="h5" textAlign="center">Count Down...</Typography>
                <Stack justifyContent="center" alignItems="center" fontSize="34px">
                    {dateCount && <Countdown date={dateCount} />}
                </Stack>
            </Box>
            <Box marginY={3} textAlign="center">
                <Button variant="contained" onClick={() => Alert.error('Chức năng đang phát triển')}>Cài đặt App ra màn hình chính</Button>
            </Box>
            <Stack direction="row" flexWrap="wrap" padding="5px" marginTop={2}>
                <BoxMenu>
                    <Typography color="#0049a5" fontWeight="700" component="h4" fontSize={17}>Điểm Thưởng</Typography>
                    <Typography color="#0049a5" fontWeight="700" component="p" fontSize={16} textAlign="right">{formatMoney(user?.reward_point)}</Typography>
                </BoxMenu>
                <BoxMenu>
                    <Typography color="#0049a5" fontWeight="700" component="h4" fontSize={17}>Chức vụ</Typography>
                    <Typography color="#0049a5" fontWeight="700" component="p" fontSize={16} textAlign="right">{userLevel(user?.level)}</Typography>
                </BoxMenu>
                <BoxMenu>
                    <Typography color="#0049a5" fontWeight="700" component="h4" fontSize={17}>Tổng doanh số</Typography>
                    <Typography color="#0049a5" fontWeight="700" component="p" fontSize={16} textAlign="right">{formatMoney(dashboardData?.total_sale ?? 0)}</Typography>
                </BoxMenu>
                <BoxMenu>
                    <Typography color="#0049a5" fontWeight="700" component="h4" fontSize={17}>Tổng hoa hồng</Typography>
                    <Typography color="#0049a5" fontWeight="700" component="p" fontSize={16} textAlign="right">{formatMoney(dashboardData?.money_bonus ?? 0)}</Typography>
                </BoxMenu>
                <BoxMenu>
                    <Typography color="#0049a5" fontWeight="700" component="h4" fontSize={17}>Hoa hồng ngày</Typography>
                    <Typography color="#0049a5" fontWeight="700" component="p" fontSize={16} textAlign="right">{formatMoney(dashboardData?.money_bonus_day ?? 0)}</Typography>
                </BoxMenu>
                <BoxMenu>
                    <Typography color="#0049a5" fontWeight="700" component="h4" fontSize={17}>Tổng thành viên</Typography>
                    <Typography color="#0049a5" fontWeight="700" component="p" fontSize={16} textAlign="right">{dashboardData?.total_child}</Typography>
                </BoxMenu>
            </Stack>
        </Box>
    )
}
