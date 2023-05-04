import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  onSubmit: (quantity: number) => void;
  onClose: () => void;
  name: string;
  price: number;
  quantityInp?: number;
};
export const DialogAddToCart = ({ open, onSubmit, onClose, name, price,quantityInp=1 }: Props) => {
  const [quantity, setQuantity] = useState<number>(quantityInp);
  const [priceTemp, setPriceTemp] = useState<number>(price);
  const handleClose = () => {
    onClose();
  };

  const minusQuantity = () => {
    if (quantity == 1) return;
    setQuantity(quantity - 1);
  };

  const addQuantity = () => {
    setQuantity(quantity + 1);
  };

  useEffect(() => {
    setPriceTemp(price * quantity);
  }, [quantity]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle textAlign="center">{name}</DialogTitle>
        <DialogContent sx={{ overflowY: "initial" }}>
          <Stack direction="row">
            <Box padding={1} onClick={() => minusQuantity()}>
              <RemoveOutlinedIcon />
            </Box>
            <TextField
              id="quantity"
              label="Số lượng"
              type="number"
              value={quantity}
              InputProps={{
                readOnly: true,
              }}
              inputProps={{
                sx: {
                  textAlign: "center",
                },
              }}
            />
            <Box padding={1} onClick={() => addQuantity()}>
              <AddOutlinedIcon />
            </Box>
          </Stack>
          <Typography textAlign="center" marginTop={2}>
            {priceTemp.toLocaleString("en-US")}đ
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button onClick={handleClose}>Huỷ</Button>
          <Button onClick={()=> onSubmit(quantity)}>Đồng ý</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
