import { fetch } from "@/libraries/axios";
import { formatMoney } from "@/utils";
import { Alert, Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useRouter } from "next/router";

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
        <Box>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                height="50px"
                width="100%"
                sx={{ background: "#0984e3" }}
            >
                <Box padding={1} onClick={() => router.push('/')}>
                    <ArrowBackOutlinedIcon sx={{ color: "#fff" }} />
                </Box>
                <Typography component="h2" color="#fff">
                    Lịch sử yêu cầu rút tiền
                </Typography>
                <Box></Box>
            </Stack>
            <Box boxShadow="0 0 2px 1px rgba(0, 0, 0, 0.3)" />
            <Box marginTop={3} padding="15px">
                {histories.map((history: any, index: number) => (
                    <Box key={index} padding="15px" boxShadow="0 4px 4px 1px rgba(0, 0, 0, 0.2)" borderRadius="7px">
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
                ))}
            </Box>
        </Box>
    );
}

export default WithdrawHistory;
