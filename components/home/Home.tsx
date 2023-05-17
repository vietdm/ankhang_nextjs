import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { fetch } from "@/libraries/axios";
import Countdown from "react-countdown";
import { UserHelper } from "@/utils/helper/UserHelper";
import { Alert } from "@/libraries/alert";
import Link from "next/link";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { Color } from "@/libraries/color";

let deferredPrompt: any = null;

export const HomeComponent = ({ active = false }: { active?: boolean }) => {
    const { user } = useUser();
    const [products, setProducts] = useState<any>([]);
    const [dateCount, setDateCount] = useState<any>(null);
    const [installable, setInstallable] = useState(false);
    const [itemProductInRow, setItemProductInRow] = useState<number>(2);

    useEffect(() => {
        fetch.get('/products').then((result: any) => {
            let listProduct = result.products;
            if (listProduct.length > 4) {
                listProduct = [listProduct[0], listProduct[1]];
            }
            setProducts(listProduct);
        });
        const timeEnd = new Date('2023-05-20 15:00:00');
        setDateCount(timeEnd);
    }, []);

    const getItemProductWithWidth = () => {
        const windowWidth = window.innerWidth;
        if (windowWidth <= 576) return setItemProductInRow(2);
        if (windowWidth <= 768) return setItemProductInRow(3);
        if (windowWidth <= 992) return setItemProductInRow(4);
        return setItemProductInRow(5);
    }

    useEffect(() => {
        getItemProductWithWidth();

        window.addEventListener("beforeinstallprompt", (e) => {
            e.preventDefault();
            deferredPrompt = e;
            setInstallable(true);
        });

        window.addEventListener('appinstalled', () => {
            Alert.success('Cài đặt app thành công! Có thể sẽ mất từ 1 - 2 phút để hiển thị ở màn hình chính!');
        });

        window.addEventListener('resize', function () {
            getItemProductWithWidth();
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
                        <img src="/imgs/banner/1.png" alt="Banner1" style={{ width: '100%' }} />
                    </Box>
                </SwiperSlide>
                <SwiperSlide>
                    <Box>
                        <img src="/imgs/banner/2.png" alt="Banner3" style={{ width: '100%' }} />
                    </Box>
                </SwiperSlide>
                <SwiperSlide>
                    <Box>
                        <img src="/imgs/banner/3.png" alt="Banner4" style={{ width: '100%' }} />
                    </Box>
                </SwiperSlide>
                <SwiperSlide>
                    <Box>
                        <img src="/imgs/banner/4.png" alt="Banner5" style={{ width: '100%' }} />
                    </Box>
                </SwiperSlide>
            </Swiper>
            {user && (
                <Stack direction="row" width="90%" maxWidth="650px" margin="1.5rem auto 0 auto" sx={{
                    backgroundColor: '#e3e3e3',
                    padding: '14px',
                    borderRadius: '14px',
                    background: "radial-gradient(#f4f9fd, #bae4f4)",
                    boxShadow: '0 4px 4px 1px rgba(0, 0, 0, 0.2)'
                }}>
                    <Stack width="80px" direction="row" justifyContent="center" alignItems="center">
                        <Box position="relative" textAlign="center" height={80} width={80}>
                            {user.level == 'nomal' ? (
                                <Box sx={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    top: 0,
                                    left: 0,
                                    backgroundImage: 'url("/user.png")',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    overflow: 'hidden',
                                    borderRadius: '50%',
                                    zIndex: 8,
                                    border: '7px solid ' + (user.total_buy == 0 ? Color.new : Color[user.level])
                                }} />
                            ) : (
                                <Box>
                                    <img src={`/imgs/capbac/${user.level}_1.png`} alt="" style={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        top: 0,
                                        left: 0,
                                        overflow: 'hidden',
                                        borderRadius: '50%',
                                        zIndex: 9,
                                    }} />
                                </Box>
                            )}
                        </Box>
                    </Stack>
                    <Box width="calc(100% - 80px)">
                        {user && (
                            <>
                                <Typography component="h6" textAlign="center" sx={{ fontSize: '20px' }} fontWeight="400">
                                    Xin chào, <b>{user.fullname}</b>
                                </Typography>
                                <Typography component="h6" textAlign="center" sx={{ fontSize: '16px' }} fontWeight="400">
                                    Gói tham gia: <b style={{ textTransform: 'uppercase' }}>{UserHelper.getPackageName(user.package_joined)}</b>
                                </Typography>
                                {/* <Typography component="h6" textAlign="center" sx={{ fontSize: '16px' }} fontWeight="400">
                                    Điểm CASHBACK: <b>{formatMoney(user.reward_point)}</b>
                                </Typography> */}
                            </>
                        )}
                    </Box>
                </Stack>
            )}
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
            <Stack direction="row" flexWrap="wrap" justifyContent="center" maxHeight="calc(100% - 50px)" overflow="auto" marginTop={0}>
                {products.map((product: any) => (
                    <Box width={`calc(100% / ${itemProductInRow})`} padding="16px" key={product.id}>
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
        </Box>
    )
}
