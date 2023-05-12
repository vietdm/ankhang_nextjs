import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Box, Button, Stack, Typography } from "@mui/material";
import { BoxMenu, BoxMenuLink } from "./BoxMenu";
import { useUser } from "@/hooks/useUser";
import { formatMoney, userLevel } from "@/utils";
import { useEffect, useState } from "react";
import { fetch } from "@/libraries/axios";
import Countdown from "react-countdown";
import Image from "next/image";
import { UserHelper } from "@/utils/helper/UserHelper";
import { Alert } from "@/libraries/alert";
import Link from "next/link";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

let deferredPrompt: any = null;

export const HomeComponent = ({ active = false }: { active?: boolean }) => {
    const { user } = useUser();
    const [products, setProducts] = useState<any>([]);
    const [dateCount, setDateCount] = useState<any>(null);
    const [dashboardData, setDashboardData] = useState<any>(null);
    const [installable, setInstallable] = useState(false);

    useEffect(() => {
        fetch.post('/user/dashboard').then((result: any) => {
            setDashboardData(result);
        });
        fetch.get('/products').then((result: any) => {
            setProducts(result.products);
        });
        const timeEnd = new Date('2023-05-20 15:00:00');
        setDateCount(timeEnd);
    }, []);

    useEffect(() => {
        window.addEventListener("beforeinstallprompt", (e) => {
            e.preventDefault();
            deferredPrompt = e;
            setInstallable(true);
        });

        window.addEventListener('appinstalled', () => {
            Alert.success('Cài đặt app thành công! Có thể sẽ mất từ 1 - 2 phút để hiển thị ở màn hình chính!');
        });
    }, []);
    const installAppToHomeScreen = () => {
        setInstallable(false);
        if (!deferredPrompt) {
            return;
        }
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(() => {
            //
        });
    };

    return (
        <Box paddingBottom="50px" display={active ? 'block' : 'none'}>
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
                    <Typography component="h6" textAlign="center" sx={{ fontSize: '20px' }} fontWeight="400">
                        Xin chào, <b>{user?.fullname}</b>
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
                <Typography
                    variant="h5"
                    textAlign="center"
                    textTransform="uppercase"
                    color="#0578bf"
                >
                    Khởi động CashBack
                </Typography>
                <Stack justifyContent="center" alignItems="center" fontSize="34px">
                    {dateCount && <Countdown date={dateCount} />}
                </Stack>
            </Box>

            {/* start button install app */}
            {installable &&
                <Box marginY={3} textAlign="center">
                    <Button variant="contained" onClick={() => installAppToHomeScreen()}>
                        Cài đặt App ra màn hình chính
                    </Button>
                </Box>
            }
            {/* end button install app */}
            <Link passHref href="/store">
                <Stack direction="row" paddingX="15px" alignItems="center" color="#0578bf" justifyContent="end">
                    <Typography component="h4" fontSize="20px" fontWeight={500}>Cửa hàng</Typography>
                    <ArrowCircleRightOutlinedIcon sx={{ marginLeft: "10px" }} />
                </Stack>
            </Link>
            <Stack direction="row" flexWrap="wrap" maxHeight="calc(100% - 50px)" overflow="auto" marginTop={0}>
                {products.map((product: any) => (
                    <Box width="50%" padding="16px" key={product.id}>
                        <Link passHref href="/store">
                            <Box position="relative" width="100%">
                                <img alt={product.title} src={product.images[0]} style={{ width: '100%' }} />
                            </Box>
                            <Typography component="p" textAlign="center" fontSize="16px">
                                {product.title}
                            </Typography>
                        </Link>
                    </Box>
                ))}
            </Stack>

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
                <BoxMenuLink link='/user/tree'>
                    <Typography color="#0049a5" fontWeight="700" component="h4" fontSize={17}>Tổng thành viên</Typography>
                    <Typography color="#0049a5" fontWeight="700" component="p" fontSize={16} textAlign="right">{dashboardData?.total_child}</Typography>
                </BoxMenuLink>
            </Stack>
        </Box>
    )
}
