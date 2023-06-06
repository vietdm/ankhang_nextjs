import { getCart } from "@/utils/helper/cart";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

export const CartIcon = () => {
    const [cartQuantity, setCartQuantity] = useState<number>(0);

    useEffect(() => {
        const cart = getCart();
        setCartQuantity(cart.length);
    }, []);

    return (
        <Box padding={1} position="relative">
            <Link href="/checkout?redirect=0" passHref>
                <ShoppingCartOutlinedIcon sx={{ color: "#fff" }} />
            </Link>
            <Typography component="span" color="#0984e3" sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                background: '#fff',
                width: '20px',
                height: '20px',
                fontSize: '15px',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontWeight: 700
            }}>{cartQuantity}</Typography>
        </Box>
    );
}
