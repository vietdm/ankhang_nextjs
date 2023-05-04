import { Box, Button } from "@mui/material";
import Image from "next/image";
import Logo from "@/public/logo.png";
import { useState } from "react";
import SvgIcon from "@mui/material/SvgIcon";
import { Login } from "@/components/auth0/login";
import { Signup } from "@/components/auth0/signup";

type TypePage = "login" | "signup";

const Index = () => {
  const [typePage, setTypePage] = useState<TypePage>("login");

  const changeTypePage = (newTypePage: TypePage) => {
    setTypePage(newTypePage);
  };

  return (
    <Box minHeight="100vh">
      <Box
        height="350px"
        sx={{
          background: "radial-gradient(#c1e3f3, #63c3f0)",
          backgroundRepeat: "no-repeat",
          position: "relative",
        }}
      >
        <Box
          width={200}
          sx={{
            position: "absolute",
            top: "60px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Image src={Logo} alt="logo" width={200} />
        </Box>
        <Box sx={{ position: "absolute", bottom: "40px", left: 0, width: "100%" }}>
          <Button
            variant="outlined"
            onClick={() => changeTypePage("login")}
            sx={{
              width: "50%",
              border: typePage == "login" ? undefined : "none",
              color: "#000",
              fontWeight: 600,
            }}
          >
            Đăng nhập
          </Button>
          <Button
            variant="outlined"
            onClick={() => changeTypePage("signup")}
            sx={{
              width: "50%",
              border: typePage == "signup" ? undefined : "none",
              color: "#000",
              fontWeight: 600,
            }}
          >
            Đăng ký
          </Button>
        </Box>
        <Box
          sx={{
            position: "absolute",
            left: typePage == "login" ? "25%" : "75%",
            transform: "translateX(-50%)",
            bottom: 0,
            width: "40px",
            height: "40px",
            transition: "all .3s",
            borderBottom: "1px solid #fff",
          }}
        >
          <SvgIcon viewBox="0 0 50 40" sx={{ width: "50px", height: "40px", fill: "#fff" }}>
            <polygon points="0,40 25,0 50,40" />
          </SvgIcon>
        </Box>
      </Box>
      <Box marginBottom="3rem">
        {typePage == "login" ? (
          <Login />
        ) : (
          <Signup
            gotoLogin={() => {
              changeTypePage("login");
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default Index;
