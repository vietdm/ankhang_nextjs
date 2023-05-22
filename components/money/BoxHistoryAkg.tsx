import { formatDate, formatMoney } from "@/utils"
import { Alert, AlertProps, Box, Typography } from "@mui/material"

const Hr = () => {
    return (
        <Box paddingY={1}>
            <Box boxShadow="0 0 1px 0.5px rgba(0, 0, 0, 0.2)" />
        </Box>
    );
}

export const BoxHistoryAkg = ({ history }: { history: any }) => {
    return (
        <Box borderRadius="7px">
            <Typography component="h5">Nội dung: {history.content}</Typography>
            <Hr />
            <Typography component="h5">Ngày nhận: {formatDate(history.created_at)}</Typography>
            <Hr />
            <Typography component="h5">Số điểm: {history.amount}</Typography>
        </Box>
    )
}
