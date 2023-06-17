import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import { useEffect, useState } from "react";
import { saveCart } from "@/utils/helper/cart";
import { useRouter } from "next/router";
import { formatMoney } from "@/utils";
import { useUser } from "@/hooks/useUser";
import { Alert } from "@/libraries/alert";

type Props = {
  product: any,
  menuActive: string,
  onChangeQuantity: any,
};

export const BoxProductSimple = ({ product, menuActive, onChangeQuantity }: Props) => {
  const [quantity, setQuantity] = useState<number>(0);
  const [priceTemp, setPriceTemp] = useState<number>(0);
  const [itemProductInRow, setItemProductInRow] = useState<number>(2);
  const router = useRouter();
  const { user } = useUser();

  const isOption = menuActive == "option";

  const minusQuantity = () => {
    if (quantity == 0) return;
    setQuantity(quantity - 1);
  };

  const addQuantity = () => {
    setQuantity(quantity + 1);
  };

  const onAddToCart = () => {
    if (!user) {
      Alert.error("Cần đăng nhập mới có thể mua hàng!");
      return;
    }
    if (!user.fullname || !user.email) {
      Alert.error("Bạn cần cập nhật đầy đủ họ tên và email mới có thể mua hàng!");
      setTimeout(() => router.push("/user/edit"), 500);
      return;
    }
    saveCart({ quantity, id: product.id });
    router.push("/checkout");
  };

  useEffect(() => {
    setPriceTemp(product.price * quantity);
    onChangeQuantity(quantity, product.id);
  }, [quantity]);

  useEffect(() => {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 576) return setItemProductInRow(2);
    if (windowWidth <= 768) return setItemProductInRow(3);
    return setItemProductInRow(4);
  }, []);

  return (
    <Box width={`calc(100% / ${itemProductInRow})`} padding="5px" marginBottom={2}>
      <Link passHref href={`/product/${product.id}`}>
        <Box position="relative" width="100%">
          <img alt={product.title} src={product.images[0]} style={{ width: "100%" }} />
        </Box>
        <i style={{ textAlign: "center", display: "block" }}>Giá bán: {formatMoney(product.price)}</i>
        <Typography component="p" textAlign="center" fontSize="16px">
          {product.title}
        </Typography>
        <Typography component="p" textAlign="center" color="#0984e3">
          {priceTemp.toLocaleString("en-US")} đ
        </Typography>
      </Link>
      <Stack direction="row" justifyContent="center" marginY={1}>
        <Stack justifyContent="center" onClick={() => minusQuantity()}>
          <RemoveCircleOutlineOutlinedIcon sx={{ height: "100%", fill: "grey", marginRight: "5px" }} />
        </Stack>
        <TextField
          id="quantity"
          type="number"
          value={quantity}
          InputProps={{
            readOnly: true,
          }}
          inputProps={{
            sx: {
              textAlign: "center",
              padding: "4px 0px",
              width: "60px",
            },
          }}
        />
        <Stack justifyContent="center" onClick={() => addQuantity()}>
          <AddCircleOutlineOutlinedIcon sx={{ height: "100%", fill: "grey", marginLeft: "5px" }} />
        </Stack>
      </Stack>
      {!isOption && (
        <Box sx={{ textAlign: "center", marginTop: "4px" }}>
          <Button variant="contained" color="info" onClick={() => onAddToCart()} disabled={quantity == 0}>Mua
            ngay</Button>
        </Box>
      )}
    </Box>
  );
};
