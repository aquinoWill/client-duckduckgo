import { Box, CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <Box sx={{ textAlign: "center", py: 4 }}>
      <CircularProgress  />
    </Box>
  );
}
