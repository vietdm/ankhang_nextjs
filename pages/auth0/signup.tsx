import { AuthLayout } from "@/components/auth0/layout";
import { Alert } from "@/libraries/alert";
import { fetch } from "@/libraries/axios";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import Diversity1OutlinedIcon from "@mui/icons-material/Diversity1Outlined";
import { ErrorMessage } from "@hookform/error-message";
import { Error } from "@/components/ui/Error";
import Link from "next/link";

type FormValues = {
  username: string;
  phone: string;
  present_code: string;
  password: string;
};

const SignupPage = () => {
  const router = useRouter();
  const [requesting, setRequesting] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit((data) => {
    setRequesting(true);
    fetch
      .post("auth/register", data)
      .then((response: any) => {
        setRequesting(false);
        Alert.success(response.message);
        setTimeout(() => router.push("/auth0/login"), 1000);
      })
      .catch((error: any) => {
        setRequesting(false);
        if (typeof error.message == "undefined") {
          Alert.error(Object.values(error)[0] as string);
        } else {
          Alert.error(error.message);
        }
      });
  });

  const hasAffilate = useMemo(() => {
    return !!router.query?.r;
  }, [router.query]);

  useEffect(() => {
    if (hasAffilate) {
      const username = router.query.r as string;
      setValue("present_code", username);
    }
  }, [hasAffilate]);

  return (
    <AuthLayout title="Đăng ký tài khoản">
      <Box paddingY="15px">
        <form action="" autoComplete="none" onSubmit={onSubmit}>
          <Stack direction="row" alignItems="center" marginBottom="1.25rem" flexWrap="wrap">
            <Diversity1OutlinedIcon sx={{ width: "60px", color: "grey" }} />
            <TextField
              id="present_code"
              label="Mã giới thiệu"
              variant="standard"
              sx={{ width: "calc(100% - 60px)" }}
              type="text"
              InputLabelProps={hasAffilate ? { shrink: true } : {}}
              InputProps={{
                disabled: hasAffilate,
              }}
              role="presentation"
              {...register("present_code", { required: "Hãy nhập mã giới thiệu!" })}
            />
            <ErrorMessage errors={errors} name="present_code" render={({ message }) => <Error mgs={message} />} />
          </Stack>
          <Stack direction="row" alignItems="center" marginBottom="1.25rem" flexWrap="wrap">
            <Person2OutlinedIcon sx={{ width: "60px", color: "grey" }} />
            <TextField
              id="username"
              label="Username"
              variant="standard"
              sx={{ width: "calc(100% - 60px)" }}
              type="text"
              role="presentation"
              {...register("username", { required: "Username không được trống!" })}
            />
            <ErrorMessage errors={errors} name="username" render={({ message }) => <Error mgs={message} />} />
          </Stack>
          <Stack direction="row" alignItems="center" marginBottom="1.25rem" flexWrap="wrap">
            <PhoneAndroidOutlinedIcon sx={{ width: "60px", color: "grey" }} />
            <TextField
              id="phone"
              label="Số điện thoại"
              variant="standard"
              sx={{ width: "calc(100% - 60px)" }}
              type="number"
              role="presentation"
              {...register("phone", { required: "Số điện thoại không được trống!" })}
            />
            <ErrorMessage errors={errors} name="phone" render={({ message }) => <Error mgs={message} />} />
          </Stack>
          <Stack direction="row" alignItems="center" marginBottom="1.25rem" flexWrap="wrap">
            <PasswordOutlinedIcon sx={{ width: "60px", color: "grey" }} />
            <TextField
              id="password"
              label="Mật khẩu"
              variant="standard"
              sx={{ width: "calc(100% - 60px)" }}
              role="presentation"
              {...register("password", { required: "Hãy nhập mật khẩu!" })}
            />
            <ErrorMessage errors={errors} name="password" render={({ message }) => <Error mgs={message} />} />
          </Stack>
          <Box textAlign="center">
            <Button variant="contained" type="submit" disabled={requesting}>
              Đăng Ký
            </Button>
          </Box>
        </form>
        <Stack direction="row" justifyContent="center" marginY={3}>
          <Typography component="p">Đã có tài khoản?&nbsp;&nbsp;</Typography>
          <Link passHref href="/auth0/login">
            <Typography component="span" color="#097bc1" fontWeight={700}>Đăng nhập</Typography>
          </Link>
        </Stack>
      </Box>
    </AuthLayout>
  );
};

export default SignupPage;
