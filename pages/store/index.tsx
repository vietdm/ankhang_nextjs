import { CartIcon } from "@/components/ui/CartIcon";
import { fetch } from "@/libraries/axios";
import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const StorePage = () => {
    const router = useRouter();
    const [products, setProducts] = useState<any>([]);

    useEffect(() => {
        fetch.get('/products').then((result: any) => {
            setProducts(result.products);
        });
    }, []);

    return (
        <Box>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                height="50px"
                width="100%"
                sx={{ background: "#0984e3" }}
            >
                <Box padding={1} onClick={() => router.push('/')}>
                    <ArrowBackOutlinedIcon sx={{ color: "#fff" }} />
                </Box>
                <Typography component="h2" color="#fff" fontWeight={500} fontSize="20px">Cửa hàng</Typography>
                <CartIcon />
            </Stack>
            <Stack direction="row" flexWrap="wrap" maxHeight="calc(100% - 50px)" overflow="auto" marginTop={0}>
                {products.map((product: any) => (
                    <Box width="50%" padding="16px" key={product.id}>
                        <Link passHref href={`/product/${product.id}`}>
                            <Box position="relative" width="100%">
                                <img alt={product.title} src={product.images[0]} style={{ width: '100%' }} />
                            </Box>
                            <Typography component="p" textAlign="center" marginTop={1} >
                                {product.title}
                            </Typography>
                            <Typography component="p" textAlign="center" color="#0984e3">
                                {product.price.toLocaleString("en-US")} đ
                            </Typography>
                        </Link>
                    </Box>
                ))}
            </Stack>
        </Box>
    );
}

export default StorePage;
