import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Error } from "@/components/ui/Error";
import { fetch } from "@/libraries/axios";
import { Alert } from "@/libraries/alert";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

type FormValues = {
  fullname: string;
  email: string;
  cccd: string;
  username: string;
  phone: string;
  present_phone: string;
  password: string;
  repassword: string;
};

type Props = {
  gotoLogin: () => void;
};

export const Signup = ({ gotoLogin }: Props) => {
  const [presentName, setPresentName] = useState<any>(null);
  const router = useRouter();

  let debounceTimeout: any = null;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit((data) => {
    fetch
      .post("auth/register", data)
      .then((response) => {
        Alert.success(response["message"]);
        gotoLogin();
      })
      .catch((error) => {
        Alert.error(error.message);
      });
  });

  const getPresentName = (phone) => {
    fetch.get('/present/name?phone=' + phone).then(result => {
      setPresentName(result.name);
    }).catch(() => {
      setPresentName(null);
    })
  };

  const hasAffilate = useMemo(() => {
    return !!router.query?.r;
  }, [router.query]);

  useEffect(() => {
    if (hasAffilate) {
      setValue('present_phone', router.query.r);
      getPresentName(router.query.r);
    }
  }, [hasAffilate]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      clearTimeout(debounceTimeout);
      if (name != 'present_phone') return;
      debounceTimeout = setTimeout(() => {
        getPresentName(value.present_phone);
      }, 300);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

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
      <form action="" autoComplete="none" onSubmit={onSubmit}>
        <Typography variant="subtitle1" fontWeight="bold" textAlign="center" marginBottom="1.25rem">
          Đăng Ký
        </Typography>
        <Stack direction="row" alignItems="center" marginBottom="1.25rem" flexWrap="wrap">
          <BadgeOutlinedIcon sx={{ width: "60px", color: "grey" }} />
          <TextField
            id="fullname"
            label="Họ và tên"
            variant="standard"
            sx={{ width: "calc(100% - 60px)" }}
            type="text"
            role="presentation"
            {...register("fullname", { required: "Họ và tên không được trống!" })}
          />
          <ErrorMessage errors={errors} name="fullname" render={({ message }) => <Error mgs={message} />} />
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
          <EmailOutlinedIcon sx={{ width: "60px", color: "grey" }} />
          <TextField
            id="email"
            label="Email"
            variant="standard"
            sx={{ width: "calc(100% - 60px)" }}
            type="text"
            role="presentation"
            {...register("email", { required: "Email không được trống!" })}
          />
          <ErrorMessage errors={errors} name="email" render={({ message }) => <Error mgs={message} />} />
        </Stack>
        <Stack direction="row" alignItems="center" marginBottom="1.25rem" flexWrap="wrap">
          <BadgeOutlinedIcon sx={{ width: "60px", color: "grey" }} />
          <TextField
            id="cccd"
            label="Số CMT/CCCD"
            variant="standard"
            sx={{ width: "calc(100% - 60px)" }}
            type="text"
            role="presentation"
            {...register("cccd", { required: "Số CMT/CCCD là bắt buộc!" })}
          />
          <ErrorMessage errors={errors} name="cccd" render={({ message }) => <Error mgs={message} />} />
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
        <Stack direction="row" alignItems="center" marginBottom="1.25rem" flexWrap="wrap" display={hasAffilate ? 'none' : 'flex'}>
          <PhoneAndroidOutlinedIcon sx={{ width: "60px", color: "grey" }} />
          <TextField
            id="present_phone"
            label="Số điện thoại người giới thiệu"
            variant="standard"
            sx={{ width: "calc(100% - 60px)" }}
            type="number"
            role="presentation"
            {...register("present_phone", { required: "Hãy nhập số điện thoại người giới thiệu!" })}
          />
          {presentName && <Box width="100%" textAlign="center" marginTop={1}>{presentName}</Box>}
          <ErrorMessage errors={errors} name="present_phone" render={({ message }) => <Error mgs={message} />} />
        </Stack>
        <Stack direction="row" alignItems="center" marginBottom="1.25rem" flexWrap="wrap">
          <PasswordOutlinedIcon sx={{ width: "60px", color: "grey" }} />
          <TextField
            id="password"
            label="Mật khẩu"
            variant="standard"
            sx={{ width: "calc(100% - 60px)" }}
            type="password"
            role="presentation"
            {...register("password", { required: "Hãy nhập mật khẩu!" })}
          />
          <ErrorMessage errors={errors} name="password" render={({ message }) => <Error mgs={message} />} />
        </Stack>
        <Stack direction="row" alignItems="center" marginBottom="1.25rem" flexWrap="wrap">
          <PasswordOutlinedIcon sx={{ width: "60px", color: "grey" }} />
          <TextField
            id="repassword"
            label="Nhập lại mật khẩu"
            variant="standard"
            sx={{ width: "calc(100% - 60px)" }}
            type="password"
            role="presentation"
            {...register("repassword", {
              required: "Hãy nhập lại mật khẩu!",
              validate: (val: string) => {
                if (watch("password") != val) {
                  return "Mật khẩu không khớp";
                }
              },
            })}
          />
          <ErrorMessage errors={errors} name="repassword" render={({ message }) => <Error mgs={message} />} />
        </Stack>
        <Box textAlign="center">
          <Button variant="contained" type="submit">
            Đăng Ký
          </Button>
        </Box>
      </form>
    </Box>
  );
};
