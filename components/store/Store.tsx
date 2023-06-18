import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetch } from "@/libraries/axios";
import { CartIcon } from "../ui/CartIcon";

export const StoreComponent = ({ active = false }: { active?: boolean }) => {
  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    fetch.get("/products").then((result: any) => {
      setProducts(result.products);
    });
  }, []);

  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      height="calc(100% - 90px)"
      maxHeight="calc(100% - 90px)"
      minHeight="calc(100% - 90px)"
      width="100vw"
      overflow="auto"
      display={active ? "block" : "none"}
    >
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        height="50px"
        width="100%"
        sx={{ background: "#0984e3" }}
      >
        <CartIcon />
      </Stack>
      <Stack direction="row" flexWrap="wrap" maxHeight="calc(100% - 50px)" overflow="auto" marginTop={0}>
        {products.map((product: any) => (
          <Box width="50%" padding="16px" key={product.id}>
            <Link passHref href={`/product/${product.id}`}>
              <Box position="relative" width="100%">
                <img alt={product.title} src={product.images[0]} style={{ width: "100%" }} />
              </Box>
              <Typography component="p" textAlign="center" marginTop={1}>
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
};

