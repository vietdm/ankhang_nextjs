import { useUser } from "@/hooks/useUser";
import { userLevel } from "@/utils";
import { Box, Typography, Stack, Button } from "@mui/material";
import { deleteCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export const UserComponent = () => {
  const router = useRouter();
  const { user } = useUser();

  const Logout = () => {
    deleteCookie('_token');
    router.push('/auth0');
  }

  return (
    <>
      <Box position="relative" textAlign="center" height={140} width={140} sx={{ margin: '24px auto' }} marginTop={6}>
        <Image fill alt={'avatar'} src="/user.png" style={{ borderRadius: '50%', margin: '0 auto' }} />
      </Box>
      <Box marginBottom={4}>
        <Typography component="h4" textAlign="center" sx={{ fontSize: '22px' }} fontWeight="600">
          {user?.fullname}
        </Typography>
        <Typography component="h6" textAlign="center" sx={{ fontSize: '16px' }} fontWeight="400">
          Cấp bậc: <b>{userLevel(user?.level)}</b>
        </Typography>
        <Box marginY={5}>
          <Link href='/user/tree' passHref>
            <Typography component="p" textAlign="center" marginY={1} sx={{ borderBottom: '1px solid #3333' }} padding={1} marginX={5}>
              Xem sơ đồ user
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
