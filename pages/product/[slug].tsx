import { Box, Button, Stack, Typography } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { DialogAddToCart } from "@/components/ui/DialogAddToCart";
import { useState } from "react";
import { useRouter } from 'next/router'
import Link from "next/link";
import Image from "next/image";
import {  getQuantityOfProduct, saveCart } from "@/utils/helper/cart";
import { Product } from "../../interfaces/product";
import { getProductDetail } from "../api/products";
import { Alert } from "@/libraries/alert";

const ProductPage = ({product}:{product: Product}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const router = useRouter()
  const handleAddToCart = (quantity: number)=>{
    saveCart({quantity,id: product.id});
    Alert.success('Đã thêm sản phẩm vào giỏ hàng!');
    setOpenModal(false);
  }
  
  const handleBack = ()=>{
    router.back();
  }
  return (
    <Box height="100vh" maxHeight="100vh" minHeight="100vh">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        height="50px"
        width="100%"
        sx={{ background: "#0984e3" }}
      >
        <Box padding={1} onClick={handleBack}>
          <ArrowBackOutlinedIcon sx={{ color: "#fff" }} />
        </Box>
        <Typography component="h2" color="#fff">
          {product?.title}
        </Typography>
        <Box padding={1}>
          <Link href="/cart" passHref>
          <ShoppingCartOutlinedIcon sx={{ color: "#fff" }} />
          </Link>
        </Box>
      </Stack>
      <Stack height="calc(100% - 50px)" overflow="auto" width="90%" margin="auto">
        <Typography variant="h6" marginY={1} textAlign="center">
          Chi tiết sản phẩm
        </Typography>
        <Box position="relative" maxHeight={200} height={140} width="100%" marginY={1}>
          <Image fill alt={product?.title ?? ''}  objectFit="cover" src={`${typeof(product?.images) === 'string' ? JSON.parse(product?.images)[0] : product?.images[0]}`} />
        </Box>
        <Typography component="p">
        {product?.description}
        </Typography>
        <hr style={{ margin: "15px 0" }} />
        <Stack>
          <Typography component="b" fontWeight="500">
          {product?.title}
          </Typography>
        </Stack>
        <Stack alignItems="flex-end">Giá bán: {product?.price.toLocaleString("en-US")}đ</Stack>
        <Stack alignItems="center" marginY={2}>
          <Button variant="contained" onClick={() => setOpenModal(true)}>
            Thêm vào giỏ hàng
          </Button>
        </Stack>
        <DialogAddToCart
          open={openModal}
          onSubmit={handleAddToCart}
          onClose={() => {
            setOpenModal(false);
          }}
          name={product?.title}
          price={product.price}
          quantityInp={getQuantityOfProduct(product.id)}
        />
      </Stack>
    </Box>
  );
};


export async function getServerSideProps(context: any) {
  const slug= Number(context.params?.slug ?? 1);
  const response = await getProductDetail(slug) as any;
  return {
      props:{product: response?.product ?? {}},
  }
}

export default ProductPage;
