import { fetch } from "@/libraries/axios";
import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { SinglePage } from "@/components/ui/SinglePage";
import { BoxProductSimple } from "@/components/store/BoxProductSimple";

const StorePage = () => {
    const [products, setProducts] = useState<any>([]);
    const [productShow, setProductShow] = useState<any>([]);
    const [menuActive, setMenuActive] = useState<string>('sp');

    const filterProduct = () => {
        const productActive = products.filter((product: any) => {
            if (menuActive == 'sp') return product.price < 3000000;
            return product.price >= 3000000;
        });
        setProductShow(productActive);
    }

    useEffect(() => {
        fetch.get('/products').then((result: any) => {
            setProducts(result.products);
        });
    }, []);

    useEffect(() => {
        filterProduct();
    }, [products, menuActive]);

    return (
        <SinglePage title="Cửa hàng">
            <Stack direction="row" paddingY="20px">
                <Box width="50%" paddingY="10px" onClick={() => setMenuActive('sp')} sx={{
                    borderBottom: menuActive == 'sp' ? "3px solid green" : null
                }}>
                    <Typography component="h4" textAlign="center">SẢN PHẨM</Typography>
                </Box>
                <Box width="50%" paddingY="10px" onClick={() => setMenuActive('combo')} sx={{
                    borderBottom: menuActive == 'combo' ? "3px solid green" : null
                }}>
                    <Typography component="h4" textAlign="center">COMBO</Typography>
                </Box>
            </Stack>
            <Stack direction="row" flexWrap="wrap" overflow="auto" marginTop={0}>
                {productShow.map((product: any) => <BoxProductSimple product={product} key={product.id} />)}
            </Stack>
        </SinglePage>
    );
}

export default StorePage;
