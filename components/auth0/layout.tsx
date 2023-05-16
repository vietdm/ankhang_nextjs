import { Box, Typography } from "@mui/material";
import { useMemo } from "react";
import { Layout } from "../layout";

export const AuthLayout = ({ children, title = '' }: { children: any, title?: string }) => {
    const logoHead = useMemo(() => {
        return title == '' ? '/imgs/logo_full.png' : '/imgs/logo_ak.png';
    }, [title]);

    return (
        <Layout>
            <Box minHeight="100vh">
                <Box sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    zIndex: -1,
                    background: 'url("/imgs/bg_down_page.jpg")',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                }}></Box>
                <Box paddingTop={5} textAlign="center">
                    <img src={logoHead} alt="Logo" style={{ width: '250px', maxWidth: '70vw' }} />
                </Box>
                {title != '' && (
                    <Typography variant="h6" fontWeight="bold" textAlign="center" marginBottom="1.25rem">
                        {title}
                    </Typography>
                )}
                <Box paddingX="15px">
                    {children}
                </Box>
            </Box>
        </Layout>
    );
}
