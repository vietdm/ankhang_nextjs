import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Box } from "@mui/material";

export const HomeComponent = () => {
    return (
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
    )
}
