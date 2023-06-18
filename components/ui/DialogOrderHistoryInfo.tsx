import { formatMoney } from "@/utils";
import { Alert, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { HrTag } from "./HrTag";

type Props = {
  open: boolean;
  onClose: () => void;
  history: any;
};
export const DialogOrderHistoryInfo = ({ open, onClose, history }: Props) => {
  if (!history) return <></>;
  return (
    <Dialog open={open} onClose={() => onClose()} PaperProps={{ sx: { paddingBottom: "15px" } }}>
      <DialogTitle textAlign="center">
        <Typography variant="h5" fontWeight={500}>Chi tiết lịch sử</Typography>
      </DialogTitle>
      <DialogContent sx={{ overflowY: "initial" }}>
        <Typography component="h3" fontWeight={600} textAlign="center">{history.product.title}</Typography>
        <HrTag p={1} />
        <Stack direction="row">
          <Typography component="span" minWidth="110px">Mã ĐH:&nbsp;</Typography>
          <Typography component="span" fontWeight={600}>{history.code}</Typography>
        </Stack>
        <HrTag p={1} />
        <Stack direction="row">
          <Typography component="span" minWidth="110px">Số lượng:&nbsp;</Typography>
          <Typography component="span" fontWeight={600}>{history.quantity}</Typography>
        </Stack>
        <HrTag p={1} />
        <Stack direction="row">
          <Typography component="span" minWidth="110px">Tổng giá:&nbsp;</Typography>
          <Typography component="span" fontWeight={600}>{formatMoney(history.total_price)}</Typography>
        </Stack>
        <HrTag p={1} />
        <Stack direction="row">
          <Typography component="span" minWidth="110px">Họ tên:&nbsp;</Typography>
          <Typography component="span" fontWeight={600}>{history.name}</Typography>
        </Stack>
        <HrTag p={1} />
        <Stack direction="row">
          <Typography component="span" minWidth="110px">SĐT:&nbsp;</Typography>
          <Typography component="span" fontWeight={600}>{history.phone}</Typography>
        </Stack>
        <HrTag p={1} />
        <Stack direction="row">
          <Typography component="span" minWidth="110px">Địa chỉ:&nbsp;</Typography>
          <Typography component="span" fontWeight={600}>{history.address}</Typography>
        </Stack>
        <HrTag p={1} />
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
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button variant="contained" color="secondary" onClick={() => onClose()}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
};
