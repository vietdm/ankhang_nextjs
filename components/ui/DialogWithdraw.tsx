import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { formatMoney } from "@/utils";

type Props = {
  open: boolean;
  moneyCanWithdraw: number;
  requesting: boolean;
  onSubmit: (money: number) => void;
  onClose: () => void;
};
export const DialogWithdraw = ({ open, onSubmit, onClose, moneyCanWithdraw, requesting }: Props) => {
  const [money, setMoney] = useState<number | null>(null);

  const handleClose = () => {
    setMoney(null);
    onClose();
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle textAlign="center">
          <Typography component="h4">Rút tiền</Typography>
        </DialogTitle>
        <DialogContent sx={{ overflowY: "initial" }}>
          <Stack>
            <TextField
              id="quantity"
              label="Số tiền muốn rút"
              type="number"
              value={money}
              onChange={(e: any) => {
                setMoney(parseInt(e.target.value));
              }}
            />
            <Box marginTop={2}>
              <Typography component="p">Số tiền có thể rút:</Typography>
              <Typography component="p" textAlign="right"><b>{formatMoney(moneyCanWithdraw)}</b></Typography>
            </Box>
            <Box marginTop={2}>
              <Typography component="p">Số tiền đang muốn rút:</Typography>
              <Typography component="p" textAlign="right"><b>{formatMoney(money)}</b></Typography>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button variant="contained" disabled={requesting} color="error" onClick={handleClose}>Huỷ</Button>
          <Button variant="contained" disabled={requesting} onClick={() => onSubmit(money ?? 0)}>Đồng ý</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
