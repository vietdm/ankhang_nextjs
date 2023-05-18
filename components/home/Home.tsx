import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { fetch } from "@/libraries/axios";
import { UserHelper } from "@/utils/helper/UserHelper";
import { Alert } from "@/libraries/alert";
import Link from "next/link";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { Color } from "@/libraries/color";
import { BoxMenu, BoxMenuLink } from "./BoxMenu";
import { formatMoney, userLevel } from "@/utils";
import { HomeCountdown } from "./Countdown";
import { HrTag } from "../ui/HrTag";

let deferredPrompt: any = null;

const StatusJoinCashback = {
    notJoin: 'not_join',
    cashbacked: 'cashbacked',
    joined: 'joined'
}

export const HomeComponent = ({ active = false }: { active?: boolean }) => {
    const { user } = useUser();
    const [products, setProducts] = useState<any>([]);
    const [dateCount, setDateCount] = useState<any>(null);
    const [installable, setInstallable] = useState(false);
    const [dashboardData, setDashboardData] = useState<any>(null);
    const [itemProductInRow, setItemProductInRow] = useState<number>(2);
    const [valueOfAkg, setValueOfAkg] = useState<number>(0);
    const [onDoneCountdown, setOnDoneCountdown] = useState<boolean>(false);
    const [statusJoinCashback, setStatusJoinCashback] = useState<string>('');

    let fakeStatusJoinCashback = '';

    const getDatetimeCountdown = () => {
        const _i = (str: string) => {
            return parseInt(str);
        }
        fetch.get('/datetime-countdown').then((result: any) => {
            if (result.datetime == '0') return;
            const datetime = result.datetime.split('_');
            setDateCount(new Date(
                _i(datetime[0]),
                _i(datetime[1]),
                _i(datetime[2]),
                _i(datetime[3]),
                _i(datetime[4]),
                _i(datetime[5]),
                _i(datetime[6])
            ));
        });
    }

    const loadDashboardData = () => {
        fetch.post('/user/dashboard').then((result: any) => {
            setDashboardData(result);
        });
    }

    const getStatusJoinedCashback = () => {
        fetch.get('/user/get-status-join-cashback').then((result: any) => {
            console.log("statusJoinCashback", fakeStatusJoinCashback);
            console.log('result.status', result.status);

            if (
                fakeStatusJoinCashback == StatusJoinCashback.joined &&
                result.status == StatusJoinCashback.cashbacked
            ) {
                loadDashboardData();
            }
            setStatusJoinCashback(result.status);
            fakeStatusJoinCashback = result.status;
        });
    }

    const joinCashbackEvent = () => {
        fetch.post('/event/cashback/join').then((result: any) => {
            setStatusJoinCashback(StatusJoinCashback.joined);
            Alert.success(result.message);
        });
    }

    useEffect(() => {
        getDatetimeCountdown();
        loadDashboardData();
        getStatusJoinedCashback();
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

        const interval = setInterval(() => {
            if (
                fakeStatusJoinCashback == StatusJoinCashback.cashbacked ||
                !onDoneCountdown
            ) return;
            getStatusJoinedCashback();
        }, 2000);

        return () => clearInterval(interval);
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
            )}
            <Box marginTop={3}>
                {!onDoneCountdown ? (
                    <>
                        <Typography
                            variant="h5"
                            textAlign="center"
                            textTransform="uppercase"
                            color="#0578bf"
                        >
                            Khởi động CashBack
                        </Typography>
                        <HomeCountdown
                            date={dateCount}
                            onDone={() => {
                                setOnDoneCountdown(true);
                            }}
                        />
                    </>
                ) : (
                    <>
                        {statusJoinCashback == StatusJoinCashback.notJoin && (
                            <Stack>
                                <Box textAlign="center">
                                    <Button variant="contained" color="error" onClick={() => joinCashbackEvent()}>Đăng ký ngay</Button>
                                </Box>
                                <Stack alignItems="center" marginTop={2}>
                                    <Typography component="p" textAlign="center" textTransform="uppercase" width="310px" fontSize="17px">
                                        <span>Nhanh tay bấm&nbsp;</span>
                                        <span style={{ color: '#b60811', fontWeight: 600 }}>Đăng Ký Ngay</span>
                                        <span>&nbsp;để được nhận&nbsp;</span>
                                        <span style={{ color: '#febc12', fontWeight: 600 }}>Cashback</span>
                                        <span>&nbsp;về ví nào</span>
                                    </Typography>
                                </Stack>
                            </Stack>
                        )}
                        {statusJoinCashback == StatusJoinCashback.joined && (
                            <Stack>
                                <Box textAlign="center">
                                    <Button variant="contained" sx={{ background: '#2699da' }}>Đang xử lý ...</Button>
                                </Box>
                            </Stack>
                        )}
                        {statusJoinCashback == StatusJoinCashback.cashbacked && (
                            <Stack>
                                <Box textAlign="center">
                                    <Button variant="contained" sx={{ background: '#5e85fb' }}>Đã nhận điểm cashback</Button>
                                </Box>
                            </Stack>
                        )}
                    </>
                )}
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
