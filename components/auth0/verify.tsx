import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import { useRouter } from "next/router";
import { deleteCookie, hasCookie } from "cookies-next";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { fetch } from "@/libraries/axios";
import { ErrorMessage } from "@hookform/error-message";
import { Error } from "../ui/Error";
import { Alert } from "@/libraries/alert";

type Props = {
  gotoLogin: () => any;
  userId: number
};

type FormValues = {
  otp_code: string;
  user_id: number;
};

export const VerifyAccount = ({ gotoLogin, userId }: Props) => {
  const router = useRouter();
  const [requesting, setRequesting] = useState<boolean>(false);
  const [logined, setLogined] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(0);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    setValue('user_id', userId);
  }, [userId, setValue]);

  useEffect(() => {
    setLogined(hasCookie('_token'));
  }, []);

  useEffect(() => {
    if (countdown == 0) return;
    setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);
  }, [countdown]);

  const Logout = () => {
    deleteCookie('_token');
    Alert.success('Đăng xuất thành công!');
    gotoLogin();
  }

  const reSendOtp = () => {
    if (requesting) return;
    setRequesting(true);
    setCountdown(30);
    fetch.post('/auth/account/resend-otp', { user_id: userId }).then((response: any) => {
      Alert.success(response.message);
      setRequesting(false);
    }).catch((error: any) => {
      Alert.error(error.message);
      setRequesting(false);
    });
  }

  const onSubmit = handleSubmit((data) => {
    setRequesting(true);
    fetch
      .post("/auth/account/verify", data)
      .then((response: any) => {
        Alert.success(response.message);
        if (!logined) {
          gotoLogin();
        } else {
          router.push('/');
        }
      })
      .catch((error: any) => {
        setRequesting(false);
        Alert.error(error.message);
      });
  });

  return (
    <Box
      width="90%"
      sx={{
        margin: "auto",
        marginTop: "30px",
        boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.2)",
        padding: "15px",
        borderRadius: "7px",
      }}
    >
      <form action="" onSubmit={onSubmit}>
        <Typography variant="subtitle1" fontWeight="bold" textAlign="center" marginBottom="1.25rem">
          Nhập mã xác nhận
        </Typography>
        <Stack direction="row" alignItems="center" marginBottom="1.25rem" flexWrap="wrap">
          <PasswordOutlinedIcon sx={{ width: "60px", color: "grey" }} />
          <TextField
            id="otp_code"
            label="Mã xác nhận"
            variant="standard"
            sx={{ width: "calc(100% - 60px)" }}
            type="text"
            InputProps={{
              disabled: userId === 0
            }}
            role="presentation"
            {...register("otp_code", { required: "Hãy nhập mã xác nhận!" })}
          />
          <ErrorMessage errors={errors} name="otp_code" render={({ message }) => <Error mgs={message} />} />
        </Stack>
        <Stack direction="row" justifyContent="space-evenly">
          {logined ? (
            <Button variant="outlined" disabled={requesting} color="error" onClick={() => Logout()}>Đăng xuất</Button>
          ) : (
            <Button variant="outlined" disabled={requesting} color="warning" onClick={() => gotoLogin()}>Đăng nhập</Button>
          )}
          <Button variant="contained" disabled={requesting} type="submit">Xác nhận</Button>
        </Stack>
      </form>
      <Box marginBottom={2} marginTop={4} textAlign="center">
        <Typography component="p">
          Không nhận được mã? &nbsp;
          {countdown === 0 ? (
            <span style={{ color: '#63c3f0', fontWeight: 700 }} onClick={() => reSendOtp()}>Gửi lại mã</span>
          ) : (
            <span style={{ color: '#d32f2f' }}>Gửi lại sau {countdown}</span>
          )}
        </Typography>
      </Box>
    </Box>
  );
};
