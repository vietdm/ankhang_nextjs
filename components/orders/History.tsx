import { formatDate, formatMoney } from "@/utils";
import { Alert, Box, Stack, Typography } from "@mui/material"

export const OrderHistory = ({ history }: { history: any }) => {
    return (
        <Stack direction="row">
            <Box width="100px" padding="5px">
                {history?.product && (
                    <img src={history.product.images[0]} alt="Img" style={{
                        width: '100%'
                    }} />
                )}
            </Box>
            <Box width="calc(100% - 100px)" paddingLeft="5px">
                <Typography component="h3" fontWeight={600}>{history.product?.title ?? 'Unknow'}</Typography>
                <Stack direction="row">
                    <Typography component="span">Mã ĐH:&nbsp;</Typography>
                    <Typography component="span" fontWeight={600}>{history.code}</Typography>
                </Stack>
                <Stack direction="row">
                    <Typography component="span">Ngày đặt:&nbsp;</Typography>
                    <Typography component="span" fontWeight={600}>{formatDate(history.created_at)}</Typography>
                </Stack>
                <Stack direction="row">
                    <Typography component="span">Số lượng:&nbsp;</Typography>
                    <Typography component="span" fontWeight={600}>{history.quantity}</Typography>
                </Stack>
                <Stack direction="row">
                    <Typography component="span">Tổng giá:&nbsp;</Typography>
                    <Typography component="span" fontWeight={600}>{formatMoney(history.total_price)}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center">
                    <Typography component="span" minWidth="110px">Trạng thái:&nbsp;</Typography>
                    <Typography component="span" fontWeight={600} width="100%">
                        {history.status === 0 && (
                            <Alert icon={false} severity="info" sx={{ paddingY: 0 }}>Chờ xác nhận</Alert>
                        )}
                        {history.status === 1 && (
                            <Alert icon={false} severity="success" sx={{ paddingY: 0 }}>Đã xác nhận</Alert>
                        )}
                        {history.status === 4 && (
                            <Alert icon={false} severity="error" sx={{ paddingY: 0 }}>Đã hủy</Alert>
                        )}
                    </Typography>
                </Stack>
            </Box>
        </Stack>
    );
}
