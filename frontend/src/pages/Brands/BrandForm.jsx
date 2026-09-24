import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SuccessSnackbar from "../../components/SuccessSnackbar";
import { formCardAnimation, pageEnterAnimation } from "../../animation/pageAnimations";
import { saveBrand } from "./brandStorage";

export default function BrandForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    saveBrand({ name });
    setSuccessOpen(true);
    window.setTimeout(() => navigate("/brands"), 1200);
  }

  return (
    <Box component="section" maxWidth="sm" sx={pageEnterAnimation}>
      <Stack spacing={1} sx={{ mb: 4 }}>
        <Typography component="h1" variant="h4" fontWeight={600}>Add brand</Typography>
        <Typography color="text.secondary">Register a brand for the equipment catalog.</Typography>
      </Stack>
      <Paper component="form" onSubmit={handleSubmit} sx={{ p: 3, ...formCardAnimation }}>
        <Stack spacing={2}>
          <TextField required label="Brand name" value={name} onChange={(event) => setName(event.target.value)} />
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button onClick={() => navigate("/brands")}>Cancel</Button>
            <Button type="submit" variant="contained">Save brand</Button>
          </Stack>
        </Stack>
      </Paper>
      <SuccessSnackbar open={successOpen} message="Brand registered successfully." onClose={() => setSuccessOpen(false)} />
    </Box>
  );
}
