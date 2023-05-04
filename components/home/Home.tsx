import { Box, Stack, Typography } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

export const HomeComponent = () => {
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
        <Box width="50%" padding="15px">
          <Box
            sx={{
              backgroundImage: 'url("http://mvtp.site/images/products/nano.jpg")',
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              width: "100%",
              height: "160px",
              margin: "auto",
            }}
          ></Box>
          <Typography component="p" textAlign="center" marginTop={1}>
            Sản phẩm A Có 5 giá trị
          </Typography>
          <Typography component="p" textAlign="center" color="#0984e3">
            3.000.000 đ
          </Typography>
        </Box>
        <Box width="50%" padding="15px">
          <Box
            sx={{
              backgroundImage: 'url("http://mvtp.site/images/products/nano.jpg")',
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              width: "100%",
              height: "160px",
              margin: "auto",
            }}
          ></Box>
          <Typography component="p" textAlign="center" marginTop={1}>
            Sản phẩm A Có 5 giá trị
          </Typography>
          <Typography component="p" textAlign="center" color="#0984e3">
            3.000.000 đ
          </Typography>
        </Box>
        <Box width="50%" padding="15px">
          <Box
            sx={{
              backgroundImage: 'url("http://mvtp.site/images/products/nano.jpg")',
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              width: "100%",
              height: "160px",
              margin: "auto",
            }}
          ></Box>
          <Typography component="p" textAlign="center" marginTop={1}>
            Sản phẩm A Có 5 giá trị
          </Typography>
          <Typography component="p" textAlign="center" color="#0984e3">
            3.000.000 đ
          </Typography>
        </Box>
        <Box width="50%" padding="15px">
          <Box
            sx={{
              backgroundImage: 'url("http://mvtp.site/images/products/nano.jpg")',
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              width: "100%",
              height: "160px",
              margin: "auto",
            }}
          ></Box>
          <Typography component="p" textAlign="center" marginTop={1}>
            Sản phẩm A Có 5 giá trị
          </Typography>
          <Typography component="p" textAlign="center" color="#0984e3">
            3.000.000 đ
          </Typography>
        </Box>
        <Box width="50%" padding="15px">
          <Box
            sx={{
              backgroundImage: 'url("http://mvtp.site/images/products/nano.jpg")',
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              width: "100%",
              height: "160px",
              margin: "auto",
            }}
          ></Box>
          <Typography component="p" textAlign="center" marginTop={1}>
            Sản phẩm A Có 5 giá trị
          </Typography>
          <Typography component="p" textAlign="center" color="#0984e3">
            3.000.000 đ
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};
