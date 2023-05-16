import { fetch } from "@/libraries/axios";
import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { SinglePage } from "@/components/ui/SinglePage";
import { BoxHistoryWithdraw } from "@/components/money/BoxHistoryWithdraw";
import { BoxHistoryBonus } from "@/components/money/BoxHistoryBonus";

const MoneyHistory = () => {
    const [histories, setHistories] = useState<any>(null);

    useEffect(() => {
        fetch.post('/user/money/history').then((result: any) => {
            console.log(result.histories);

            setHistories(result.histories);
        })
    }, []);

    return (
        <SinglePage title="Lịch sử giao dịch" hasHomeIcon={true} hasBackIcon={false}>
            <Box paddingY={3}>
                {!histories ? (
                    <Stack marginY={3} justifyContent="center" alignItems="center" fontSize="22px">Đang lấy dữ liệu ...</Stack>
                ) : histories.map((history: any, index: number) => (
                    <Box key={index} marginBottom={2}>
                        {history.history_type == 'withdraw' && <BoxHistoryWithdraw history={history} />}
                        {history.history_type == 'bonus' && <BoxHistoryBonus history={history} />}
                    </Box>
                ))}
            </Box>
        </SinglePage>
    );
}

export default MoneyHistory;
