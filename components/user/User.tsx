import { useUser } from "@/hooks/useUser";
import { Storage } from "@/libraries/storage";
import { UserHelper } from "@/utils/helper/UserHelper";
import { Box, Typography, Stack } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import HistoryEduOutlinedIcon from '@mui/icons-material/HistoryEduOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Color } from "@/libraries/color";

export const UserComponent = ({ active = false }: { active?: boolean }) => {
  const router = useRouter();
  const { user } = useUser();
  const [copied, setCopied] = useState<boolean>(false);

  const Logout = () => {
    Storage.delete('_token');
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
    if (!user) return '';
    return window.location.origin + '/r/' + (user?.username || '');
  }, [user]);

  return (
    <Box display={active ? 'block' : 'none'}>
      <Stack direction="row" width="90%" margin="1rem auto 0 auto" sx={{
        backgroundColor: '#e3e3e3',
        padding: '14px',
        borderRadius: '14px',
        background: "radial-gradient(#f4f9fd, #bae4f4)",
        boxShadow: '0 4px 4px 1px rgba(0, 0, 0, 0.2)'
      }}>
        <Stack width="80px" direction="row" justifyContent="center" alignItems="center">
          {user && (
            <Box position="relative" textAlign="center" height={80} width={80}>
              {user.level == 'nomal' ? (
                <Box sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  top: 0,
                  left: 0,
                  backgroundImage: 'url("/user.png")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  overflow: 'hidden',
                  borderRadius: '50%',
                  zIndex: 8,
                  border: '7px solid ' + (user.total_buy == 0 ? Color.new : Color[user.level])
                }} />
              ) : (
                <Box>
                  <img src={`/imgs/capbac/${user.level}_1.png`} alt="" style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    overflow: 'hidden',
                    borderRadius: '50%',
                    zIndex: 9,
                  }} />
                </Box>
              )}
            </Box>
          )}
        </Stack>
        <Box width="calc(100% - 80px)">
          <Typography component="h4" textAlign="center" sx={{ fontSize: '22px' }} fontWeight="600">
            {user?.fullname}
          </Typography>
          <Typography component="h6" textAlign="center" sx={{ fontSize: '16px' }} fontWeight="400">
            Gói tham gia: <b style={{ textTransform: 'uppercase' }}>{user?.package_joined && UserHelper.getPackageName(user.package_joined)}</b>
          </Typography>
        </Box>
      </Stack>

      <Box marginTop={2}>
        <Box marginY={1}>
          <Typography component="p" textAlign="center" padding={1} marginX={5} onClick={() => copyAffilate(affilate)}>
            Link giới thiệu:
            <br />
            <span>{affilate}</span>
            <br />
            {affilate != '' && (
              <Typography
                component="span"
                color={copied ? "#27ae60" : "#1976d2"}
                fontWeight="700"
              >
                [{copied ? "Đã sao chép" : "Sao chép"}]
              </Typography>
            )}
          </Typography>
        </Box>
        <Link href='/user/edit' passHref>
          <Stack direction="row" justifyContent="space-between" paddingY={2} marginX={5} sx={{ borderBottom: '1px solid #3333' }}>
            <Stack direction="row">
              <AccountCircleOutlinedIcon sx={{ fill: "#5eaddb" }} />
              <Typography component="p" marginLeft={1}>Thông tin cá nhân</Typography>
            </Stack>
            <ArrowCircleRightOutlinedIcon />
          </Stack>
        </Link>
        <Link href='/user/tree' passHref>
          <Stack direction="row" justifyContent="space-between" paddingY={2} marginX={5} sx={{ borderBottom: '1px solid #3333' }}>
            <Stack direction="row">
              <GroupOutlinedIcon sx={{ fill: "#5eaddb" }} />
              <Typography component="p" marginLeft={1}>Quản lý đội nhóm</Typography>
            </Stack>
            <ArrowCircleRightOutlinedIcon />
          </Stack>
        </Link>
        <Link href='/akg' passHref>
          <Stack direction="row" justifyContent="space-between" paddingY={2} marginX={5} sx={{ borderBottom: '1px solid #3333' }}>
            <Stack direction="row">
              <QueryStatsOutlinedIcon sx={{ fill: "#5eaddb" }} />
              <Typography component="p" marginLeft={1}>Điểm AKG</Typography>
            </Stack>
            <ArrowCircleRightOutlinedIcon />
          </Stack>
        </Link>
        <Link href='/withdraw' passHref>
          <Stack direction="row" justifyContent="space-between" paddingY={2} marginX={5} sx={{ borderBottom: '1px solid #3333' }}>
            <Stack direction="row">
              <MonetizationOnOutlinedIcon sx={{ fill: "#5eaddb" }} />
              <Typography component="p" marginLeft={1}>Rút tiền</Typography>
            </Stack>
            <ArrowCircleRightOutlinedIcon />
          </Stack>
        </Link>
        <Link href='/order/history' passHref>
          <Stack direction="row" justifyContent="space-between" paddingY={2} marginX={5} sx={{ borderBottom: '1px solid #3333' }}>
            <Stack direction="row">
              <HistoryEduOutlinedIcon sx={{ fill: "#5eaddb" }} />
              <Typography component="p" marginLeft={1}>Lịch sử mua hàng</Typography>
            </Stack>
            <ArrowCircleRightOutlinedIcon />
          </Stack>
        </Link>
        <Link href='/money/history' passHref>
          <Stack direction="row" justifyContent="space-between" paddingY={2} marginX={5} sx={{ borderBottom: '1px solid #3333' }}>
            <Stack direction="row">
              <RequestQuoteOutlinedIcon sx={{ fill: "#5eaddb" }} />
              <Typography component="p" marginLeft={1}>Lịch sử giao dịch</Typography>
            </Stack>
            <ArrowCircleRightOutlinedIcon />
          </Stack>
        </Link>
        <Link href='/' passHref>
          <Stack direction="row" justifyContent="space-between" paddingY={2} marginX={5} sx={{ borderBottom: '1px solid #3333' }}>
            <Stack direction="row">
              <HelpOutlineOutlinedIcon sx={{ fill: "#5eaddb" }} />
              <Typography component="p" marginLeft={1}>Câu hỏi thường gặp</Typography>
            </Stack>
            <ArrowCircleRightOutlinedIcon />
          </Stack>
        </Link>
        <Stack direction="row" justifyContent="space-between" paddingY={2} marginX={5} onClick={() => Logout()}>
          <Stack direction="row">
            <LogoutOutlinedIcon sx={{ fill: "#5eaddb", transform: 'rotate(180deg)' }} />
            <Typography component="p" marginLeft={1} fontWeight="500">Đăng xuất</Typography>
          </Stack>
        </Stack>
      </Box>
    </Box >
  )
}
