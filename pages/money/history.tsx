import { fetch } from "@/libraries/axios";
import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { SinglePage } from "@/components/ui/SinglePage";
import { BoxHistoryWithdraw } from "@/components/money/BoxHistoryWithdraw";
import { BoxHistoryBonus } from "@/components/money/BoxHistoryBonus";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import "swiper/css/pagination";

type TabHistory = 'withdraw' | 'bonus';

const MoneyHistory = () => {
    const [histories, setHistories] = useState<any>(null);
    const [listHistories, setListHistories] = useState<any>([]);
    const [tabHistory, setTabHistory] = useState<TabHistory>('bonus');

    const changeTabHistory = (newTab: TabHistory) => {
        if (newTab == tabHistory) return;
        setHistories(null);
        setTabHistory(newTab);
    }

    useEffect(() => {
        if (typeof listHistories[tabHistory] != 'undefined') {
            setTimeout(() => {
                setHistories(listHistories[tabHistory]);
            }, 200);
            return;
        }
        let urlHistory = '';
        switch (tabHistory) {
            case "withdraw":
                urlHistory = '/user/withdraw/history';
                break;
            case "bonus":
                urlHistory = '/user/bonus/history';
                break;
        }
        fetch.post(urlHistory).then((result: any) => {
            setHistories(result.histories);
            listHistories[tabHistory] = result.histories;
            setListHistories(listHistories);
        }).catch(() => {
            setHistories([]);
            listHistories[tabHistory] = [];
            setListHistories(listHistories);
        })
    }, [tabHistory]);

    return (
        <SinglePage title="Lịch sử giao dịch">
            <Box
                height="70px"
                paddingTop="5px"
                position="fixed"
                top="50px"
                left="0"
                width="100%"
                sx={{ background: '#fff' }}
                paddingX="15px"
            >
                <Swiper
                    slidesPerView={1.5}
                    pagination={false}
                    spaceBetween={10}
                    loop={false}
                >
                    <SwiperSlide>
                        <Box
                            paddingY={2}
                            boxShadow="0 2px 4px 1px rgba(0, 0, 0, 0.2)"
                            borderRadius="7px"
                            sx={{ backgroundColor: tabHistory == 'bonus' ? '#eccc68' : '#e3e3e3' }}
                            onClick={() => changeTabHistory('bonus')}
                        >
                            <Typography component="p" textAlign="center">Hoa hồng</Typography>
                        </Box>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Box
                            paddingY={2}
                            boxShadow="0 2px 4px 1px rgba(0, 0, 0, 0.2)"
                            borderRadius="7px"
                            sx={{ backgroundColor: tabHistory == 'withdraw' ? '#eccc68' : '#e3e3e3' }}
                            onClick={() => changeTabHistory('withdraw')}
                        >
                            <Typography component="p" textAlign="center">Rút tiền</Typography>
                        </Box>
                    </SwiperSlide>
                </Swiper>
            </Box>
            <Box paddingBottom={3} paddingTop="80px">
                {!histories ? (
                    <Stack marginY={3} justifyContent="center" alignItems="center" fontSize="22px">Đang lấy dữ liệu ...</Stack>
                ) : (
                    <>
                        {histories.length === 0 && (
                            <Stack marginY={3} justifyContent="center" alignItems="center" fontSize="22px">Không có dữ liệu</Stack>
                        )}
                        {tabHistory == 'withdraw' && <BoxHistoryWithdraw histories={histories} />}
                        {tabHistory == 'bonus' && <BoxHistoryBonus histories={histories} />}
                    </>
                )}

            </Box>
        </SinglePage>
    );
}

export default MoneyHistory;
