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
import { useEffect, useMemo, useRef, useState } from "react";

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
  gotoVerify: () => any;
  setUserId: (userId: number) => any;
};

export const Signup = ({ gotoVerify, setUserId }: Props) => {
  const router = useRouter();
  const [presentName, setPresentName] = useState<any>(null);
  const [requesting, setRequesting] = useState<boolean>(false);

  const debounceTimeoutRef = useRef<any>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit((data) => {
    setRequesting(true);
    fetch
      .post("auth/register", data)
      .then((response: any) => {
        setRequesting(false);
        setUserId(response.user_id);
        gotoVerify();
      })
      .catch((error: any) => {
        setRequesting(false);
        if (typeof error.message == 'undefined') {
          Alert.error(Object.values(error)[0] as string);
        } else {
          Alert.error(error.message);
        }
      });
  });

  const getPresentName = (phone: string) => {
    fetch.get('/present/name?phone=' + phone).then((result: any) => {
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
      fetch.post('/__/____', { username: router.query.r }).then((result: any) => {
        setValue('present_phone', result.phone);
        getPresentName(result.phone);
      }).catch(error => {
        Alert.error(error.message);
      })
    }
  }, [hasAffilate, router.query, setValue]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      clearTimeout(debounceTimeoutRef.current);
      if (name !== 'present_phone') return;
      debounceTimeoutRef.current = setTimeout(() => {
        getPresentName(value.present_phone ?? '');
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
        boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.2)",
        padding: "15px",
        borderRadius: "7px",
      }}
    >
      <form action="" autoComplete="none" onSubmit={onSubmit}>
        <Typography variant="subtitle1" fontWeight="bold" textAlign="center" marginBottom="1.25rem">
          Đăng Ký
        </Typography>
        {!hasAffilate && (
          <Typography
            component="p"
            mb={3}
            textAlign="center"
            color="#c0392b"
            fontWeight="700"
            fontStyle="italic"
          >
            Bạn chỉ có thể đăng ký khi truy cập bằng link giới thiệu!
          </Typography>
        )}
        <Stack direction="row" alignItems="center" marginBottom="1.25rem" flexWrap="wrap">
          <BadgeOutlinedIcon sx={{ width: "60px", color: "grey" }} />
          <TextField
            id="fullname"
            label="Họ và tên"
            variant="standard"
            sx={{ width: "calc(100% - 60px)" }}
            type="text"
            InputProps={{
              disabled: !hasAffilate
            }}
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
            InputProps={{
              disabled: !hasAffilate
            }}
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
            InputProps={{
              disabled: !hasAffilate
            }}
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
            InputProps={{
              disabled: !hasAffilate
            }}
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
            InputProps={{
              disabled: !hasAffilate
            }}
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
            InputProps={{
              disabled: !hasAffilate
            }}
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
            InputProps={{
              disabled: !hasAffilate
            }}
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
            InputProps={{
              disabled: !hasAffilate
            }}
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
          <Button variant="contained" type="submit" disabled={!hasAffilate || requesting}>
            Đăng Ký
          </Button>
        </Box>
      </form>
    </Box>
  );
};
