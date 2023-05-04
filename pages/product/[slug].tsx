import { Box, Button, Stack, Typography } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { DialogAddToCart } from "@/components/ui/DialogAddToCart";
import { useState } from "react";
import { Product, getProductDetail, saveCart } from "../api/products";
import { GetStaticPaths } from "next";
import { useRouter } from 'next/router'
import Link from "next/link";

const ProductPage = ({product}:{product: Product}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const router = useRouter()
  const handleAddToCart = (quantity: number)=>{
    saveCart({quantity,id: product.id});
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
        <Box textAlign="center">
          <img src={typeof(product?.images) === 'string' ? JSON.parse(product?.images)[0] : product?.images[0]} alt={product?.title} width="100%" />
        </Box>
        <Typography component="div" marginTop={1} dangerouslySetInnerHTML={{__html: product?.description}}></Typography>
        <hr style={{ margin: "15px 0" }} />
        <Stack>
          <Typography component="b" fontWeight="500">
          {product?.title}
          </Typography>
        </Stack>
        <Stack alignItems="flex-end">Giá bán: {product?.price}đ</Stack>
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
        />
      </Stack>
    </Box>
  );
};


export async function getServerSideProps(context: any) {
  const slug= Number(context.params?.slug ?? 1);
  const data = await getProductDetail(slug) as Product;
  return {
      props:{product: data},
  }
}


export default ProductPage;
