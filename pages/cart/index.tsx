import { useEffect, useState } from "react"
import { Box, Button, Stack, Typography } from "@mui/material"
import CartItemComponent from "@/components/ui/CartItemComponent"
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useRouter } from 'next/router'
import { getProductsList } from "../api/products";
import { deleteProductFromCart, saveCart, getCartDetail, getCart } from "@/utils/helper/cart";
import { CartItem, Product } from "../../interfaces/product";
import { Alert } from "@/libraries/alert";
import Link from "next/link";
import { getCookie } from "cookies-next";

const CartPage = ({ products }: { products: Product[] }) => {
  const [cart, setCart] = useState<CartItem[]>([])
  const router = useRouter()

  useEffect(() => {
    handleGetCart();
  }, []);

  useEffect(() => {
    if (cart.length == 0 || router.query?.redirect == '0') return;
    router.push("/cart0/trade.html?" + buildUriCartTrade());
  }, [cart]);

  const handleUpdate = ({ quantity, id }: CartItem) => {
    saveCart({ quantity, id: id });
    Alert.success('Cập nhật giỏ hàng thành công!');
    handleGetCart();
  }
  const handleDelete = (id: number) => {
    deleteProductFromCart(id);
    Alert.success('Đã xóa sản phẩm khỏi giỏ hàng!');
    handleGetCart();
  }
  const handleGetCart = () => {
    let data = getCartDetail(products);
    setCart(data);
  }

  const handleBack = () => {
    router.back();
  }

  const buildUriCartTrade = () => {
    const token = getCookie('_token');
    const cart = getCart();
    return `token=${token}&carts=${JSON.stringify(cart)}`;
  }

  return (
    <Box height="100vh" maxHeight="100vh" minHeight="100vh" >
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
          Giỏ Hàng
        </Typography>
        <Box padding={1} onClick={() => router.push('/')}>
          <HomeOutlinedIcon sx={{ color: "#fff" }} />
        </Box>
      </Stack>
      <Box height="calc(100% - 50px)" overflow="auto" width="90%" margin="auto">
        <Box>
          {cart?.map(item =>
            (<CartItemComponent key={item?.id} id={item?.id} product={item?.product} quantity={item?.quantity} onDelete={handleDelete} onUpdate={handleUpdate} />)
          )}
          {cart.length == 0 && <Typography textAlign="center" component="p" marginTop={2}>Không có sản phẩm nào trong giỏ hàng</Typography>}
        </Box>
        {cart?.length > 0 && <Stack alignItems="center" marginY={2}>
          <Link href={"/cart0/trade.html?" + buildUriCartTrade()}>
            <Button variant="contained">
              Đặt hàng
            </Button>
          </Link>
        </Stack>}
      </Box>
    </Box>
  )
}

export async function getStaticProps() {
  const reponse = await getProductsList() as any;
  return {
    props: { products: reponse?.products }
  }
}

export default CartPage
