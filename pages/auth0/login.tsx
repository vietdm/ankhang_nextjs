import { AuthLayout } from "@/components/auth0/layout";
import { Alert } from "@/libraries/alert";
import { fetch } from "@/libraries/axios";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { setCookies } from "cookies-next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import { ErrorMessage } from "@hookform/error-message";
import { Error } from "@/components/ui/Error";
import Link from "next/link";

type FormValues = {
    phone: string;
    password: string;
};

const LoginPage = () => {

    const router = useRouter();
    const [isRequesting, setIsRequesting] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const onSubmit = handleSubmit((data) => {
        setIsRequesting(true);
        fetch
            .post("auth/login", data)
            .then((response: any) => {
                Alert.success(response.message);
                setCookies('_token', response.token);
                if (response.verified == '1') {
                    router.push('/');
                } else {
                    router.push('/auth0/verify?user_id=' + response.user_id);
                }
            })
            .catch((error) => {
                Alert.error(error.message);
                setIsRequesting(false);
            });
    });


    return (
        <AuthLayout>
            <Box paddingY={3}>
                <form action="" onSubmit={onSubmit}>
                    <Stack direction="row" alignItems="center" marginBottom="1.25rem" flexWrap="wrap">
                        <PhoneAndroidOutlinedIcon sx={{ width: "60px", color: "grey" }} />
                        <TextField
                            id="phone"
                            label="Username hoặc Số điện thoại"
                            variant="standard"
                            sx={{ width: "calc(100% - 60px)" }}
                            autoComplete="off"
                            {...register("phone", { required: "Thông tin này không được trống!" })}
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
                    <Stack direction="row" justifyContent="end" marginBottom={3}>
                        <Link passHref href="/auth0/forgot">
                            <Typography
                                component="p"
                                fontStyle='italic'
                                fontSize="17px"
                                color="#097bc1"
                            >
                                Quên mật khẩu?
                            </Typography>
                        </Link>
                    </Stack>
                    <Box textAlign="center">
                        <Button variant="contained" type="submit" disabled={isRequesting}>
                            Đăng nhập
                        </Button>
                    </Box>
                    <Stack direction="row" justifyContent="center" marginTop={3}>
                        <Typography component="p">Chưa có tài khoản?&nbsp;&nbsp;</Typography>
                        <Link passHref href="/auth0/signup">
                            <Typography component="span" color="#097bc1" fontWeight={700}>Đăng ký</Typography>
                        </Link>
                    </Stack>
                </form>
            </Box>
        </AuthLayout>
    )
}

export default LoginPage;
