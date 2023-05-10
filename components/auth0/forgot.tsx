import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import { useState } from "react";
import { fetch } from "@/libraries/axios";
import { Alert } from "@/libraries/alert";

export const ForgotPassword = ({ gotoLogin }: { gotoLogin: () => any }) => {
  const [phone, setPhone] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [tokenStep3, setTokenStep3] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [requesting, setRequesting] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);

  const submitForgotPassword = () => {
    setRequesting(true);
    fetch.post('auth/forgot', { phone }).then(result => {
      Alert.success(result.message);
      setRequesting(false);
      setStep(2);
    }).catch(error => {
      Alert.success(error?.message || "Lỗi không xác định");
      setRequesting(false);
    });
  }

  const submitConfirmToken = () => {
    setRequesting(true);
    fetch.post('auth/forgot/confirm', { phone, token }).then(result => {
      setRequesting(false);
      setStep(3);
      setTokenStep3(result.token);
    }).catch(error => {
      Alert.error(error?.message || "Lỗi không xác định");
      if (error?.step) {
        setStep(parseInt(error.step));
        setPhone('');
        setToken('');
      }
      setRequesting(false);
    });
  }

  const submitChangePassword = () => {
    setRequesting(true);
    fetch.post('auth/forgot/change', { token: tokenStep3, new_password: newPassword }).then(result => {
      setRequesting(false);
      Alert.success(result.message);
      gotoLogin();
    }).catch(error => {
      Alert.error(error?.message || "Lỗi không xác định");
      if (error?.step) {
        setStep(parseInt(error.step));
        setPhone('');
        setToken('');
      }
      setRequesting(false);
    });
  }

  return (
    <Box
      width="90%"
      sx={{
        margin: "auto",
        marginTop: "30px",
        boxShadow: "0 0 4px 1px rgba(0, 0, 0, 0.2)",
        padding: "15px",
        borderRadius: "7px",
      }}
    >
      <Typography variant="subtitle1" fontWeight="bold" textAlign="center" marginBottom="1.25rem">
        Quên mật khẩu
      </Typography>
      {step === 1 && (
        <>
          <Stack direction="row" alignItems="center" marginBottom="1.25rem" flexWrap="wrap">
            <PhoneAndroidOutlinedIcon sx={{ width: "60px", color: "grey" }} />
            <TextField
              id="phone"
              value={phone}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPhone(event.target.value);
              }}
              label="Số điện thoại hoặc email"
              variant="standard"
              sx={{ width: "calc(100% - 60px)" }}
              autoComplete="off"
            />
          </Stack>
          <Box textAlign="center">
            <Button disabled={requesting} variant="outlined" type="submit" sx={{ marginRight: '10px' }} onClick={() => gotoLogin()}>
              Đăng nhập
            </Button>
            <Button disabled={requesting} variant="contained" type="submit" onClick={submitForgotPassword}>
              Xác nhận
            </Button>
          </Box>
        </>
      )}
      {step === 2 && (
        <>
          <Stack direction="row" alignItems="center" marginBottom="1.25rem" flexWrap="wrap">
            <PasswordOutlinedIcon sx={{ width: "60px", color: "grey" }} />
            <TextField
              id="token"
              value={token}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setToken(event.target.value);
              }}
              label="Mã xác nhận"
              variant="standard"
              sx={{ width: "calc(100% - 60px)" }}
              autoComplete="off"
            />
          </Stack>
          <Box textAlign="center">
            <Button disabled={requesting} variant="contained" type="submit" onClick={submitConfirmToken}>
              Xác nhận
            </Button>
          </Box>
        </>
      )}
      {step === 3 && (
        <>
          <Stack direction="row" alignItems="center" marginBottom="1.25rem" flexWrap="wrap">
            <PasswordOutlinedIcon sx={{ width: "60px", color: "grey" }} />
            <TextField
              id="new_password"
              value={newPassword}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setNewPassword(event.target.value);
              }}
              label="Mật khẩu mới"
              variant="standard"
              sx={{ width: "calc(100% - 60px)" }}
              autoComplete="off"
            />
          </Stack>
          <Box textAlign="center">
            <Button disabled={requesting} variant="contained" type="submit" onClick={submitChangePassword}>
              Xác nhận
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};
