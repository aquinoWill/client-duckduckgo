import { Box, CircularProgress } from "@mui/material";

export function Loading() {
  return (
    <Box sx={{ textAlign: "center", py: 4 }}>
      <CircularProgress  />
    </Box>
  );
}

export default Loading;
