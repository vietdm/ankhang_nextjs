import { HrTag } from "@/components/ui/HrTag";
import { SinglePage } from "@/components/ui/SinglePage";
import { useUser } from "@/hooks/useUser";
import { Alert } from "@/libraries/alert";
import { fetch } from "@/libraries/axios";
import { Color } from "@/libraries/color";
import { formatMoney } from "@/utils";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AkgPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const [requesting, setRequesting] = useState<boolean>(false);
  const [pendingOtp, setPendingOtp] = useState<number>(0);

  const [histories, setHistories] = useState<any>([]);

  const [otpCode, setOtpCode] = useState<string>("");
  const [pointTransfer, setPointTransfer] = useState<number | null>(null);
  const [username, setUsername] = useState<string>("");

  const [canTransfer, setCanTransfer] = useState<boolean>(false);

  const sendOtp = () => {
    setRequesting(true);
    fetch.post("/user/otp/tranfer-akg").then((result: any) => {
      Alert.success(result.message);
      setRequesting(false);
      setPendingOtp(30);
    }).catch((error: any) => {
      Alert.error(error.message);
      setRequesting(false);
    });
  };

  const submitTransfer = () => {
    setRequesting(true);
    const data = {
      otp_code: otpCode,
      username,
      point_send: pointTransfer,
    };
    fetch.post("/user/money/transfer/akg", data).then((result: any) => {
      Alert.success(result.message);
      setTimeout(() => router.replace(router.asPath), 1000);
    }).catch((error: any) => {
      Alert.error(error.message);
      setRequesting(false);
    });
  };

  useEffect(() => {
    fetch.post("/user/history/transfer/akg").then((result: any) => {
      setHistories(result.histories);
    });
    fetch.post("/user/can/transfer-akg").then((result: any) => {
      setCanTransfer(result.can == "1");
    });
  }, []);

  useEffect(() => {
    if (pendingOtp == 0) return;
    setTimeout(() => setPendingOtp(pendingOtp - 1), 1000);
  }, [pendingOtp]);

  return (
    <SinglePage title="Điểm AKG">
      {user && (
        <Stack direction="row" width="90%" margin="1rem auto 0 auto" sx={{
          backgroundColor: "#e3e3e3",
          padding: "14px",
          borderRadius: "14px",
          background: "radial-gradient(#f4f9fd, #bae4f4)",
          boxShadow: "0 4px 4px 1px rgba(0, 0, 0, 0.2)",
        }}>
          <Stack width="80px" direction="row" justifyContent="center" alignItems="center">
            <Box position="relative" textAlign="center" height={80} width={80}>
              {user.level == "nomal" ? (
                <Box sx={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  top: 0,
                  left: 0,
                  backgroundImage: "url(\"/user.png\")",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  overflow: "hidden",
                  borderRadius: "50%",
                  zIndex: 8,
                  border: "7px solid " + (user.total_buy == 0 ? Color("new") : Color(user.level)),
                }} />
              ) : (
                <Box>
                  <img src={`/imgs/capbac/${user.level}_1.png`} alt="" style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                    overflow: "hidden",
                    borderRadius: "50%",
                    zIndex: 9,
                  }} />
                </Box>
              )}
            </Box>
          </Stack>
          <Box width="calc(100% - 80px)" paddingLeft={2}>
            <Typography component="h4" sx={{ fontSize: "22px" }} fontWeight="600">
              {user?.fullname}
            </Typography>
            <Typography component="h6" sx={{ fontSize: "16px" }} fontWeight="400">
              Điểm AKG: <b>{formatMoney(user.akg_point)}</b>
            </Typography>
            <Typography component="h6" sx={{ fontSize: "16px" }} fontWeight="400">
              Tổng giá trị: <b>{formatMoney(user.akg_money)}</b>
            </Typography>
            <Typography component="h6" sx={{ fontSize: "16px" }} fontWeight="400">
              Trạng thái:&nbsp;
              {user.total_buy >= 3000000 ? (
                <b style={{ color: "#6ab04c" }}>Đã đủ điều kiện nhận điểm AKG</b>
              ) : (
                <b style={{ color: "#eb4d4b" }}>Chưa đủ điều kiện nhận điểm AKG</b>
              )}
            </Typography>
          </Box>
        </Stack>
      )}
      <Box paddingY={3}>
        <Typography variant="h5" textAlign="center" fontWeight={700} color="#037bc1" textTransform="uppercase">Chuyển
          điểm</Typography>
      </Box>
      <Stack>
        <TextField
          size="small"
          id="username"
          label="Nhập mã người nhận"
          type="text"
          value={username}
          onChange={(e: any) => {
            setUsername(e.target.value);
          }}
          InputProps={{
            readOnly: requesting,
          }}
        />
        <HrTag p={2} />
        <TextField
          size="small"
          id="pointTransfer"
          label="Nhập số điểm chuyển"
          type="number"
          value={pointTransfer}
          onChange={(e: any) => {
            setPointTransfer(e.target.value);
          }}
          InputProps={{
            readOnly: requesting,
          }}
        />
        <HrTag p={2} />
        <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap">
          <TextField
            size="small"
            id="branch"
            label="Nhập mã OTP"
            value={otpCode}
            variant="outlined"
            sx={{ width: "calc(100% - 140px)" }}
            type="text"
            autoComplete="aaaaa"
            onChange={(e) => {
              setOtpCode(e.target.value);
            }}
            InputProps={{
              readOnly: requesting,
            }}
          />
          {pendingOtp === 0 ? (
            <Button variant="contained" disabled={requesting || !canTransfer} onClick={() => sendOtp()}>Lấy mã
              OTP</Button>
          ) : (
            <Typography component="span">{pendingOtp}s</Typography>
          )}
        </Stack>
        <Box textAlign="center" marginTop={3}>
          <Button variant="contained" color="primary" disabled={requesting || !canTransfer}
                  onClick={() => submitTransfer()}>Xác nhận</Button>
        </Box>
      </Stack>
      <Box paddingY={3}>
        <Typography variant="h5" textAlign="center" fontWeight={700} color="#037bc1" textTransform="uppercase">Lịch sử
          Chuyển điểm</Typography>
      </Box>
      {histories.map((history: any, index: number) => (
        <Box padding="15px" marginBottom={1} borderRadius="7px" border="5px solid green" key={index}>
          <Typography component="h5">Đến: {history.to_user?.username}</Typography>
          <Box paddingY={1}>
            <Box boxShadow="0 0 1px 0.5px rgba(0, 0, 0, 0.2)" />
          </Box>
          <Typography component="h5">Ngày gửi: {history.date_send}</Typography>
          <Box paddingY={1}>
            <Box boxShadow="0 0 1px 0.5px rgba(0, 0, 0, 0.2)" />
          </Box>
          <Typography component="h5">Số điểm: {history.point_send}</Typography>
        </Box>
      ))}
    </SinglePage>
  );
};

export default AkgPage;
