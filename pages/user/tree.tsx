import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useRouter } from 'next/router';
import { fetch } from '@/libraries/axios';
import { useUser } from '@/hooks/useUser';
import { TreeBox } from '@/components/user/TreeBox';

const UserTree = () => {
    const [userTree, setUserTree] = useState<any>([]);
    const router = useRouter();
    const { user } = useUser();

    useEffect(() => {
        if (!user) return;
        fetch.get('/user/tree/').then(result => {
            setUserTree(result.tree);
        }).catch(() => {
            //
        })
    }, [user]);

    return (
        <Box height="100vh" maxHeight="100vh" minHeight="100vh" overflow="auto">
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                height="50px"
                width="100%"
                sx={{ background: "#0984e3" }}
            >
                <Box padding={1} onClick={() => router.back()}>
                    <ArrowBackOutlinedIcon sx={{ color: "#fff" }} />
                </Box>
                <Typography component="h2" color="#fff">
                    Đội nhóm
                </Typography>
                <Box></Box>
            </Stack>
            <Box
                height="calc(100vh - 50px)"
                maxHeight="calc(100vh - 50px)"
                minHeight="calc(100vh - 50px)"
                padding="15px"
                overflow="auto"
            >
                <Box marginTop={2}>
                    <TreeBox user={userTree} />
                </Box>
            </Box>
        </Box >
    );
}

export default UserTree;
