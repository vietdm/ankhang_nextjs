import { Button, Dialog, DialogActions, DialogContent, Stack, Typography } from "@mui/material";
import CallMadeOutlinedIcon from '@mui/icons-material/CallMadeOutlined';
import { HrTag } from "../ui/HrTag";

type Props = {
    handleClose?: any,
    handleSuccess?: any,
    open: boolean
}

export const DialogBeforeSpin = ({
    handleClose,
    handleSuccess,
    open
}: Props) => {
    return (
        <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { margin: '10px', paddingBottom: "15px", width: '100%' } }}>
            <DialogContent sx={{ overflowY: "initial" }}>
                <Typography component="p">Để có thể tham gia <b>vòng quay may mắn</b>, bạn cần làm <b>khảo sát</b>, để chúng tôi có thể lắng nghe ý kiến của quý khách hàng về hành vi tiêu dùng sản phẩm sữa.</Typography>
                <HrTag p={1} />
                <Typography component="p">Chúng tôi chỉ gửi quà tặng khi quý khách đã làm khảo sát.</Typography>
                <Typography component="p">Nếu đã làm khảo sát, vui lòng bỏ qua bước này!</Typography>
                <HrTag p={1} />
                <a href="https://docs.google.com/forms/d/1ZvVgu-SY7TEqFzvhISk7mfG9GiqhtmkJ0dcHcGV3hSE/prefill" target="_blank">
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography component="h6" p={1} fontWeight={700}>Đi tới khảo sát</Typography>
                        <CallMadeOutlinedIcon sx={{ marginRight: '15px' }} />
                    </Stack>
                </a>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center" }}>
                <Button variant="outlined" color="warning" onClick={handleClose}>Huỷ</Button>
                <Button variant="contained" onClick={handleSuccess}>Đã khảo sát</Button>
            </DialogActions>
        </Dialog>
    )
}
