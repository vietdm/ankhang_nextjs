import { Box, Stack, Typography } from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useRouter } from "next/router";
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
    title?: string;
    hasHomeIcon?: boolean;
    hasBackIcon?: boolean;
}

export const SinglePage = ({ children, title = '', hasHomeIcon = false, hasBackIcon = true }: Props) => {
    const router = useRouter();

    return (
        <Box height="100vh" maxHeight="100vh" minHeight="100vh" >
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                height="50px"
                width="100%"
                sx={{ background: "#0984e3" }}
            >
                {hasBackIcon ? (
                    <Box padding={1} onClick={() => router.back()}>
                        <ArrowBackOutlinedIcon sx={{ color: "#fff" }} />
                    </Box>
                ) : (
                    <Box></Box>
                )}
                <Typography component="h2" color="#fff">{title}</Typography>
                {hasHomeIcon ? (
                    <Box padding={1} onClick={() => router.push('/')}>
                        <HomeOutlinedIcon sx={{ color: "#fff" }} />
                    </Box>
                ) : (
                    <Box></Box>
                )}
            </Stack>
            <Box height="calc(100% - 50px)" overflow="auto" width="90%" margin="auto" paddingBottom={5}>
                {children}
            </Box>
        </Box>
    );
}
