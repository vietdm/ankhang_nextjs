import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useRouter } from 'next/router';
import { fetch } from '@/libraries/axios';
import { useUser } from '@/hooks/useUser';
import Brightness1OutlinedIcon from '@mui/icons-material/Brightness1Outlined';

const UserTree = () => {
    const [userTree, setUserTree] = useState<any>(null);
    const router = useRouter();
    const { user } = useUser();

    useEffect(() => {
        if (!user) return;
        fetch.get('/user/tree').then(result => {
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
            <Box marginTop={3} paddingX="15px">
                {userTree && (
                    <div id="Menu_tree">
                        <details>
                            <summary data-view={userTree.children.length}>{userTree.fullname}</summary>
                            {userTree.children.map((childLevel1: any, index1: number) => (
                                <details key={index1}>
                                    <summary data-view={childLevel1.children.length}>{childLevel1.fullname}</summary>
                                    {childLevel1.children.map((childLevel2: any, index2: number) => (
                                        <details key={index2}>
                                            <summary data-view={childLevel2.children.length}>{childLevel2.fullname}</summary>
                                            {childLevel2.children.length > 0 && (
                                                <ul>
                                                    {childLevel2.children.map((childLevel3: any, index3: number) => (
                                                        <li className="item" key={index3}>
                                                            <Brightness1OutlinedIcon sx={{ fontSize: '16px' }} />
                                                            <p>{childLevel3.fullname}</p>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </details>
                                    ))}
                                </details>
                            ))}
                        </details>
                    </div>
                )}
            </Box>
        </Box >
    );
}

export default UserTree;
