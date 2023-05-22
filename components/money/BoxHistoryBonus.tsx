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

export const BoxHistoryBonus = ({ history }: { history: any }) => {
    return (
        <Box borderRadius="7px">
            {history.type == 'cap_bac' && <AlertHistoryType color="success" text="Cấp bậc" />}
            {history.type == 'truc_tiep' && <AlertHistoryType color="info" text="Trực tiếp" />}
            <Box paddingY={1}>
                <Box boxShadow="0 0 1px 0.5px rgba(0, 0, 0, 0.2)" />
            </Box>
            <Typography component="h5">Nội dung: {history.content}</Typography>
            <Box paddingY={1}>
                <Box boxShadow="0 0 1px 0.5px rgba(0, 0, 0, 0.2)" />
            </Box>
            <Typography component="h5">Ngày nhận: {formatDate(history.created_at)}</Typography>
            <Box paddingY={1}>
                <Box boxShadow="0 0 1px 0.5px rgba(0, 0, 0, 0.2)" />
            </Box>
            <Typography component="h5">Từ user: {history.user_from?.username ?? ''}</Typography>
            <Box paddingY={1}>
                <Box boxShadow="0 0 1px 0.5px rgba(0, 0, 0, 0.2)" />
            </Box>
            <Typography component="h5">Số tiền: {formatMoney(history.money_bonus)}</Typography>
        </Box>
    )
}
