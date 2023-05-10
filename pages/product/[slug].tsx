import { Box, Button, Stack, Typography } from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { DialogAddToCart } from "@/components/ui/DialogAddToCart";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from 'next/router'
import { getQuantityOfProduct, saveCart } from "@/utils/helper/cart";
import { fetch } from "@/libraries/axios";
import { CartIcon } from "@/components/ui/CartIcon";

const ProductPage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [product, setProduct] = useState<any>(null);
  const router = useRouter()
  const productId = router.query.slug;

  const handleAddToCart = (quantity: number) => {
    saveCart({ quantity, id: product.id });
    setOpenModal(false);
    router.push('/cart');
  }

  useEffect(() => {
    if (!productId) return;
    fetch.get(`/product/${productId}`).then((result: any) => {
      setProduct(result.product);
    });
  }, [productId]);

  const quantityOfProduct = useMemo(() => {
    if (!product) return 0;
    return getQuantityOfProduct(product.id);
  }, [product]);

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
        <Box padding={1} onClick={() => router.back()}>
          <ArrowBackOutlinedIcon sx={{ color: "#fff" }} />
        </Box>
        <Typography component="h2" color="#fff">
          {product?.title}
        </Typography>
        <CartIcon />
      </Stack>
      <Stack height="calc(100% - 50px)" overflow="auto" width="90%" margin="auto">
        <Typography variant="h6" marginY={1} textAlign="center">
          Chi tiết sản phẩm
        </Typography>
        <Box position="relative" minHeight={200} maxHeight={200} height={200} width="100%" marginY={1} sx={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage: `url("${product?.images[0]}")`
        }} />
        <Typography component="p">
          {product?.description}
        </Typography>
        <hr style={{ margin: "15px 0" }} />
        <Stack>
          <Typography component="b" fontWeight="500">
            {product?.title}
          </Typography>
        </Stack>
        <Stack alignItems="flex-end">Giá bán: {product?.price.toLocaleString("en-US")} đ</Stack>
        <Stack alignItems="center" marginY={2}>
          <Button variant="contained" onClick={() => setOpenModal(true)}>
            Mua ngay
          </Button>
        </Stack>
        {product && (
          <DialogAddToCart
            open={openModal}
            onSubmit={handleAddToCart}
            onClose={() => {
              setOpenModal(false);
            }}
            name={product?.title}
            price={product?.price}
            quantityInp={quantityOfProduct}
          />
        )}
      </Stack>
    </Box>
  );
};

export default ProductPage;
