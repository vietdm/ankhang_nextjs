import { Box, Button, Stack, Typography } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { DialogAddToCart } from "@/components/ui/DialogAddToCart";
import { useState } from "react";

const ProductPage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <Box height="100vh" maxHeight="100vh" minHeight="100vh">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        height="50px"
        width="100%"
        sx={{ background: "#0984e3" }}
      >
        <Box padding={1}>
          <ArrowBackOutlinedIcon sx={{ color: "#fff" }} />
        </Box>
        <Typography component="h2" color="#fff">
          Sản phẩm A Có 5 giá trị
        </Typography>
        <Box padding={1}>
          <ShoppingCartOutlinedIcon sx={{ color: "#fff" }} />
        </Box>
      </Stack>
      <Stack height="calc(100% - 50px)" overflow="auto" width="90%" margin="auto">
        <Typography variant="h6" marginY={1} textAlign="center">
          Chi tiết sản phẩm
        </Typography>
        <Box textAlign="center">
          <img src="http://mvtp.site/images/products/nano.jpg" alt="Demo" width="100%" />
        </Box>
        <Typography component="p" marginTop={1}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged.
        </Typography>
        <hr style={{ margin: "15px 0" }} />
        <Stack>
          <Typography component="b" fontWeight="500">
            Sản phẩm A Có 5 giá trị
          </Typography>
        </Stack>
        <Stack alignItems="flex-end">Giá bán: 3.000.000đ</Stack>
        <Stack alignItems="center" marginY={2}>
          <Button variant="contained" onClick={() => setOpenModal(true)}>
            Thêm vào giỏ hàng
          </Button>
        </Stack>
        <DialogAddToCart
          open={openModal}
          onSubmit={() => {
            setOpenModal(false);
          }}
          onClose={() => {
            setOpenModal(false);
          }}
          name="Hahaha"
          price={3000000}
        />
      </Stack>
    </Box>
  );
};

export default ProductPage;
