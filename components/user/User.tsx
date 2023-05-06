import { useUser } from "@/hooks/useUser";
import { Alert } from "@/libraries/alert";
import { userLevel } from "@/utils";
import { Box, Typography, Stack, Button } from "@mui/material";
import { deleteCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";

export const UserComponent = () => {
  const router = useRouter();
  const { user } = useUser();

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
    Alert.success('Đã sao chép');
  }

  const affilate = useMemo(() => {
    return window.location.origin + '/auth0/?r=' + user?.username;
  }, [user]);

  return (
    <>
      <Stack direction="row" width="90%" margin="2.5rem auto 0 auto" sx={{
        backgroundColor: '#e3e3e3',
        padding: '14px',
        borderRadius: '14px'
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
            Mã KH: {user?.phone}
          </Typography>
          <Typography component="h6" textAlign="center" sx={{ fontSize: '16px' }} fontWeight="400">
            Điểm thưởng: {user?.akg_point}
          </Typography>
        </Box>
      </Stack>

      <Box marginBottom={4}>
        <Box marginY={5}>
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
          </Typography>
          <Link href='/user/tree' passHref>
            <Typography component="p" textAlign="center" marginY={1} sx={{ borderBottom: '1px solid #3333' }} padding={1} marginX={5}>
              Xem đội nhóm
            </Typography>
          </Link>
          <Link href='/' passHref>
            <Typography component="p" textAlign="center" marginY={1} sx={{ borderBottom: '1px solid #3333' }} padding={1} marginX={5}>
              Chỉnh sửa thông tin
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
      </Box>
      <Stack textAlign="center" sx={{ margin: '48px auto' }} maxWidth={250}>
        <Button variant="contained" onClick={() => Logout()}>Đăng xuất</Button>
      </Stack>
    </>
  )
}
