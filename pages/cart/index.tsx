import { useEffect, useState } from "react"
import { Box, Button, Stack, Typography } from "@mui/material"
import CartItemComponent from "@/components/ui/CartItemComponent"
import { useRouter } from 'next/router'
import { getProductsList } from "../api/products";
import { deleteProductFromCart, saveCart, getCartDetail, getCart } from "@/utils/helper/cart";
import { CartItem, Product } from "../../interfaces/product";
import { Alert } from "@/libraries/alert";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { SinglePage } from "@/components/ui/SinglePage";

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

  const buildUriCartTrade = () => {
    const token = getCookie('_token');
    const cart = getCart();
    return `token=${token}&carts=${JSON.stringify(cart)}`;
  }

  return (
    <SinglePage title="Giỏ hàng" hasHomeIcon={true}>
      <Box height="calc(100% - 90px)" overflow="auto" width="90%" margin="auto">
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
    </SinglePage>
  )
}

export async function getStaticProps() {
  const reponse = await getProductsList() as any;
  return {
    props: { products: reponse?.products }
  }
}

export default CartPage
