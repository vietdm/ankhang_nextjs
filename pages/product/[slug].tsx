import { Box, Button, Stack, Typography } from "@mui/material";
import { DialogAddToCart } from "@/components/ui/DialogAddToCart";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from 'next/router'
import { getQuantityOfProduct, saveCart } from "@/utils/helper/cart";
import { fetch } from "@/libraries/axios";
import { SinglePage } from "@/components/ui/SinglePage";

const ProductPage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [product, setProduct] = useState<any>(null);
  const router = useRouter()
  const productId = router.query.slug;
  const [showFull, setShowFull] = useState<boolean>(false);

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

  const productDescription = useMemo(() => {
    if (!product?.description) return '';
    return showFull ? product.description : product.description.substring(0, 230) + '...';
  }, [showFull, product])

  return (
    <SinglePage title={product?.title}>
      <Typography variant="h6" marginY={1} textAlign="center">
        Chi tiết sản phẩm
      </Typography>
      <Box position="relative" minHeight={200} maxHeight={200} height={200} width="100%" marginY={1} sx={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url("${product?.images[0]}")`
      }} />
      <Box paddingBottom="40px" position="relative">
        <Typography component="p">
          {productDescription}
        </Typography>
        <Button variant="outlined" onClick={() => setShowFull(!showFull)} sx={{
          position: 'absolute',
          bottom: '5px',
          left: '50%',
          transform: 'translateX(-50%)',
          height: '30px'
        }}>{showFull ? 'Ẩn bớt' : 'Xem thêm'}</Button>
      </Box>
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
    </SinglePage>
  );
};

export default ProductPage;
