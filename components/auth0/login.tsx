import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import { useForm } from "react-hook-form";
import { fetch } from "@/libraries/axios";
import { Alert } from "@/libraries/alert";
import { Error } from "@/components/ui/Error";
import { ErrorMessage } from "@hookform/error-message";
import { setCookies } from "cookies-next";
import { useRouter } from "next/router";

type FormValues = {
  phone: string;
  password: string;
};

export const Login = ({ gotoForgot }: { gotoForgot: () => void }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit((data) => {
    fetch
      .post("auth/login", data)
      .then((response) => {
        Alert.success(response.message);
        setCookies('_token', response.token);
        router.push('/');
      })
      .catch((error) => {
        Alert.error(error.message);
      });
  });

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
      <form action="" onSubmit={onSubmit}>
        <Typography variant="subtitle1" fontWeight="bold" textAlign="center" marginBottom="1.25rem">
          Đăng Nhập
        </Typography>
        <Stack direction="row" alignItems="center" marginBottom="1.25rem" flexWrap="wrap">
          <PhoneAndroidOutlinedIcon sx={{ width: "60px", color: "grey" }} />
          <TextField
            id="phone"
            label="Số điện thoại"
            variant="standard"
            sx={{ width: "calc(100% - 60px)" }}
            type="number"
            autoComplete="off"
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
            type="password"
            {...register("password", { required: "Hãy nhập mật khẩu!" })}
          />
          <ErrorMessage errors={errors} name="password" render={({ message }) => <Error mgs={message} />} />
        </Stack>
        <Box textAlign="center">
          <Button variant="contained" type="submit">
            Đăng nhập
          </Button>
          <Typography component="p" marginTop={3} fontStyle='italic' fontSize="17px" onClick={() => gotoForgot()}>Quên mật khẩu</Typography>
        </Box>
      </form>
    </Box>
  );
};
