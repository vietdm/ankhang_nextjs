import { Box } from "@mui/material";

export const Error = ({ mgs }: { mgs: string }) => {
  return (
    <Box
      sx={{
        width: "100%",
        color: "#bb4545",
        paddingLeft: "20px",
        fontStyle: "italic",
        marginTop: "7px",
        fontSize: "14px",
      }}
    >
      {mgs}
    </Box>
  );
};
