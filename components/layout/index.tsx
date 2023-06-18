import { Box } from "@mui/material";
import { motion } from "framer-motion";

export const Layout = ({ children }: { children: any }) => (
  <motion.div
    initial={{ x: 300, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: 300, opacity: 0 }}
    layout
    transition={{
      type: "spring",
      stiffness: 260,
      damping: 20,
    }}
  >
    <Box sx={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      zIndex: -1,
      background: "url(\"/imgs/bg_down_page.jpg\")",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    }}></Box>
    {children}
  </motion.div>
);
