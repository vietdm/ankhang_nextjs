import { AuthLayout } from "@/components/auth0/layout";
import { Alert } from "@/libraries/alert";
import { fetch } from "@/libraries/axios";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import { ErrorMessage } from "@hookform/error-message";
import { Error } from "@/components/ui/Error";
import { Storage } from "@/libraries/storage";

type FormValues = {
  otp_code: string;
  user_id: number;
};

const VerifyPage = () => {
  const router = useRouter();
  const [requesting, setRequesting] = useState<boolean>(false);
  const [logined, setLogined] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(0);

  const userId: number | null = useMemo(() => {
    if (router.query?.user_id) {
      return parseInt(router.query?.user_id as string);
    }
    return null;
  }, [router.query]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const isSignup = useMemo(() => {
    return router.query?.is_signup == "1";
  }, [router.query]);

  useEffect(() => {
    if (userId) {
      setValue("user_id", userId);
      if (!isSignup) {
        reSendOtp();
      }
    }
  }, [userId, setValue]);

  useEffect(() => {
    setLogined(Storage.has("_token"));
  }, []);

  useEffect(() => {
    if (countdown == 0) return;
    setTimeout(() => setCountdown(countdown - 1), 1000);
  }, [countdown]);

  const Logout = () => {
    Storage.delete("_token");
    Alert.success("Đăng xuất thành công!");
    router.push("/auth0/login");
  };

  const reSendOtp = () => {
    if (requesting) return;
    setRequesting(true);
    setCountdown(30);
    fetch.post("/auth/account/resend-otp", { user_id: userId }).then((response: any) => {
      Alert.success(response.message);
      setRequesting(false);
    }).catch((error: any) => {
      Alert.error(error.message);
      setRequesting(false);
    });
  };

  const onSubmit = handleSubmit((data) => {
    setRequesting(true);
    fetch
      .post("/auth/account/verify", data)
      .then((response: any) => {
        Alert.success(response.message);
        if (!logined) {
          router.push("/auth0/login");
        } else {
          router.push("/");
        }
      })
      .catch((error: any) => {
        setRequesting(false);
        Alert.error(error.message);
      });
  });

  return (
    <AuthLayout title="Xác nhận tài khoản">
      <Box paddingY={3}>
        <form action="" onSubmit={onSubmit}>
          <Typography component="p" textAlign="center" fontStyle="italic">
            Kiểm tra email để lấy mã xác nhận!
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
                disabled: userId === 0,
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
              <Button variant="outlined" disabled={requesting} color="warning"
                      onClick={() => router.push("/auth0/login")}>Đăng nhập</Button>
            )}
            <Button variant="contained" disabled={requesting} type="submit">Xác nhận</Button>
          </Stack>
        </form>
        {!isSignup && (
          <Box marginBottom={2} marginTop={4} textAlign="center">
            <Typography component="p">
              Không nhận được mã? &nbsp;
              {countdown === 0 ? (
                <span style={{ color: "#63c3f0", fontWeight: 700 }} onClick={() => reSendOtp()}>Gửi lại mã</span>
              ) : (
                <span style={{ color: "#d32f2f" }}>Gửi lại sau {countdown}</span>
              )}
            </Typography>
          </Box>
        )}
      </Box>
    </AuthLayout>
  );
};

export default VerifyPage;
