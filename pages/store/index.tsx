import { fetch } from "@/libraries/axios";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { SinglePage } from "@/components/ui/SinglePage";
import { BoxProductSimple } from "@/components/store/BoxProductSimple";
import { HrTag } from "@/components/ui/HrTag";
import { formatMoney } from "@/utils";
import { saveCarts } from "@/utils/helper/cart";
import { useRouter } from "next/router";
import { CartItem } from "@/interfaces/product";

const StorePage = () => {
    const [products, setProducts] = useState<any>([]);
    const [productShow, setProductShow] = useState<any>([]);
    const [menuActive, setMenuActive] = useState<string>('sp');
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [carts, setCarts] = useState<any>({});
    const router = useRouter();

    const filterProduct = () => {
        const productActive = products.filter((product: any) => {
            if (menuActive == 'sp' || menuActive == 'option') return product.type == 'nomal';
            return product.type == 'combo';
        });

        setProductShow(productActive);
    }

    const onChangeQuantity = (quantity: number, productId: number) => {
        carts[productId] = quantity;
        setCarts({ ...carts });
    }

    const selectBuyOptions = () => {
        const newCart: CartItem[] = [];
        Object.keys(carts).map((id: any) => {
            newCart.push({ quantity: carts[id], id });
        });
        saveCarts(newCart);
        router.push('/cart');
    }

    useEffect(() => {
        fetch.get('/products').then((result: any) => {
            setProducts(result.products);
        });
    }, []);

    useEffect(() => {
        filterProduct();
    }, [products, menuActive]);

    useEffect(() => {
        setTimeout(() => {
            let cart: any = {};
            for (let p of productShow) {
                cart[p.id] = 1;
            }
            setCarts(cart);
        }, 10);
    }, [productShow]);

    useEffect(() => {
        if (menuActive != 'option') return;
        let total = 0;
        for (const productId of Object.keys(carts)) {
            const product = productShow.find((p: any) => p.id == productId);
            if (!product) {
                setTotalPrice(0);
                return;
            }
            total += product.price * carts[productId];
        }
        setTotalPrice(total);
        console.log(carts);

    }, [carts]);

    return (
        <SinglePage title="Cửa hàng">
            <Stack direction="row" paddingY="5px">
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent='center'
                    width="50%"
                    paddingY="10px"
                    onClick={() => setMenuActive('sp')}
                    sx={{
                        borderBottom: menuActive == 'sp' ? "3px solid green" : null
                    }}
                >
                    <Typography component="h4" textAlign="center">SẢN PHẨM</Typography>
                </Stack>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent='center'
                    width="50%"
                    paddingY="10px"
                    onClick={() => setMenuActive('combo')}
                    sx={{
                        borderBottom: menuActive == 'combo' ? "3px solid green" : null
                    }}
                >
                    <Typography component="h4" textAlign="center">COMBO</Typography>
                </Stack>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent='center'
                    width="50%"
                    paddingY="10px"
                    onClick={() => setMenuActive('option')}
                    sx={{
                        borderBottom: menuActive == 'option' ? "3px solid green" : null
                    }}
                >
                    <Typography component="h4" textAlign="center">COMBO <br /> tùy chọn</Typography>
                </Stack>
            </Stack>
            <Stack direction="row" flexWrap="wrap" overflow="auto" marginTop={0}>
                {productShow.map((product: any) => {
                    return (
                        <BoxProductSimple
                            product={product}
                            menuActive={menuActive}
                            key={`${menuActive}_${product.id}`}
                            onChangeQuantity={onChangeQuantity}
                        />
                    );
                })}
            </Stack>
            {menuActive == 'option' && (
                <Stack paddingBottom={3}>
                    <HrTag p={2} />
                    <Typography variant="h6" textAlign="center">Tổng giá trị: {formatMoney(totalPrice)}</Typography>
                    <Box textAlign="center">
                        <Button
                            variant="contained"
                            color="warning"
                            disabled={totalPrice < 3000000 || true}
                            onClick={() => selectBuyOptions()}
                        >
                            Mua combo ngay
                        </Button>
                    </Box>
                </Stack>
            )}
        </SinglePage>
    );
}

export default StorePage;
