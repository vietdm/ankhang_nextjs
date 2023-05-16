import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { useEffect, useState } from "react";
import { saveCart } from "@/utils/helper/cart";
import { useRouter } from "next/router";

export const BoxProductSimple = ({ product }: { product: any }) => {
    const [quantity, setQuantity] = useState<number>(1);
    const [priceTemp, setPriceTemp] = useState<number>(product.price);
    const [itemProductInRow, setItemProductInRow] = useState<number>(2);
    const router = useRouter();

    const minusQuantity = () => {
        if (quantity == 1) return;
        setQuantity(quantity - 1);
    };

    const addQuantity = () => {
        setQuantity(quantity + 1);
    };

    const onAddToCart = () => {
        saveCart({ quantity, id: product.id });
        router.push('/cart');
    }

    useEffect(() => {
        setPriceTemp(product.price * quantity);
    }, [quantity]);

    useEffect(() => {
        const windowWidth = window.innerWidth;
        if (windowWidth <= 576) return setItemProductInRow(2);
        if (windowWidth <= 768) return setItemProductInRow(3);
        return setItemProductInRow(4);
    }, []);

    return (
        <Box width={`calc(100% / ${itemProductInRow})`} padding="5px" marginBottom={2}>
            <Link passHref href={`/product/${product.id}`}>
                <Box position="relative" width="100%">
                    <img alt={product.title} src={product.images[0]} style={{ width: '100%' }} />
                </Box>
                <Typography component="p" textAlign="center" marginTop={1} fontSize="16px">
                    {product.title}
                </Typography>
                <Typography component="p" textAlign="center" color="#0984e3">
                    {priceTemp.toLocaleString("en-US")} đ
                </Typography>
            </Link>
            <Stack direction="row" justifyContent="center" marginY={1}>
                <Stack justifyContent="center" onClick={() => minusQuantity()}>
                    <RemoveCircleOutlineOutlinedIcon sx={{ height: '100%', fill: 'grey', marginRight: '5px' }} />
                </Stack>
                <TextField
                    id="quantity"
                    type="number"
                    value={quantity}
                    InputProps={{
                        readOnly: true,
                    }}
                    inputProps={{
                        sx: {
                            textAlign: "center",
                            padding: '4px 0px',
                            width: '60px'
                        },
                    }}
                />
                <Stack justifyContent="center" onClick={() => addQuantity()}>
                    <AddCircleOutlineOutlinedIcon sx={{ height: '100%', fill: 'grey', marginLeft: '5px' }} />
                </Stack>
            </Stack>
            <Box sx={{ textAlign: 'center' }}>
                <Button variant="outlined" color='info' onClick={() => onAddToCart()}>Mua ngay</Button>
            </Box>
        </Box>
    );
}
