import { formatMoney } from "@/utils"
import { Alert, AlertProps, Box, Stack, Typography } from "@mui/material"

const AlertHistoryStatus = ({ color, text }: { color: AlertProps["color"], text: string }) => {
    return (
        <Alert
            color={color}
            icon={false}
            sx={{
                justifyContent: 'center',
                padding: 0
            }}
        >
            {text}
        </Alert>
    );
}

export const BoxHistoryWithdraw = ({ history }: { history: any }) => {
    return (
        <Box borderRadius="7px">
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
                        <AlertHistoryStatus color="warning" text="Đang chờ chấp thuận!" />
                    )}
                    {history.status === 1 && (
                        <AlertHistoryStatus color="info" text="Đã chấp thuận!" />
                    )}
                    {history.status === 2 && (
                        <AlertHistoryStatus color="success" text="Rút thành công!" />
                    )}
                    {history.status === 3 && (
                        <AlertHistoryStatus color="error" text="Từ chối!" />
                    )}
                </Box>
            </Stack>
        </Box>
    )
}
