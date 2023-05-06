import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Tree from 'react-d3-tree';
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useRouter } from 'next/router';
import { fetch } from '@/libraries/axios';
import { UserHelper } from '@/utils/helper/UserHelper';

const UserTree = () => {
    const [ready, setReady] = useState<boolean>(false);
    const [userTree, setUserTree] = useState<any>({});
    const router = useRouter();

    useEffect(() => {
        fetch.get('/user/tree').then(result => {
            const tree = UserHelper.build(result.tree);
            setUserTree(tree);
            setReady(true);
        }).catch(() => {
            //
        })
    }, []);

    return (
        <Box height="100vh" maxHeight="100vh" minHeight="100vh" overflow="hidden">
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
            <Box height="calc(100vh - 50px)" maxHeight="calc(100vh - 50px)" minHeight="calc(100vh - 50px)" overflow="hidden">
                {ready && (
                    <Tree
                        initialDepth={2}
                        translate={{ x: 100, y: 50 }}
                        data={userTree}
                        orientation="vertical"
                        separation={{ siblings: 1, nonSiblings: 1 }}
                    />
                )}
            </Box>
        </Box>
    );
}

export default UserTree;
