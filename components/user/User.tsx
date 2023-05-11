import { useUser } from "@/hooks/useUser";
import { UserHelper } from "@/utils/helper/UserHelper";
import { Box, Typography, Stack, Button } from "@mui/material";
import { deleteCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

export const UserComponent = () => {
  const router = useRouter();
  const { user } = useUser();
  const [copied, setCopied] = useState<boolean>(false);

  const Logout = () => {
    deleteCookie('_token');
    router.push('/auth0');
  }

  const copyAffilate = (value: string) => {
    const tempInput = document.createElement("input");
    tempInput.value = value;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  const affilate = useMemo(() => {
    return window.location.origin + '/auth0/?r=' + (user?.username || '');
  }, [user]);

  return (
    <>
      <Stack direction="row" width="90%" margin="1.5rem auto 0 auto" sx={{
        backgroundColor: '#e3e3e3',
        padding: '14px',
        borderRadius: '14px',
        background: "radial-gradient(#f4f9fd, #bae4f4)",
        boxShadow: '0 4px 4px 1px rgba(0, 0, 0, 0.2)'
      }}>
        <Stack width="80px" direction="row" justifyContent="center" alignItems="center">
          <Box position="relative" textAlign="center" height={80} width={80}>
            <Image fill alt={'avatar'} src="/user.png" style={{ borderRadius: '50%', margin: '0 auto' }} />
          </Box>
        </Stack>
        <Box width="calc(100% - 80px)">
          <Typography component="h4" textAlign="center" sx={{ fontSize: '22px' }} fontWeight="600">
            {user?.fullname}
          </Typography>
          <Typography component="h6" textAlign="center" sx={{ fontSize: '16px' }} fontWeight="400">
            Mã KH: <b>{user?.username}</b>
          </Typography>
          <Typography component="h6" textAlign="center" sx={{ fontSize: '16px' }} fontWeight="400">
            Gói tham gia: <b style={{ textTransform: 'uppercase' }}>{user?.package_joined && UserHelper.getPackageName(user.package_joined)}</b>
          </Typography>
        </Box>
      </Stack>

      <Box marginTop={2}>
        <Typography
          component="p"
          textAlign="center"
          marginY={1}
          sx={{ borderBottom: '1px solid #3333' }}
          padding={1}
          marginX={5}
          onClick={() => copyAffilate(affilate)}
        >
          Link giới thiệu:
          <br />
          <span>{affilate}</span>
          <br />
          <Typography component="p" color={copied ? "#27ae60" : "#1976d2"} fontWeight="700">[{copied ? "Đã sao chép" : "Sao chép"}]</Typography>
        </Typography>
        <Link href='/user/tree' passHref>
          <Typography component="p" textAlign="center" marginY={1} sx={{ borderBottom: '1px solid #3333' }} padding={1} marginX={5}>
            Xem đội nhóm
          </Typography>
        </Link>
        <Link href='/user/edit' passHref>
          <Typography component="p" textAlign="center" marginY={1} sx={{ borderBottom: '1px solid #3333' }} padding={1} marginX={5}>
            Thông tin cá nhân
          </Typography>
        </Link>
        <Link href='/withdraw' passHref>
          <Typography component="p" textAlign="center" marginY={1} sx={{ borderBottom: '1px solid #3333' }} padding={1} marginX={5}>
            Rút tiền
          </Typography>
        </Link>
        <Link href='/withdraw/history' passHref>
          <Typography component="p" textAlign="center" marginY={1} sx={{ borderBottom: '1px solid #3333' }} padding={1} marginX={5}>
            Lịch sử rút tiền
          </Typography>
        </Link>
        <Link href='/order/history' passHref>
          <Typography component="p" textAlign="center" marginY={1} sx={{ borderBottom: '1px solid #3333' }} padding={1} marginX={5}>
            Lịch sử mua hàng
          </Typography>
        </Link>
        <Link href='/' passHref>
          <Typography component="p" textAlign="center" marginY={1} sx={{ borderBottom: '1px solid #3333' }} padding={1} marginX={5}>
            Đổi mật khẩu
          </Typography>
        </Link>
        <Link href='/' passHref>
          <Typography component="p" textAlign="center" marginY={1} padding={1} marginX={5}>
            Chính sách pháp lý
          </Typography>
        </Link>
      </Box>
      <Stack textAlign="center" sx={{ margin: '10px auto 80px auto' }} maxWidth={250}>
        <Button variant="contained" onClick={() => Logout()}>Đăng xuất</Button>
      </Stack>
    </>
  )
}
