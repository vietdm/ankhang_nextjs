import { useEffect, useState } from "react";
import { getCart } from "@/utils/helper/cart";
import { SinglePage } from "@/components/ui/SinglePage";
import { Box, Button, Dialog, DialogActions, DialogContent, FormControlLabel, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import { useUser } from "@/hooks/useUser";
import { getProductsList } from "../api/products";
import { formatMoney } from "@/utils";
import { HrTag } from "@/components/ui/HrTag";
import { Alert } from "@/libraries/alert";

const CartPage = () => {
  const { user } = useUser();
  const [carts, setCarts] = useState<any>([]);
  const [totalPriceCart, setTotalPriceCart] = useState<number>(0);
  const [moneyPays, setMoneyPays] = useState<number>(0);
  const [address, setAddress] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [payment, setPayment] = useState<string>('bank');
  const [modalOpen, setModalOpen] = useState<string>('');

  useEffect(() => {
    const init = async () => {
      const cart = getCart();
      const resultGetProductList: any = await getProductsList();
      const { products } = resultGetProductList;

      let totalPrice = 0;
      for (const index in cart) {
        const productIndex = products.findIndex((x: any) => x.id == cart[index].id);
        const product = products[productIndex];
        cart[index].product = product;
        totalPrice += cart[index].quantity * product.price;
      }

      setCarts(cart);
      setTotalPriceCart(totalPrice);
      setMoneyPays(totalPrice);
    }
    init();
  }, []);

  useEffect(() => {
    if (!user) return;
    setAddress(user.address);
  }, [user]);

  useEffect(() => {
    console.log("payment", payment)
  }, [payment]);

  const qrCode = () => {
    return `https://img.vietqr.io/image/mbbank-866682826666-11sAiww.jpg?amount=${totalPriceCart}&addInfo=${user?.username}&accountName=CTCP%20TM%20VA%20DV%20AN%20KHANG%20GROUP`;
  }

  const submitOrder = () => {
    if (moneyPays < totalPriceCart) {
      return Alert.error('Số tiền thanh toán phải lớn hơn hoặc bằng giá trị của đơn hàng!');
    }
    setModalOpen('bank');
  }

  return (
    <SinglePage title="Giỏ hàng">
      <Typography component="h2" fontWeight="700" my={2} textAlign="center" fontSize='20px'>Thông tin đặt hàng</Typography>
      <Box>
        {carts.map((cart: any, index: number) => (
          <Stack key={index} direction="row">
            <Box
              sx={{
                width: '120px',
                height: '100px',
                borderRadius: '7px',
                overflow: 'hidden',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url("${cart.product.images[0]}")`
              }}
            />
            <Box pl={1} width="calc(100% - 120px)">
              <Typography variant="body2" fontWeight='600'>{cart.product.title}</Typography>
              <Typography component="p">Số lượng: {cart.quantity}</Typography>
              <Typography component="p">Đơn giá: {formatMoney(cart.product.price)} đ</Typography>
              <Typography component="p">Thành tiền: {formatMoney(cart.quantity * cart.product.price)} đ</Typography>
            </Box>
          </Stack>
        ))}
      </Box>
      <HrTag p={2} />
      <Typography component="h2" fontWeight="700" mb={2} textAlign="center" fontSize='20px'>Thông tin thanh toán</Typography>
      <Stack direction="row" justifyContent="space-between">
        <Typography component="p" fontWeight="600" fontSize="18px">Tổng tiền:</Typography>
        <Typography component="p" fontSize="18px">{formatMoney(totalPriceCart)} đ</Typography>
      </Stack>
      <Typography component="p" fontWeight="600" fontSize="18px">Số tiền muốn thanh toán:</Typography>
      <Typography component="i" fontSize="16px">
        * Nếu số tiền thanh toán lớn hơn giá trị đơn hàng, phần thừa sẽ được cộng vào điểm mua hàng. Điểm mua hàng có thể sử dụng để mua sản phẩm.
      </Typography>
      {totalPriceCart > 0 && (
        <Box mt={2}>
          <TextField
            label="Sô tiền thanh toán"
            variant="outlined"
            size="small"
            type="number"
            value={moneyPays}
            sx={{ width: "100%" }}
            onFocus={(event) => {
              event.target.select();
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setMoneyPays(parseInt(event.target.value));
            }}
          />
          <Typography component="i" fontSize="14px" pl={2}>{formatMoney(moneyPays)}</Typography>
        </Box>
      )}
      <HrTag p={2} />
      <Typography component="h2" fontWeight="700" mb={2} textAlign="center" fontSize='20px'>Thông tin nhận hàng</Typography>
      <Box mb={1}>
        <Typography component="p" fontSize="18px">Họ và tên:</Typography>
        <TextField
          variant="outlined"
          size="small"
          value={user?.fullname ?? ""}
          sx={{ width: "100%" }}
          disabled
        />
      </Box>
      <Box mb={1}>
        <Typography component="p" fontSize="18px">Số điện thoại:</Typography>
        <TextField
          variant="outlined"
          size="small"
          value={user?.phone ?? ""}
          sx={{ width: "100%" }}
          disabled
        />
      </Box>
      <Box mb={1}>
        <Typography component="p" fontSize="18px">Địa chỉ nhận hàng:</Typography>
        <TextField
          variant="outlined"
          size="small"
          value={address}
          sx={{ width: "100%" }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setAddress(event.target.value);
          }}
        />
      </Box>
      <Box mb={1}>
        <Typography component="p" fontSize="18px">Ghi chú:</Typography>
        <TextField
          multiline
          size="small"
          rows={4}
          sx={{ width: "100%" }}
          value={note}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setNote(event.target.value);
          }}
        />
      </Box>
      <HrTag p={2} />
      <Typography component="h2" fontWeight="700" mb={2} textAlign="center" fontSize='20px'>Phương thức thanh toán</Typography>
      <Box>
        <RadioGroup
          row
          value={payment}
          name="payment_method"
          sx={{ justifyContent: 'center' }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPayment(event.target.value);
          }}
        >
          <FormControlLabel value="bank" control={<Radio />} label="Chuyển khoản" />
          <FormControlLabel value="point" control={<Radio />} label="Đổi điểm" />
        </RadioGroup>
      </Box>
      <HrTag p={2} />
      <Stack alignItems="center">
        <Button variant="contained" sx={{ width: '200px' }} onClick={submitOrder}>Thanh toán</Button>
      </Stack>

      {/* Dialog */}
      <Dialog open={modalOpen == 'bank'} PaperProps={{ sx: { margin: 1 } }}>
        <DialogContent>
          <Box textAlign="center">
            <Typography component="h4">Quý khách vui lòng quét mã và thanh toán trong vòng 10 phút.</Typography>
            <Typography component="h4">Sau 10 phút, mã sẽ tự động bị hủy.</Typography>
          </Box>
          <Box></Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen('')}>Disagree</Button>
          <Button onClick={() => setModalOpen('')}>Agree</Button>
        </DialogActions>
      </Dialog>
    </SinglePage>
  );
}

export default CartPage;
