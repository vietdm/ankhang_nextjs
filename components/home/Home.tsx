import { Box, Stack, Typography } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/interfaces/product";
export const HomeComponent = ({ products = [] }: { products: Product[] }) => {
  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      height="calc(100% - 50px)"
      maxHeight="calc(100% - 50px)"
      minHeight="calc(100% - 50px)"
      width="100vw"
      overflow="auto"
    >
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        height="50px"
        width="100%"
        sx={{ background: "#0984e3" }}
      >
        <Box padding={1}>
          <Link href="/cart" passHref>
            <ShoppingCartOutlinedIcon sx={{ color: "#fff" }} />
          </Link>
        </Box>
      </Stack>
      <Stack direction="row" flexWrap="wrap" maxHeight="calc(100% - 50px)" overflow="auto" marginTop={0}>
        {products?.map(product => (
          <Box width="50%" padding="16px" key={product.id}>
            <Link passHref href={`/product/${product.id}`}>
              <Box position="relative" height={160} width="100%">
                <Image fill alt={product?.title ?? ''} objectFit="cover" src={`${typeof (product?.images) === 'string' ? JSON.parse(product?.images)[0] : product?.images[0]}`} />
              </Box>
              <Typography component="p" textAlign="center" marginTop={1} >
                {product?.title}
              </Typography>
              <Typography component="p" textAlign="center" color="#0984e3">
                {product.price.toLocaleString("en-US")} đ
              </Typography>
            </Link>
          </Box>
        ))
        }
      </Stack>
    </Box>
  );
};

