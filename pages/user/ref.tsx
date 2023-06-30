import { useEffect, useMemo, useState } from "react";
import { SinglePage } from "@/components/ui/SinglePage";
import { useUser } from "@/hooks/useUser";
import { Stack, Typography } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import QRCode from 'qrcode';

const UserRefPage = () => {
    const { user } = useUser();
    const [copied, setCopied] = useState<boolean>(false);
    const [qrCode, setQrCode] = useState<string>('');

    const copyAffilate = (value: string) => {
        const tempInput = document.createElement("input");
        tempInput.value = value;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const affilate = useMemo(() => {
        if (!user || !user?.username) return "";
        return window.location.origin + "/r/" + user.username.toLowerCase();
    }, [user]);

    useEffect(() => {
        if (affilate != '') {
            QRCode.toDataURL(affilate, { errorCorrectionLevel: 'H', version: 8 }).then(setQrCode);
        }
    }, [affilate]);

    return (
        <SinglePage title="Giới thiệu người dùng">
            <Stack direction="row" justifyContent="space-between" paddingY={2} sx={{ borderBottom: "1px solid #3333" }}>
                <Stack direction="row">
                    <AccountCircleOutlinedIcon sx={{ fill: "#5eaddb" }} />
                    <Typography component="p" marginLeft={1}>Mã giới thiệu: <b>{user?.username}</b></Typography>
                </Stack>
            </Stack>
            {affilate !== "" && (
                <Stack direction="row" justifyContent="space-between" paddingY={2} sx={{ borderBottom: "1px solid #3333" }}>
                    <Stack direction="row">
                        <AccountCircleOutlinedIcon sx={{ fill: "#5eaddb" }} />
                        <Typography component="p" marginLeft={1} onClick={() => copyAffilate(affilate)}>
                            Link giới thiệu:
                            <br />
                            <b>{affilate}</b>
                            <br />
                            <Typography
                                component="span"
                                color={copied ? "#27ae60" : "#1976d2"}
                                fontWeight="700">
                                [{copied ? "Đã sao chép" : "Sao chép"}]
                            </Typography>
                        </Typography>
                    </Stack>
                </Stack>
            )}
            {qrCode !== "" && (
                <Stack direction="row" justifyContent="space-between" paddingY={2} sx={{ borderBottom: "1px solid #3333" }}>
                <Stack direction="row">
                    <AccountCircleOutlinedIcon sx={{ fill: "#5eaddb" }} />
                    <Typography component="p" marginLeft={1} onClick={() => copyAffilate(affilate)}>
                        QrCode giới thiệu:
                        <br />
                        <img src={qrCode} style={{ width: '200px' }} />
                    </Typography>
                </Stack>
            </Stack>
            )}
        </SinglePage>
    );
}

export default UserRefPage;
