import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetch } from '@/libraries/axios';
import { useUser } from '@/hooks/useUser';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { UserHelper } from '@/utils/helper/UserHelper';
import { HrTag } from '@/components/ui/HrTag';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { formatMoney } from '@/utils';
import { Loading } from '@/components/layout/Loading';
import { Color } from '@/libraries/color';
import { SinglePage } from '@/components/ui/SinglePage';

const UserTree = () => {
    const { user } = useUser();
    const [userTree, setUserTree] = useState<any>(null);
    const [requesting, setRequesting] = useState<boolean>(false);
    const [queryUsername, setQueryUsername] = useState<string[]>([]);
    const [historyUserTree, setHistoryUserTree] = useState<any>({});

    const getTreeUser = () => {
        const username = queryUsername[queryUsername.length - 1];
        if (typeof historyUserTree[username] != 'undefined') {
            setUserTree(null);
            setTimeout(() => {
                setUserTree(historyUserTree[username]);
            }, 100);
            return;
        }
        setRequesting(true);
        fetch.get('/user/tree/' + username).then((result: any) => {
            console.log(result.data);
            setUserTree(null);
            setTimeout(() => {
                setUserTree(result.data);
            }, 100);
            setRequesting(false);
            historyUserTree[username] = result.data;
            setHistoryUserTree({ ...historyUserTree });
        });
    }

    const addUsernameQuery = (username: string) => {
        setQueryUsername([...queryUsername, username]);
    }

    const backTreeBefore = () => {
        queryUsername.pop();
        setQueryUsername([...queryUsername]);
    }

    const isNewUser = (user: any) => {
        return user.total_sale == 0 && user.total_buy == 0;
    }

    useEffect(() => {
        if (!user) return;
        setQueryUsername([user.username]);
    }, [user]);

    useEffect(() => {
        if (queryUsername.length > 0) {
            getTreeUser();
        }
    }, [queryUsername]);

    if (!userTree) {
        return <Loading />;
    }

    return (
        <SinglePage title="Đội nhóm">
            <Box paddingY="15px" width="100%" overflow="hidden">
                <AnimatePresence>
                    {queryUsername.length > 1 && !requesting && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Stack
                                direction="row"
                                alignItems="center"
                                fontWeight="bold"
                                marginY="10px"
                                onClick={() => backTreeBefore()}
                            >
                                <ArrowCircleLeftOutlinedIcon />
                                <Typography component="p" marginLeft={1} sx={{ userSelect: 'none' }}>Quay lại danh sách trước</Typography>
                            </Stack>
                        </motion.div>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {userTree && (
                        <motion.div
                            style={{ position: 'relative' }}
                            initial={{ top: '-100px', opacity: 0 }}
                            animate={{ top: 0, opacity: 1 }}
                            exit={{ top: '-100px', opacity: 0 }}
                        >
                            <Box sx={{
                                backgroundColor: '#e3e3e3',
                                padding: '14px',
                                borderRadius: '14px',
                                background: "radial-gradient(#f4f9fd, #bae4f4)",
                                boxShadow: '0 4px 4px 1px rgba(0, 0, 0, 0.2)'
                            }}>
                                <Stack direction="row">
                                    <Stack width="80px" direction="row" justifyContent="center" alignItems="center">
                                        <Box position="relative" textAlign="center" height={80} width={80}>
                                            <Image fill alt={'avatar'} src="/user.png" style={{ borderRadius: '50%', margin: '0 auto' }} />
                                        </Box>
                                    </Stack>
                                    <Box width="calc(100% - 80px)" paddingLeft="15px">
                                        <Typography component="h4" sx={{ fontSize: '22px' }} fontWeight="600">
                                            {userTree.fullname}
                                        </Typography>
                                        <Typography component="h6" sx={{ fontSize: '16px' }} fontWeight="400">
                                            Mã KH: <b>{userTree.username}</b>
                                        </Typography>
                                        <Typography component="h6" sx={{ fontSize: '16px' }} fontWeight="400">
                                            Chức vụ: <b>{UserHelper.getPositionName(userTree.level)}</b>
                                        </Typography>
                                    </Box>
                                </Stack>
                                <HrTag p={2} />
                                <Box>
                                    <Typography component="h5">Doanh số cá nhân:</Typography>
                                    <Typography component="h5" textAlign="right">{formatMoney(userTree.total_buy)}</Typography>
                                    <HrTag p={1} />
                                    <Typography component="h5">Tổng đơn hàng:</Typography>
                                    <Typography component="h5" textAlign="right">{userTree.total_order}</Typography>
                                    <HrTag p={1} />
                                    <Typography component="h5">Doanh số đội nhóm:</Typography>
                                    <Typography component="h5" textAlign="right">{formatMoney(userTree.total_sale)}</Typography>
                                    <HrTag p={1} />
                                    <Typography component="h5">Tổng đơn hàng đội nhóm:</Typography>
                                    <Typography component="h5" textAlign="right">{userTree.total_child_order}</Typography>
                                </Box>
                            </Box>
                        </motion.div>
                    )}
                </AnimatePresence>
                <Box paddingTop="20px">
                    <AnimatePresence>
                        {userTree && (
                            <motion.div
                                style={{ position: 'relative' }}
                                initial={{ left: '300px' }}
                                animate={{ left: 0 }}
                                exit={{ left: '-300px' }}
                            >
                                <AnimatePresence>
                                    {queryUsername.length > 1 && !requesting && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                fontWeight="bold"
                                                marginY="10px"
                                                onClick={() => backTreeBefore()}
                                            >
                                                <ArrowCircleLeftOutlinedIcon />
                                                <Typography component="p" marginLeft={1} sx={{ userSelect: 'none' }}>Quay lại danh sách trước</Typography>
                                            </Stack>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                <Typography variant="h6">Danh sách ({userTree.trees.length})</Typography>
                                {userTree.trees.map((tree: any) => (
                                    <Stack direction="row" key={tree.id} sx={{
                                        boxShadow: '1px 2px 4px 1px rgba(0, 0, 0, 0.2)',
                                        borderRadius: '7px',
                                        padding: '6px',
                                        marginBottom: '15px'
                                    }} >
                                        <Stack width="60px" direction="row" justifyContent="center" alignItems="flex-start">
                                            <Box position="relative" textAlign="center" height={60} width={60}>
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        width: '100%',
                                                        height: '100%',
                                                        backgroundImage: 'url("/user.png")',
                                                        backgroundSize: 'cover',
                                                        backgroundRepeat: 'no-repeat',
                                                        backgroundPosition: 'center',
                                                        borderRadius: '50%',
                                                        top: '50%',
                                                        left: '50%',
                                                        transform: 'translate(-50%, -50%)',
                                                        border: '7px solid ' + (isNewUser(tree) ? Color.new : Color[tree.level])
                                                    }}
                                                />
                                            </Box>
                                        </Stack>
                                        <Box width="calc(100% - 100px)" paddingLeft="15px">
                                            <Typography component="h4" fontWeight="600">
                                                {tree.username}&nbsp;
                                                <Typography component="span" fontSize="15px">
                                                    ({isNewUser(tree) ? 'Người mới' : UserHelper.getPositionName(tree.level)})
                                                </Typography>
                                            </Typography>
                                            <Typography component="h6" fontWeight="400">
                                                Họ tên: <b>{tree.fullname}</b>
                                            </Typography>
                                            <Typography component="h6" fontWeight="400">
                                                Tổng DS: <b>{formatMoney(tree.total_sale)}</b>
                                            </Typography>
                                            <Typography component="h6" fontWeight="400">
                                                Tổng ĐH: <b>{tree.total_child_order}</b>
                                            </Typography>
                                        </Box>
                                        {tree.has_child && !requesting ? (
                                            <Stack
                                                width="40px"
                                                justifyContent="center"
                                                alignItems="center"
                                                onClick={() => addUsernameQuery(tree.username)}
                                            >
                                                <ArrowCircleRightOutlinedIcon fontSize='medium' />
                                            </Stack>
                                        ) : (
                                            <Box width="40px"></Box>
                                        )}
                                    </Stack>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Box>
            </Box>
        </SinglePage>
    );
}

export default UserTree;
