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
import { saveModel } from "./modelStorage";

export default function ModelForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", brand: "" });
  const [successOpen, setSuccessOpen] = useState(false);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    saveModel(form);
    setSuccessOpen(true);
    window.setTimeout(() => navigate("/models"), 1200);
  }

  return (
    <Box component="section" maxWidth="sm" sx={pageEnterAnimation}>
      <Stack spacing={1} sx={{ mb: 4 }}>
        <Typography component="h1" variant="h4" fontWeight={600}>Add model</Typography>
        <Typography color="text.secondary">Register an equipment model and its brand.</Typography>
      </Stack>
      <Paper component="form" onSubmit={handleSubmit} sx={{ p: 3, ...formCardAnimation }}>
        <Stack spacing={2}>
          <TextField required name="name" label="Model name" value={form.name} onChange={handleChange} />
          <TextField required name="brand" label="Brand" value={form.brand} onChange={handleChange} />
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button onClick={() => navigate("/models")}>Cancel</Button>
            <Button type="submit" variant="contained">Save model</Button>
          </Stack>
        </Stack>
      </Paper>
      <SuccessSnackbar open={successOpen} message="Model registered successfully." onClose={() => setSuccessOpen(false)} />
    </Box>
  );
}
