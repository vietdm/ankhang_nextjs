import { Box, Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { Storage } from "@/libraries/storage";

export const DialogQc = () => {
    const [showQc, setShowQc] = useState<boolean>(false);
    const [horizontal, setHorizontal] = useState<boolean>(false);

    useEffect(() => {
        const flagIgnoreQcHomeDate = Storage.get('ignore-qc-lucky-date');
        if (flagIgnoreQcHomeDate != (new Date).getDate().toString()) {
            setShowQc(true);
        }
        setHorizontal(window.innerWidth > window.innerHeight);
    }, []);

    const closeForever = () => {
        Storage.set('ignore-qc-lucky-date', (new Date).getDate().toString());
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
                justifyContent: 'center'
            }}
        >
            <Box height={horizontal ? '80vh' : 'auto'} width={horizontal ? 'auto' : '95vw'} position="relative">
                <img src="/imgs/qc/qc2.jpg" alt="" style={horizontal ? { height: '100%' } : { width: '100%' }} />
            </Box>
            <Box marginTop="10px">
                <Button variant="contained" color="primary" onClick={closeForever}>Đóng</Button>
            </Box>
        </Stack>
    );
}
