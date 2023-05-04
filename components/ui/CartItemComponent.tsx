import { Button, Stack , Box, Typography} from "@mui/material";
import Image from "next/image";
import { useState,useEffect } from "react";
import { DialogAddToCart } from "./DialogAddToCart";
import { DialogDelete } from "./DialogDelete";
import { CartItem, Product } from "@/interfaces/product";
type CartItemComponentProps= {
  quantity: number;
  id: number;
  product?: Product;
  onDelete: (id: number)=> void;
  onUpdate: (data: CartItem)=> void;
}
const CartItemComponent = ({id,quantity,product,onDelete,onUpdate}:CartItemComponentProps)=>{
  const [open, setOpen] = useState<boolean>(false);
  const [typeModal, setTypeModal] = useState<'delete'|'update'>();
  const handleOpenModal = (type: 'delete'|'update')=>{
    setTypeModal(type);
    setOpen(true);
  }
  const handleCloseModal = ()=>{
    setOpen(false);
  }
  const handleSubmit = (quantity:number)=>{
    onUpdate({quantity, id});
    handleCloseModal();
  }
  return (
    <Box style={{borderBottom: "2px solid #3333", padding: '12px 0'}}>
    <Stack  direction="row"
    justifyContent="space-between"
    alignItems="center">
    <Image width={120} height={120} alt={product?.title ?? ''} src={`${typeof(product?.images) === 'string' ? JSON.parse(product?.images)[0] : product?.images[0]}`} />
    <Box sx={{padding: '12px'}} textAlign="center" flexGrow={1}>
      <Typography component="b" textAlign="center" fontWeight="600" sx={{fontSize: '16px'}}>
        {product?.title}
      </Typography>
        <Typography component="p" textAlign="center" sx={{fontSize: '14px'}}>
         Số lượng: {quantity}
        </Typography>
        <Typography component="p" textAlign="center" sx={{fontSize: '14px'}}>
         Đơn giá: {((product?.price ?? 1) * quantity).toLocaleString("en-US")} đ
        </Typography>
    </Box>
    <Stack alignItems="center" marginY={2}>
      <Button variant="contained" onClick={() => handleOpenModal('update')} sx={{borderRadius: '16px', margin: '4px 0'}}>
        Sửa
      </Button>
      <Button variant="contained" onClick={() => handleOpenModal('delete')}  color="warning" sx={{borderRadius: '16px', margin: '4px 0'}}>
        Xóa
    </Button>
  </Stack>
  <DialogAddToCart
    open={open && typeModal === 'update'}
    onSubmit={handleSubmit}
    onClose={handleCloseModal}
    name={product?.title ?? ""}
    price={product?.price ?? 0}
    quantityInp={quantity}
  />
    <DialogDelete
    open={open && typeModal === 'delete'}
    onSubmit={() => onDelete(id)}
    onClose={handleCloseModal}
    name={product?.title ?? ''}
  />
    </Stack>
    </Box>
  )
}

export default CartItemComponent;
