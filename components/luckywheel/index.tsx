import { Box } from "@mui/material";
import { CallSupport } from "../ui/CallSupport";

export const LuckyWheel = ({ active = false }: { active?: boolean }) => {
    return (
        <Box display={active ? 'block' : 'none'}>
            <Box textAlign="center" marginTop={5}>
                <img src="/lucky_whelll.png" alt="" style={{ width: "80%" }} />
            </Box>
            <Box textAlign="center" marginTop={5}>
                Chức năng {'"'}Vòng Quay May Mắn{'"'} đang phát triển!
            </Box>
            <CallSupport bottom="100px" />
        </Box>
    );
}
