import { SinglePage } from "@/components/ui/SinglePage";
import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";
import HistoryEduOutlinedIcon from "@mui/icons-material/HistoryEduOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";

const UserPage = () => {
  return (
    <SinglePage title="Thông tin cá nhân">
      <Box paddingBottom={3}>
        <Link href="/order/history" passHref>
          <Stack direction="row" justifyContent="space-between" paddingY={2} sx={{ borderBottom: "1px solid #3333" }}>
            <Stack direction="row">
              <HistoryEduOutlinedIcon sx={{ fill: "#5eaddb" }} />
              <Typography component="p" marginLeft={1}>Thông tin cơ bản</Typography>
            </Stack>
            <ArrowCircleRightOutlinedIcon />
          </Stack>
        </Link>
        <Link href="/money/bonus" passHref>
          <Stack direction="row" justifyContent="space-between" paddingY={2} sx={{ borderBottom: "1px solid #3333" }}>
            <Stack direction="row">
              <HistoryEduOutlinedIcon sx={{ fill: "#5eaddb" }} />
              <Typography component="p" marginLeft={1}>Tài khoản ngân hàng</Typography>
            </Stack>
            <ArrowCircleRightOutlinedIcon />
          </Stack>
        </Link>
        <Link href="/money/withdraw" passHref>
          <Stack direction="row" justifyContent="space-between" paddingY={2} sx={{ borderBottom: "1px solid #3333" }}>
            <Stack direction="row">
              <HistoryEduOutlinedIcon sx={{ fill: "#5eaddb" }} />
              <Typography component="p" marginLeft={1}>Đổi mật khẩu</Typography>
            </Stack>
            <ArrowCircleRightOutlinedIcon />
          </Stack>
        </Link>
      </Box>
    </SinglePage>
  );
};

export default UserPage;
