import { Box } from "@mui/material";

export const BoxMenu = ({ children }: { children: any }) => {
    return (
        <Box width="50%" padding="5px">
            <Box
                padding="5px"
                sx={{
                    boxShadow: '0 1px 3px 1px rgba(0, 0, 0, 0.2)',
                    borderRadius: '4px'
                }}
            >
                {children}
            </Box>
        </Box>
    );
}
