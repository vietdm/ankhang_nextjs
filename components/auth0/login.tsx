import { Box, Typography } from "@mui/material";

export const Login = () => {
  return (
    <Box
      width="90%"
      sx={{
        margin: "auto",
        marginTop: "30px",
        boxShadow: "0 0 4px 1px rgba(0, 0, 0, 0.2)",
        padding: "15px",
        borderRadius: "7px",
      }}
    >
      <Typography variant="subtitle1" fontWeight="bold" textAlign="center">
        Đăng Nhập
      </Typography>
    </Box>
  );
};
