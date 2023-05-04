import { Box,Typography,Stack,Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const UserComponent = ()=>{
  return (
    <>
      <Box position="relative" textAlign="center" height={140} width={140} sx={{margin: '24px auto'}} marginTop={6}>
        <Image fill alt={'avatar'}  objectFit="cover" src="/user.png" style={{borderRadius: '50%', margin:'0 auto'}} />
      </Box>
      <Box marginBottom={4}>
        <Typography component="h4" textAlign="center" sx={{fontSize: '22px'}} fontWeight="600">
          Username
        </Typography>
        <Box marginY={5}>
          <Link href='/' passHref>
            <Typography component="p" textAlign="center" marginY={1} sx={{borderBottom: '1px solid #3333'}} padding={1} marginX={5}>
              Chỉnh sửa thông tin
            </Typography>
          </Link>
          <Link href='/' passHref>
            <Typography component="p" textAlign="center" marginY={1} sx={{borderBottom: '1px solid #3333'}} padding={1} marginX={5}>
              Quên mật khẩu
            </Typography>
          </Link>
          <Link href='/' passHref>
            <Typography component="p" textAlign="center" marginY={1} padding={1} marginX={5}>
              Chính sách pháp lý
            </Typography>
          </Link>
        </Box>
      </Box>
      <Stack textAlign="center" sx={{margin: '48px auto'}} maxWidth={250}>
        <Button  variant="contained">Đăng xuất</Button>
      </Stack>
    </>
  )
}

export default UserComponent;
