import { Box, Stack } from "@mui/material";

export const BoxMenu = ({ children }: { children: any }) => {
    return (
        <Box width="50%" padding="5px">
            <Stack
                justifyContent='space-between'
                padding="5px"
                minHeight="100px"
                sx={{
                    boxShadow: '0 2px 4px 2px rgba(0, 0, 0, 0.2)',
                    borderRadius: '4px',
                    background: "radial-gradient(#c1e3f3, #63c3f0)",
                }}
            >
                {children}
            </Stack>
        </Box>
    );
}
