import { HrTag } from "@/components/ui/HrTag";
import { SinglePage } from "@/components/ui/SinglePage";
import { Alert } from "@/libraries/alert";
import { fetch } from "@/libraries/axios";
import { formatMoney } from "@/utils";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import { useRouter } from "next/router";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { createCapcha, sendOtpSms } from "@/hooks/firebase";

const WithdrawPage = () => {
    const [appVerifier, setAppVerifier] = useState<any>(null);
    const [resultSendOtp, setResultSendOtp] = useState<any>(null);
    const [moneyCanWithdraw, setMoneyCanWithdraw] = useState<number>(0);
    const [money, setMoney] = useState<number | null>(null);
    const [requesting, setRequesting] = useState<boolean>(true);
    const [bankInfo, setBankInfo] = useState<any>({
        account_number: 'loading..',
        bank_name: 'loading..',
        branch: 'loading..',
    });
    const [otpCode, setOtpCode] = useState<string>('');
    const router = useRouter();
    const { user } = useUser();

    const sendWithdrawRequest = () => {
        if (!money) return;
        setRequesting(true);
        fetch.post('/user/withdraw', { money, otp_code: otpCode }).then((result: any) => {
            Alert.success(result.message);
            setRequesting(false);
            router.push('/withdraw/history');
        }).catch((error) => {
            Alert.error(error.message);
            setRequesting(false);
        });
    }

    const sendOtp = () => {
        setRequesting(true);
        // fetch.post('/user/otp/withdraw').then((result: any) => {
        //     Alert.success(result.message);
        //     setRequesting(false);
        // }).catch((error: any) => {
        //     Alert.error(error.message);
        //     setRequesting(false);
        // })
        sendOtpSms('+84329012526', appVerifier).then((sendOtpResult) => {
            setResultSendOtp(sendOtpResult);
        });
    }

    useEffect(() => {
        fetch.post('/user/get_money_can_withdraw').then((result: any) => {
            const moneyResult = parseInt(result.money);
            setMoneyCanWithdraw(moneyResult < 0 ? 0 : moneyResult);
        });
        fetch.get('/user/bank').then((response: any) => {
            const bankInfo = response.bank_info;
            setBankInfo(bankInfo);
            if (bankInfo == null) {
                setRequesting(true);
            }
        });
        const verifier = createCapcha('recaptcha-container', () => {
            setRequesting(false);
        });
        setAppVerifier(verifier);
    }, []);

    return (
        <SinglePage title="Rút tiền">
            <Stack marginTop={3}>
                {bankInfo == null && (
                    <Box marginBottom={4}>
                        <Typography
                            component="h4"
                            textAlign="center"
                            fontSize="16px"
                            color="#e74c3c"
                            fontStyle="italic"
                        >
                            Bạn cần vào cập nhật <b>Thông tin Ngân hàng</b> trong phần <b>Cập nhật thông tin cá nhân</b> mới có thể rút tiền
                        </Typography>
                        <Link passHref href="/user/edit?backhome=1">
                            <Typography textAlign="center" paddingTop={1} color="#3498db">Bấm vào đây để đến cập nhật thông tin</Typography>
                        </Link>
                    </Box>
                )}
                <TextField
                    id="money"
                    label="Nhập số tiền rút"
                    type="number"
                    value={money ?? ''}
                    onChange={(e: any) => {
                        setMoney(e.target.value);
                    }}
                    InputProps={{
                        readOnly: requesting
                    }}
                />
                <HrTag p={2} />
                <Box>
                    <Typography component="p">Số tiền đang có:</Typography>
                    <Typography component="p" textAlign="right"><b>{formatMoney(user?.money_bonus)} đ</b></Typography>
                </Box>
                <HrTag p={2} />
                <Box>
                    <Typography component="p">Số tiền có thể rút:</Typography>
                    <Typography component="p" textAlign="right"><b>{formatMoney(moneyCanWithdraw)} đ</b></Typography>
                </Box>
                <HrTag p={2} />
                <Box>
                    <Typography component="p">Số tiền đang muốn rút:</Typography>
                    <Typography component="p" textAlign="right"><b>{formatMoney(money)} đ</b></Typography>
                </Box>
                <HrTag p={2} />
                <Box>
                    <Typography component="p">Thuế:</Typography>
                    <Typography component="p" textAlign="right"><b>10%</b></Typography>
                </Box>
                <HrTag p={2} />
                <Box>
                    <Typography component="p">Thực nhận:</Typography>
                    <Typography component="p" textAlign="right"><b>{!money ? 0 : formatMoney(money - money / 10)} đ</b></Typography>
                </Box>
                <HrTag p={2} />
                <Typography component="h4" textAlign="center" fontSize="20px" fontWeight={700} marginBottom={2}>Thông tin nhận tiền</Typography>
                <Stack direction="row" alignItems="center" marginBottom="1.25rem" flexWrap="wrap">
                    <AccountBalanceOutlinedIcon sx={{ width: "60px", color: "grey" }} />
                    <TextField
                        id="branch"
                        label="Ngân hàng"
                        value={bankInfo?.bank_name ?? ''}
                        variant="standard"
                        sx={{ width: "calc(100% - 60px)" }}
                        type="text"
                        InputProps={{
                            readOnly: true
                        }}
                    />
                </Stack>
                <Stack direction="row" alignItems="center" marginBottom="1.25rem" flexWrap="wrap">
                    <BadgeOutlinedIcon sx={{ width: "60px", color: "grey" }} />
                    <TextField
                        id="branch"
                        label="Số tài khoản"
                        value={bankInfo?.account_number ?? ''}
                        variant="standard"
                        sx={{ width: "calc(100% - 60px)" }}
                        type="text"
                        InputProps={{
                            readOnly: true
                        }}
                    />
                </Stack>
                <Stack direction="row" alignItems="center" marginBottom="1.25rem" flexWrap="wrap">
                    <BusinessOutlinedIcon sx={{ width: "60px", color: "grey" }} />
                    <TextField
                        id="branch"
                        label="Chi nhánh"
                        value={bankInfo?.branch ?? ''}
                        variant="standard"
                        sx={{ width: "calc(100% - 60px)" }}
                        type="text"
                        InputProps={{
                            readOnly: true
                        }}
                    />
                </Stack>
            </Stack>
            <HrTag p={2} />
            <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap">
                <TextField
                    id="branch"
                    label="Nhập mã OTP"
                    value={otpCode}
                    variant="outlined"
                    sx={{ width: "calc(100% - 160px)" }}
                    type="text"
                    autoComplete="aaaaa"
                    onChange={(e) => {
                        setOtpCode(e.target.value)
                    }}
                    InputProps={{
                        readOnly: requesting
                    }}
                />
                <Box id="recaptcha-container" />
                <Button variant="contained" disabled={requesting} onClick={() => sendOtp()}>Lấy mã OTP</Button>
            </Stack>
            <HrTag p={2} />
            <Box textAlign="center">
                <Button variant="contained" disabled={requesting} onClick={() => sendWithdrawRequest()}>Đồng ý</Button>
            </Box>
        </SinglePage>
    );
}

export default WithdrawPage;
