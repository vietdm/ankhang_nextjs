import { Box, Stack } from "@mui/material";
import Link from "next/link";

export const BoxMenu = ({ children }: { children: any }) => {
  return (
    <Box width="50%" padding="5px">
      <Stack
        justifyContent="space-between"
        padding="5px"
        minHeight="100px"
        sx={{
          boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.2)",
          borderRadius: "4px",
          background: "radial-gradient(#f4f9fd, #bae4f4)",
        }}
      >
        {children}
      </Stack>
    </Box>
  );
};

export const BoxMenuLink = ({ children, link }: { children: any, link: string }) => {
  return (
    <Box width="50%" padding="5px">
      <Link passHref href={link}>
        <Stack
          justifyContent="space-between"
          padding="5px"
          minHeight="100px"
          sx={{
            boxShadow: "0 2px 4px 2px rgba(0, 0, 0, 0.2)",
            borderRadius: "4px",
            background: "radial-gradient(#f4f9fd, #bae4f4)",
          }}
        >
          {children}
        </Stack>
      </Link>
    </Box>
  );
};
