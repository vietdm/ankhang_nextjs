import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Box, Stack, Typography } from "@mui/material";
import { BoxMenu } from "./BoxMenu";
import { useUser } from "@/hooks/useUser";
import { userLevel } from "@/utils";

export const HomeComponent = () => {
    const { user } = useUser();

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
            <Stack direction="row" flexWrap="wrap" padding="5px" marginTop={2}>
                <BoxMenu>
                    <Typography component="h4" fontSize={17}>Điểm AKG</Typography>
                    <Typography component="p" fontSize={15} textAlign="right">{user?.akg_point}</Typography>
                </BoxMenu>
                <BoxMenu>
                    <Typography component="h4" fontSize={17}>Chức vụ</Typography>
                    <Typography component="p" fontSize={15} textAlign="right">{userLevel(user?.level)}</Typography>
                </BoxMenu>
                <BoxMenu>
                    <Typography component="h4" fontSize={17}>Tổng doanh số</Typography>
                    <Typography component="p" fontSize={15} textAlign="right">0</Typography>
                </BoxMenu>
                <BoxMenu>
                    <Typography component="h4" fontSize={17}>Tổng hoa hồng</Typography>
                    <Typography component="p" fontSize={15} textAlign="right">0</Typography>
                </BoxMenu>
                <BoxMenu>
                    <Typography component="h4" fontSize={17}>Hoa hồng ngày</Typography>
                    <Typography component="p" fontSize={15} textAlign="right">0</Typography>
                </BoxMenu>
                <BoxMenu>
                    <Typography component="h4" fontSize={17}>Tổng thành viên</Typography>
                    <Typography component="p" fontSize={15} textAlign="right">0</Typography>
                </BoxMenu>
            </Stack>
        </Box>
    )
}
