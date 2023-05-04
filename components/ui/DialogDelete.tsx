import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";

type Props = {
  open: boolean;
  onSubmit: () => void;
  onClose: () => void;
  name: string;
};
export const DialogDelete = ({ open, onSubmit, onClose, name }: Props) => {

  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle textAlign="center">{name}</DialogTitle>
        <DialogContent sx={{ overflowY: "initial" }}>
          <Typography textAlign="center" marginTop={2}>
            Xóa sản phẩm {name} khỏi giỏ hàng
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button onClick={handleClose}>Huỷ</Button>
          <Button onClick={onSubmit}>Đồng ý</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
