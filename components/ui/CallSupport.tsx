import { Box } from "@mui/material";
import Link from "next/link";

type Props = {
    bottom?: string;
    right?: string;
}

export const CallSupport = (prop: Props) => {
    return (
        <Box position="fixed" sx={{
            bottom: prop.bottom ?? '10px',
            right: prop.right ?? '10px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            boxShadow: '1px 2px 4px 1px rgba(0, 0, 0, 0.2)',
            overflow: 'hidden',
            padding: '14px',
            background: '#fff',
            zIndex: 2147483647
        }}
        >
            <Link href='tel:0566866333' passHref style={{
                position: 'absolute',
                width: 'calc(100% - 28px)',
                height: 'calc(100% - 28px)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}>
                <img src="/phone.gif" alt="Phone Gif" style={{ width: '100%' }} />
            </Link>
        </Box>
    );
}