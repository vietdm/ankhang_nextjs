import { useEffect, useMemo, useState } from "react";
import { clearCart, getCart } from "@/utils/helper/cart";
import { SinglePage } from "@/components/ui/SinglePage";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { useUser } from "@/hooks/useUser";
import { getProductsList } from "../api/products";
import { formatMoney } from "@/utils";
import { HrTag } from "@/components/ui/HrTag";
import { Alert } from "@/libraries/alert";
import { useRouter } from "next/router";
import { v4 as uuid } from "uuid";
import { fetch } from "@/libraries/axios";
import { useDebounce } from "@/hooks/useDebounce";

type TimeCountdown = { m: number, s: number };
const defaultTimeCountdown = { m: 10, s: 0 };

const CartPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const debounce = useDebounce();
  const [carts, setCarts] = useState<any>([]);
  const [totalPriceCart, setTotalPriceCart] = useState<number>(0);
  const [moneyPays, setMoneyPays] = useState<number>(0);
  const [address, setAddress] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [payment, setPayment] = useState<string>('bank');
  const [modalOpen, setModalOpen] = useState<string>('');
  const [timeCountdown, setTimeCountdown] = useState<TimeCountdown>(defaultTimeCountdown);
  const [imageUpload, setImageUpload] = useState<any>(null);
  const [urlPreviewImage, setUrlPreviewImage] = useState<any>('');
  const [requesting, setRequesting] = useState<boolean>(false);
  const [pointSelect, setPointSelect] = useState<string>('');
  const [conditionSelectPoint, setConditionSelectPoint] = useState<any>(null)

  let intervalTimeCountdown: any = null;

  useEffect(() => {
    const init = async () => {
      const cart = getCart();

      if (cart.length == 0) {
        Alert.error('Chưa có đơn hàng nào được chọn. Hãy vào cửa hàng mua sắm nhé!');
        setTimeout(() => router.push('/store'), 1000);
        return;
      }

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
    if (modalOpen !== 'bank') {
      clearInterval(intervalTimeCountdown);
      return;
    }
    intervalTimeCountdown = setInterval(() => {
      if (timeCountdown.s > 0) {
        timeCountdown.s = timeCountdown.s - 1;
        setTimeCountdown({ ...timeCountdown });
        return;
      }
      if (timeCountdown.m > 0) {
        timeCountdown.m = timeCountdown.m - 1;
        timeCountdown.s = 59;
        setTimeCountdown({ ...timeCountdown });
        return;
      }
      clearCart();
      clearInterval(intervalTimeCountdown);
      setModalOpen('');
      Alert.error('Đơn hàng đã bị hủy!', () => {
        router.push('/');
      });
    }, 1000);

    return () => {
      clearInterval(intervalTimeCountdown);
    };
  }, [modalOpen]);

  useEffect(() => {
    if (imageUpload == null) {
      setUrlPreviewImage('');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e: any) => {
      setUrlPreviewImage(e.target.result);
    }
    reader.readAsDataURL(imageUpload);
  }, [imageUpload]);

  useEffect(() => {
    if (payment === 'point') {
      setMoneyPays(totalPriceCart);
    }
  }, [payment]);

  useEffect(() => {
    debounce(() => {
      fetch.post('user/point/check', { price: moneyPays }).then((result: any) => {
        setConditionSelectPoint(result);
      });
    }, 500);
  }, [moneyPays]);

  const openModalBank = () => {
    setTimeCountdown(defaultTimeCountdown);
    if (payment == 'point') {
      setModalOpen('point');
    } else {
      setModalOpen('bank');
    }
  }

  const qrCode = useMemo(() => {
    if (totalPriceCart <= 0 || !user) return '';
    const newUuid = uuid().split('-')[0];
    const data = [
      `amount=${totalPriceCart}`,
      `addInfo=${user.username} ${newUuid}`,
      'accountName=CTCP%20TM%20VA%20DV%20AN%20KHANG%20GROUP'
    ];
    const url = `https://img.vietqr.io/image/mbbank-866682826666-11sAiww.png?${data.join('&')}`;
    return (
      <img src={url} alt="QR Code" style={{
        width: '100%',
        maxWidth: '460px'
      }} />
    );
  }, [totalPriceCart, user]);

  const gotoUploadImageBank = () => {
    if (moneyPays < totalPriceCart) {
      return Alert.error('Số tiền thanh toán phải lớn hơn hoặc bằng giá trị của đơn hàng!');
    }
    openModalBank();
  }

  const handleChangeImageUpload = (event: any) => {
    const files = event.target.files;
    if (files.length == 0) {
      setImageUpload(null);
    } else {
      setImageUpload(files[0]);
    }
  }

  const submitOrder = () => {
    if (!user) return;
    if (imageUpload == null) {
      return Alert.error('Cần chọn ảnh xác nhận thanh toán trước khi Đặt Hàng!');
    }
    setRequesting(true);

    const cart = getCart();
    const formData = new FormData;
    formData.append('image', imageUpload);
    formData.append('order', JSON.stringify(cart));
    formData.append('user_id', String(user.id));
    formData.append('name', user.fullname);
    formData.append('phone', user.phone);
    formData.append('address', address);
    formData.append('note', note);
    formData.append('total_price_pay', String(moneyPays));

    fetch({
      method: "post",
      url: "order",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then(() => {
      Alert.success('Đặt hàng thành công!');
      clearCart();
      setTimeout(() => router.push('/'), 1000);
    }).catch((error: any) => {
      Alert.error(error.message);
      setRequesting(false);
    })
  }

  const submitOrderWithPointPay = () => {
    if (!user) return;
    if (pointSelect == '') {
      return Alert.error('Phải chọn 1 loại điểm thanh toán!');
    }
    setRequesting(true);

    const cart = getCart();
    const formData = new FormData;
    formData.append('point_type', pointSelect);
    formData.append('order', JSON.stringify(cart));
    formData.append('user_id', String(user.id));
    formData.append('name', user.fullname);
    formData.append('phone', user.phone);
    formData.append('address', address);
    formData.append('note', note);

    fetch({
      method: "post",
      url: "order",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    }).then(() => {
      Alert.success('Đặt hàng thành công!');
      clearCart();
      setTimeout(() => router.push('/'), 1000);
    }).catch((error: any) => {
      Alert.error(error.message);
      setRequesting(false);
    })
  }

  const BoxSelectPoint = (props: {
    children: any,
    disabled?: boolean,
    active?: boolean,
    onClick?: any
  }) => {
    const { children, disabled = false, active = false, onClick = null } = props;
    const sxDisabled = !disabled ? {} : {
      cursor: 'not-allowed',
      opacity: '0.5',
      background: 'rgba(0, 0, 0, 0.1)'
    };
    const sxActive = !active ? {} : {
      background: 'rgb(0 142 255 / 31%)'
    }
    return (
      <Box
        onClick={() => typeof onClick == 'function' && !disabled ? onClick() : null}
        sx={{
          borderRadius: '24px',
          padding: '14px 22px',
          border: '1px solid grey',
          margin: '10px 0',
          cursor: 'pointer',
          ...sxDisabled,
          ...sxActive
        }}
      >
        {children}
      </Box>
    )
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
            disabled={payment !== 'bank'}
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
        <Button variant="contained" sx={{ width: '200px' }} onClick={gotoUploadImageBank} disabled={requesting}>Thanh toán</Button>
      </Stack>

      {/* Dialog */}
      <Dialog open={modalOpen == 'bank'} sx={{ '.MuiDialog-container': { alignItems: 'flex-start' } }} PaperProps={{ sx: { margin: 1 } }}>
        <DialogContent sx={{ padding: '20px 6px' }}>
          <Box textAlign="center">
            <Typography component="h4">Quý khách vui lòng quét mã và thanh toán trong vòng 10 phút.</Typography>
            <Typography component="h4">Sau 10 phút, mã sẽ tự động bị hủy.</Typography>
            <Typography component="p" fontSize="16px">
              Thời gian thanh toán:&nbsp;
              <b>{timeCountdown.m < 10 ? '0' + timeCountdown.m : timeCountdown.m}</b>
              <b>:</b>
              <b>{timeCountdown.s < 10 ? '0' + timeCountdown.s : timeCountdown.s}</b>
            </Typography>
          </Box>
          <Box textAlign="center">{qrCode}</Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="secondary" disabled={requesting} onClick={() => setModalOpen('')}>Hủy</Button>
          <Button variant="contained" color="primary" disabled={requesting} onClick={() => setModalOpen('upload')}>Xác nhận thanh toán</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={modalOpen == 'upload'} sx={{ '.MuiDialog-container': { alignItems: 'flex-start' } }} PaperProps={{ sx: { margin: 1 } }}>
        <DialogContent>
          <Typography component="b" fontSize="22px" fontWeight="700" textAlign="center">Tải lên hình ảnh thanh toán</Typography>
          <Box textAlign="center">
            <input
              type="file"
              accept="image/png, image/gif, image/jpeg, image/jpg"
              onChange={handleChangeImageUpload}
              style={{
                display: 'block',
                width: '100%',
                padding: '.375rem .75rem',
                fontSize: '1rem',
                fontWeight: 400,
                lineHeight: 1.5,
                color: '#495057',
                backgroundColor: '#fff',
                backgroundClip: 'padding-box',
                border: '1px solid #ced4da',
                borderRadius: '.25rem',
                transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
                fontFamily: '"Mulish", sans-serif'
              }}
            />
            {urlPreviewImage != '' && (
              <img src={urlPreviewImage} alt="Preview" style={{
                width: '90%',
                maxWidth: '460px',
                marginTop: '.5rem'
              }} />
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button variant="contained" color="secondary" disabled={requesting} onClick={() => setModalOpen('')}>Hủy</Button>
          <Button variant="contained" color="primary" disabled={requesting} onClick={() => submitOrder()}>Đặt hàng</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={modalOpen == 'point'} sx={{ '.MuiDialog-container': { alignItems: 'flex-start' } }} PaperProps={{ sx: { margin: 1, width: '100%' } }}>
        <DialogContent>
          <Typography component="div" fontSize="22px" fontWeight="700" textAlign="center">Thanh toán bằng điểm</Typography>
          <Box textAlign="center">
            <BoxSelectPoint
              disabled={!conditionSelectPoint || conditionSelectPoint.cashback.allow == '0'}
              active={pointSelect === 'cashback'}
              onClick={() => setPointSelect('cashback')}
            >
              Điểm CASHBACK: {formatMoney(conditionSelectPoint?.cashback.point ?? 0)}
            </BoxSelectPoint>
            <BoxSelectPoint
              disabled={!conditionSelectPoint || conditionSelectPoint.reward.allow == '0'}
              active={pointSelect === 'reward'}
              onClick={() => setPointSelect('reward')}
            >
              Điểm thưởng: {formatMoney(conditionSelectPoint?.reward.point ?? 0)}
            </BoxSelectPoint>
            <BoxSelectPoint
              disabled={!conditionSelectPoint || conditionSelectPoint.product.allow == '0'}
              active={pointSelect === 'product'}
              onClick={() => setPointSelect('product')}
            >
              Điểm mua hàng: {formatMoney(conditionSelectPoint?.product.point ?? 0)}
            </BoxSelectPoint>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="secondary"
            disabled={requesting}
            onClick={() => {
              setModalOpen('');
              setPointSelect('');
            }}
          >
            Hủy
          </Button>
          <Button variant="contained" color="primary" disabled={requesting} onClick={() => submitOrderWithPointPay()}>Đặt hàng</Button>
        </DialogActions>
      </Dialog>
    </SinglePage >
  );
}

export default CartPage;
