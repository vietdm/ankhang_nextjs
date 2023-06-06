import { formatDate, formatMoney } from "@/utils"
import { Alert, AlertProps, Box, Typography } from "@mui/material"

const AlertHistoryType = ({ color, text }: { color: AlertProps["color"], text: string }) => {
    return (
        <Alert
            color={color}
            icon={false}
            sx={{
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '18px'
            }}
        >
            {text}
        </Alert>
    );
}

export const BoxHistoryProductPoint = ({ history }: { history: any }) => {
    return (
        <Box borderRadius="7px">
            {history.type == 'in' && <AlertHistoryType color="success" text="Tiền vào" />}
            {history.type == 'out' && <AlertHistoryType color="error" text="Tiền ra" />}
            <Box paddingY={1}>
                <Box boxShadow="0 0 1px 0.5px rgba(0, 0, 0, 0.2)" />
            </Box>
            <Typography component="h5">Mã đặt hàng: {history.order.id}</Typography>
            <Box paddingY={1}>
                <Box boxShadow="0 0 1px 0.5px rgba(0, 0, 0, 0.2)" />
            </Box>
            <Typography component="h5">Ngày: {formatDate(history.created_at)}</Typography>
            <Box paddingY={1}>
                <Box boxShadow="0 0 1px 0.5px rgba(0, 0, 0, 0.2)" />
            </Box>
            <Typography component="h5">Số tiền {history.type == 'in' ? 'vào' : 'ra'}: {formatMoney(history.money)}</Typography>
        </Box>
    )
}
