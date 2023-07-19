import { Button, Dialog, DialogActions, DialogContent, Typography } from "@mui/material";

type Props = {
    handleClose?: any,
    handleSuccess?: any,
    open: boolean
}

export const DialogNotifGift = ({
    handleClose,
    handleSuccess,
    open
}: Props) => {
    return (
        <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { margin: '10px', paddingBottom: "15px", width: '100%' } }}>
            <DialogContent sx={{ overflowY: "initial" }}>
                <Typography component="p">📢 Bạn đang có <b>0</b> lượt quay vòng quay may mắn.</Typography>
                <Typography component="p">🎁 Đừng bỏ lỡ những phần quà hấp dẫn và giá trị.</Typography>
                <Typography component="p">🌟 Cùng đi tới vòng quay may mắn và nhận phần quà dành riêng cho bạn nào.</Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center" }}>
                <Button variant="contained" onClick={handleSuccess}>Tới vòng quay</Button>
                <Button variant="outlined" color="warning" onClick={handleClose}>Đóng</Button>
            </DialogActions>
        </Dialog>
    )
}
