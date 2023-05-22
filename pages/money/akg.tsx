import { fetch } from "@/libraries/axios";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { SinglePage } from "@/components/ui/SinglePage";
import { Alert as AlertDialog } from "@/libraries/alert";
import { BoxHistoryAkg } from "@/components/money/BoxHistoryAkg";

const MoneyAkgHistory = () => {
    const [histories, setHistories] = useState<any[]>([]);

    useEffect(() => {
        let urlHistory = '/user/akg/history';
        fetch.post(urlHistory).then((result: any) => {
            setHistories(result.histories);
        }).catch((error) => {
            AlertDialog.error(error.message);
            setHistories([]);
        });
    }, []);

    return (
        <SinglePage title="Lịch sử nhận AKG">
            <Box paddingY='15px'>
                {histories.map((history: any, index: number) => (
                    <Box key={index} sx={{
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        padding: '15px',
                        borderRadius: '7px',
                        marginBottom: '15px'
                    }}>
                        <BoxHistoryAkg history={history} />
                    </Box>
                ))}
                {histories.length == 0 && <Typography textAlign="center" component="p" marginTop={2}>Không có lịch sử</Typography>}
            </Box>
        </SinglePage>
    );
}

export default MoneyAkgHistory;
