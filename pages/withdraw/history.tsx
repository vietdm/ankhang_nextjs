import { fetch } from "@/libraries/axios";
import { formatMoney } from "@/utils";
import { Alert, Box, Stack, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { HrTag } from "@/components/ui/HrTag";
import { SinglePage } from "@/components/ui/SinglePage";

const WithdrawHistory = () => {
    const [histories, setHistories] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        fetch.post('/user/withdraw/history').then((result: any) => {
            setHistories(result.histories);
        })
    }, []);

    if (!histories) {
        return <Stack marginY={3} justifyContent="center" alignItems="center" fontSize="22px">Đang lấy dữ liệu ...</Stack>
    }

    return (
        <SinglePage title="Lịch sử yêu cầu rút tiền" hasHomeIcon={true} hasBackIcon={false}>
            <Box paddingY={3}>
                {histories.map((history: any, index: number) => (
                    <Fragment key={index}>
                        <Box padding="15px" borderRadius="7px">
                            <Typography component="h5">Ngày yêu cầu: {history.date}</Typography>
                            <Box paddingY={2}>
                                <Box boxShadow="0 0 1px 0.5px rgba(0, 0, 0, 0.2)" />
                            </Box>
                            <Typography component="h5">Số tiền: {formatMoney(history.money)}</Typography>
                            <Box paddingY={2}>
                                <Box boxShadow="0 0 1px 0.5px rgba(0, 0, 0, 0.2)" />
                            </Box>
                            <Stack direction="row" justifyContent="center">
                                <Box width="250px">
                                    {history.status === 0 && (
                                        <Alert sx={{ justifyContent: "center" }} variant="standard" icon={false} severity="warning">Đang chờ chấp thuận!</Alert>
                                    )}
                                    {history.status === 1 && (
                                        <Alert sx={{ justifyContent: "center" }} variant="standard" icon={false} severity="info">Đã chấp thuận!</Alert>
                                    )}
                                    {history.status === 2 && (
                                        <Alert sx={{ justifyContent: "center" }} variant="standard" icon={false} severity="success">Rút thành công!</Alert>
                                    )}
                                    {history.status === 2 && (
                                        <Alert sx={{ justifyContent: "center" }} variant="standard" icon={false} severity="error">Từ chối!</Alert>
                                    )}
                                </Box>
                            </Stack>
                        </Box>
                        {index < histories.length - 1 && <HrTag p={1} />}
                    </Fragment>
                ))}
            </Box>
        </SinglePage>
    );
}

export default WithdrawHistory;
