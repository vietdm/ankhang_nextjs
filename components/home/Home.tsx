import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Alert, Box, Button, Stack, Typography } from "@mui/material";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { fetch } from "@/libraries/axios";
import { UserHelper } from "@/utils/helper/UserHelper";
import { Alert as AlertDialog } from "@/libraries/alert";
import Link from "next/link";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { Color } from "@/libraries/color";
import { BoxMenu, BoxMenuLink } from "./BoxMenu";
import { formatMoney, userLevel } from "@/utils";
import { HrTag } from "../ui/HrTag";
import { CallSupport } from "../ui/CallSupport";

let deferredPrompt: any = null;

export const HomeComponent = ({ active = false }: { active?: boolean }) => {
    const { user } = useUser();
    const [products, setProducts] = useState<any>([]);
    const [installable, setInstallable] = useState(false);
    const [dashboardData, setDashboardData] = useState<any>(null);
    const [itemProductInRow, setItemProductInRow] = useState<number>(2);
    const [valueOfAkg, setValueOfAkg] = useState<number>(0);

    const loadDashboardData = () => {
        fetch.post('/user/dashboard').then((result: any) => {
            setDashboardData(result);
        });
    }

    useEffect(() => {
        loadDashboardData();

        fetch.get('/value-of-akg').then((result: any) => {
            setValueOfAkg(result.value);
        });

        fetch.get('/products').then((result: any) => {
            let listProduct = result.products;
            if (listProduct.length > 4) {
                listProduct = [listProduct[0], listProduct[1]];
            }
            setProducts(listProduct);
        });
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
            AlertDialog.success('Cài đặt app thành công! Có thể sẽ mất từ 1 - 2 phút để hiển thị ở màn hình chính!');
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
        <Box display={active ? 'block' : 'none'}>
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
                <Stack width="90%" maxWidth="650px" margin="1.5rem auto 0 auto" sx={{
                    backgroundColor: '#e3e3e3',
                    padding: '14px',
                    borderRadius: '14px',
                    background: "radial-gradient(#f4f9fd, #bae4f4)",
                    boxShadow: '0 4px 4px 1px rgba(0, 0, 0, 0.2)'
                }}>
                    <Stack direction="row" >
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
                        <Box width="calc(100% - 80px)" paddingLeft={2}>
                            {user && (
                                <>
                                    <Typography component="h6" sx={{ fontSize: '20px' }} fontWeight="400">
                                        Xin chào, <b>{user.fullname}</b>
                                    </Typography>
                                    <Typography component="h6" sx={{ fontSize: '20px' }} fontWeight="400">
                                        Chức vụ: <b>{userLevel(user.level)}</b>
                                    </Typography>
                                    <Typography component="h6" sx={{ fontSize: '16px' }} fontWeight="400">
                                        Gói tham gia: <b style={{ textTransform: 'uppercase' }}>{UserHelper.getPackageName(user.package_joined)}</b>
                                    </Typography>
                                    <Typography component="h6" sx={{ fontSize: '16px' }} fontWeight="400">
                                        Điểm CASHBACK: <b>{formatMoney(user.cashback_point)}</b>
                                    </Typography>
                                </>
                            )}
                        </Box>
                    </Stack>
                    {dashboardData?.joined_cashback == '1' && (
                        <>
                            <HrTag p={2} />
                            <Alert icon={false} color="success" sx={{ textAlign: 'center', paddingY: 0 }}>
                                <Typography variant="body1"><b>Chúc mừng bạn!</b></Typography>
                                Đã có trong danh sách chờ nhận <b>Cashback</b>
                            </Alert>
                        </>
                    )}
                </Stack>
            )}

            {/* start button install app */}
            {installable &&
                <Box marginY={3} textAlign="center">
                    <Button variant="contained" onClick={() => installAppToHomeScreen()}>
                        Cài đặt App ra màn hình chính
                    </Button>
                </Box>
            }
            {/* end button install app */}

            <Box paddingX='15px' marginBottom={1}>
                <HrTag p={2} />
                <Typography component="h3" fontSize="20px" color="#0578bf" fontWeight="700">Điểm AKG</Typography>
                <Typography component="p">Giá trị điểm AKG hiện tại: <b>{formatMoney(valueOfAkg)}</b></Typography>
                <HrTag p={2} />
            </Box>

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
            <Stack direction="row" flexWrap="wrap" padding="5px" marginTop={2}>
                <BoxMenu>
                    <Typography color="#0049a5" fontWeight="700" component="h4" fontSize={17}>Điểm Thưởng</Typography>
                    <Typography color="#0049a5" fontWeight="700" component="p" fontSize={16} textAlign="right">{formatMoney(user?.reward_point)}</Typography>
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
            <CallSupport bottom="100px" />
        </Box>
    )
}
