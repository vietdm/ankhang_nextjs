import { useEffect,useState } from "react"
import { Box, Button, Stack,Typography } from "@mui/material"
import CartItemComponent from "@/components/ui/CartItemComponent"
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useRouter } from 'next/router'
import { getProductsList } from "../api/products";
import { deleteProductFromCart, saveCart, getCartDetail } from "@/utils/helper/cart";
import { CartItem, Product } from "../../interfaces/product";
import { Alert } from "@/libraries/alert";
const CartPage = ({products}: {products: Product[]})=>{
  const [cart, setCart] = useState<CartItem[]>([])
  const router = useRouter()
  useEffect( ()=>{
    handleGetCart();
  },[])
  const handleUpdate = ({quantity,id}: CartItem)=>{
    saveCart({quantity,id: id});
    Alert.success('Cập nhật giỏ hàng thành công!');
    handleGetCart();
  }
  const handleDelete = (id: number) => {
    deleteProductFromCart(id);
    Alert.success('Đã xóa sản phẩm khỏi giỏ hàng!');
    handleGetCart();
  }
  const handleGetCart = () => {
    let data = getCartDetail(products) ;
      setCart(data);
  }
  const handleBack = ()=>{
    router.back();
  }
  return (
    <Box height="100vh" maxHeight="100vh" minHeight="100vh" >
    <Stack
      direction="row"
      justifyContent="flex-start"
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
    </Stack>
    <Box height="calc(100% - 50px)" overflow="auto" width="90%" margin="auto">
      <Box>
        {cart?.map(item=>
          (<CartItemComponent key={item?.id} id={item?.id} product={item?.product} quantity={item?.quantity} onDelete={handleDelete} onUpdate={handleUpdate} />)
        )}
      </Box>
      {cart?.length > 0 && <Stack alignItems="center" marginY={2}>
        <Button variant="contained">
          Đặt hàng
        </Button>
      </Stack>}
    </Box>
  </Box>
  )
}

export async function getStaticProps() {
  const reponse = await getProductsList() as any;
  return {
      props:{products: reponse?.products}
  }
}

export default CartPage
