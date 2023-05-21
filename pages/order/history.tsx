import { fetch } from "@/libraries/axios";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { SinglePage } from "@/components/ui/SinglePage";
import { OrderHistory } from "@/components/orders/History";
import { HrTag } from "@/components/ui/HrTag";
import { DialogOrderHistoryInfo } from "@/components/ui/DialogOrderHistoryInfo";

const HistoryOrderPage = () => {
    const [histories, setHistories] = useState<any>([]);
    const [historyShowDetail, setHistoryShowDetail] = useState<any>(null);

    useEffect(() => {
        fetch.post('/order/history').then((result: any) => {
            setHistories(result.history);
        });
    }, []);

    return (
        <SinglePage title="Lịch sử mua hàng">
            {histories.length == 0 ? (
                <Typography textAlign="center" component="p" marginTop={2}>Không có lịch sử</Typography>
            ) : (
                <Box overflow="auto" paddingY="15px">
                    {histories.map((history: any, index: number) => (
                        <Box key={index} onClick={() => setHistoryShowDetail(history)}>
                            {index > 0 && <HrTag />}
                            <OrderHistory history={history} />
                        </Box>
                    ))}
                </Box>
            )}
            <DialogOrderHistoryInfo
                open={historyShowDetail != null}
                onClose={() => setHistoryShowDetail(null)}
                history={historyShowDetail}
            />
        </SinglePage>
    )
}

export default HistoryOrderPage;
