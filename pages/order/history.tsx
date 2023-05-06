import { fetch } from "@/libraries/axios";
import { Box, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useRouter } from "next/router";

const HistoryOrderPage = () => {
    const [histories, setHistories] = useState<any>([]);
    const router = useRouter();

    useEffect(() => {
        fetch.post('/order/history').then(result => {
            setHistories(result.history);
        })
    }, []);

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
                <Box padding={1} onClick={() => router.back()}>
                    <ArrowBackOutlinedIcon sx={{ color: "#fff" }} />
                </Box>
                <Typography component="h2" color="#fff">
                    Lịch sử mua hàng
                </Typography>
                <Box padding={1} onClick={() => router.push('/')}>
                    <HomeOutlinedIcon sx={{ color: "#fff" }} />
                </Box>
            </Stack>
            <Box height="calc(100% - 50px)" overflow="auto" width="90%" margin="auto">
                <Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Tên SP</TableCell>
                                    <TableCell align="center">Số lượng</TableCell>
                                    <TableCell align="center" sx={{ minWidth: '130px' }}>Tổng tiền</TableCell>
                                    <TableCell align="center">Tình trạng</TableCell>
                                    <TableCell align="center" sx={{ minWidth: '180px' }}>Họ và tên</TableCell>
                                    <TableCell align="center" sx={{ minWidth: '180px' }}>Địa chỉ nhận hàng</TableCell>
                                    <TableCell align="center">Số điện thoại</TableCell>
                                    <TableCell align="center">#</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {histories.map((history: any) => {
                                    return history.order.map((order: any) => (
                                        < TableRow
                                            key={history.id + order.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="center" component="th" scope="row">
                                                {order.product.title}
                                            </TableCell>
                                            <TableCell align="center" >{order.quantity}</TableCell>
                                            <TableCell align="center" sx={{ minWidth: '130px' }}>{(order.product.price * Number(order.quantity)).toLocaleString("en-US")} đ</TableCell>
                                            <TableCell align="center" >
                                                {history.status === 0 && 'Đợi xác nhận'}
                                                {history.status === 1 && 'Đã xác nhận'}
                                                {history.status === 2 && 'Đang vận chuyển'}
                                                {history.status === 3 && 'Hoàn thành'}
                                                {history.status === 4 && 'Bị hủy'}
                                            </TableCell>
                                            <TableCell align="center" sx={{ minWidth: '180px' }}>{history.name}</TableCell>
                                            <TableCell align="center" sx={{ minWidth: '180px' }}>{history.address}</TableCell>
                                            <TableCell align="center" >{history.phone}</TableCell>
                                            <TableCell align="center" ></TableCell>
                                        </TableRow>
                                    ))
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                <Box>
                    {histories.length == 0 && <Typography textAlign="center" component="p" marginTop={2}>Không có lịch sử</Typography>}
                </Box>
            </Box>
        </Box >
    )
}

export default HistoryOrderPage;
