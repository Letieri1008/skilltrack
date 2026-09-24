import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function Settings() {
  return (
    <Box component="section">
      <Stack spacing={1}>
        <Typography component="h1" variant="h4" fontWeight={600}>Settings</Typography>
        <Typography color="text.secondary">Configure the application and inventory preferences.</Typography>
      </Stack>
    </Box>
  );
}
