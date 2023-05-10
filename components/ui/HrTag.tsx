import { Box } from "@mui/material";

export const HrTag = ({ p = 3 }: { p?: 1 | 2 | 3 | 4 | 5 }) => {
    return (
        <Box paddingY={p}>
            <Box boxShadow="0 0 2px 1px rgba(0, 0, 0, 0.2)"></Box>
        </Box>
    );
}
