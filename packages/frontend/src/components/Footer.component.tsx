import { Box, Divider, Stack, Typography, useTheme } from "@mui/material";
import { FC } from "react";

export const Footer: FC = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{ backgroundColor: theme.palette.primary.main, padding: 5 }}
    >
      <Stack spacing={5}>
        <Stack direction="row" spacing={2}>
          <Typography variant="h3" sx={{ color: "white" }}>
            Home
          </Typography>
          <Typography variant="h3" sx={{ color: "white" }}>
            Enter Credentials
          </Typography>
        </Stack>

        <Divider variant="middle" sx={{ borderColor: "white" }} />

        <Typography variant="body1" sx={{ color: "white" }}>
          © 2022 TPAT All Right Reserved v0.5.5
        </Typography>
      </Stack>
    </Box>
  );
};
