import { Box, Button, Stack } from "@mui/material";
// import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useEffect, useState } from "react";
import { Storage } from "@/libraries/storage";

export const DialogQc = () => {
    const [showQc, setShowQc] = useState<boolean>(false);

    useEffect(() => {
        const flagIgnoreQcHome = Storage.get('ignore-qc-home');
        if (flagIgnoreQcHome !== 'true') {
            setShowQc(true);
        }
    }, []);

    const closeForever = () => {
        Storage.set('ignore-qc-home', 'true');
        setShowQc(false);
    }

    if (!showQc) return <></>;

    return (
        <Stack
            sx={{
                position: 'fixed',
                zIndex: 999999,
                background: "rgba(0, 0, 0, 0.3)",
                width: '100vw',
                height: '100vh',
                top: 0,
                left: 0,
                alignItems: 'center',
                paddingTop: '80px'
            }}
        >
            <Box width="95vw" position="relative">
                <img src="/imgs/qc/qc1.jpg" alt="" style={{ width: '100%' }} />
                {/* <Box
                    sx={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        color: '#3355bd'
                    }}
                >
                    <HighlightOffIcon sx={{ fontSize: '40px' }} />
                </Box> */}
            </Box>
            <Box>
                <Button variant="contained" color="secondary" sx={{marginRight: '7px'}} onClick={() => setShowQc(false)}>Đóng</Button>
                <Button variant="contained" color="primary" onClick={closeForever}>Đóng và không hiện lại</Button>
            </Box>
        </Stack>
    );
}
