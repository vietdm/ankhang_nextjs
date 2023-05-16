import { formatMoney } from "@/utils"
import { Alert, Box, Stack, Typography } from "@mui/material"

export const BoxHistoryWithdraw = ({ history }: { history: any }) => {
    return (
        <Box padding="15px" borderRadius="7px" border="5px solid red">
            <Typography variant="h6" textAlign="center">Rút tiền</Typography>
            <Typography component="h5">Mã GD: {history.id}</Typography>
            <Box paddingY={1}>
                <Box boxShadow="0 0 1px 0.5px rgba(0, 0, 0, 0.2)" />
            </Box>
            <Typography component="h5">Ngày yêu cầu: {history.date}</Typography>
            <Box paddingY={1}>
                <Box boxShadow="0 0 1px 0.5px rgba(0, 0, 0, 0.2)" />
            </Box>
            <Typography component="h5">Số tiền: {formatMoney(history.money)}</Typography>
            <Box paddingY={1}>
                <Box boxShadow="0 0 1px 0.5px rgba(0, 0, 0, 0.2)" />
            </Box>
            <Typography component="h5">Số tiền thực nhận: {formatMoney(history.money_real)}</Typography>
            <Box paddingY={1}>
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
                    {history.status === 3 && (
                        <Alert sx={{ justifyContent: "center" }} variant="standard" icon={false} severity="error">Từ chối!</Alert>
                    )}
                </Box>
            </Stack>
        </Box>
    )
}
