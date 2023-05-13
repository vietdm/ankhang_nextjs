import { fetch } from "@/libraries/axios";
import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SinglePage } from "@/components/ui/SinglePage";

const StorePage = () => {
    const [products, setProducts] = useState<any>([]);

    useEffect(() => {
        fetch.get('/products').then((result: any) => {
            setProducts(result.products);
        });
    }, []);

    return (
        <SinglePage title="Cửa hàng">
            <Stack direction="row" flexWrap="wrap" overflow="auto" marginTop={0}>
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
        </SinglePage>
    );
}

export default StorePage;
