import { Box, Stack, Typography } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {Product} from "@/pages/api/products";
import Link from "next/link";
export const HomeComponent = ({products=[]}:{products: Product[]}) => {
  console.log(products)

  const handleClick = () =>{

  
  }
  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      height="calc(100% - 50px)"
      maxHeight="calc(100% - 50px)"
      minHeight="calc(100% - 50px)"
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
          <ShoppingCartOutlinedIcon sx={{ color: "#fff" }} />
        </Box>
      </Stack>
      <Stack direction="row" flexWrap="wrap" height="calc(100% - 50px)" overflow="auto">
        {products?.map(product => (
        <Box width="50%" padding="15px" key={product.id}>
        <Box
          sx={{
            backgroundImage: `url(${typeof(product.images) === 'string' ? JSON.parse(product.images)[0] : product.images[0]})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: "100%",
            height: "160px",
            margin: "auto",
          }}
        ></Box>
        <Link passHref href={`/product/${product.id}`}>
          <Typography component="p" textAlign="center" marginTop={1} onClick={handleClick}>
            {product?.title}
          </Typography>
        </Link>
        <Typography component="p" textAlign="center" color="#0984e3">
         {product.price} đ
        </Typography>
      </Box>
        ))
          }
      </Stack>
    </Box>
  );
};
