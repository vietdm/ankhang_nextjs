import { fetch } from "@/libraries/axios";
import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { SinglePage } from "@/components/ui/SinglePage";
import { BoxHistoryWithdraw } from "@/components/money/BoxHistoryWithdraw";
import { Alert as AlertDialog } from "@/libraries/alert";

const MoneyWithdrawHistory = () => {
    const [histories, setHistories] = useState<any[]>([]);

    useEffect(() => {
        let urlHistory = '/user/withdraw/history';
        fetch.post(urlHistory).then((result: any) => {
            setHistories(result.histories);
        }).catch((error: any) => {
            setHistories([]);
            AlertDialog.error(error.message);
        });
    }, []);

    return (
        <SinglePage title="Lịch sử rút tiền">
            <Box paddingY='15px'>
                {histories.map((history: any, index: number) => (
                    <Box key={index} sx={{
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        padding: '15px',
                        borderRadius: '7px',
                        marginBottom: '15px'
                    }}>
                        <BoxHistoryWithdraw history={history} />
                    </Box>
                ))}
            </Box>
        </SinglePage>
    );
}

export default MoneyWithdrawHistory;
