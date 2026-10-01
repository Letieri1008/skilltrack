import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import SuccessSnackbar from "../../components/SuccessSnackbar";
import { formCardAnimation, pageEnterAnimation } from "../../animation/pageAnimations";

import { findEquipment, saveEquipment } from "./equipmentStorage";

const emptyEquipment = {
  assetNumber: "",
  serialNumber: "",
  brand: "",
  model: "",
  status: "Available",
  location: "",
  responsiblePerson: "",
  notes: "",
};

const statusOptions = [
  "Available",
  "In use",
  "Under maintenance",
  "Retired",
];

const fieldLabel = (fieldName) =>
  fieldName.replace(/([A-Z])/g, " $1");

export default function EquipmentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyEquipment);
  const [successOpen, setSuccessOpen] = useState(false);

  useEffect(() => {
    if (id) {
      findEquipment(id).then((equipment) => setForm(equipment || emptyEquipment));
    }
  }, [id]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    saveEquipment(form);
    setSuccessOpen(true);
    window.setTimeout(() => navigate("/equipment"), 1200);
  }

  return (
    <Box component="section" maxWidth="md" sx={pageEnterAnimation}>
      <Stack spacing={1} sx={{ mb: 4 }}>
        <Typography component="h1" variant="h4" fontWeight={600}>
          {id ? "Edit equipment" : "Add equipment"}
        </Typography>
        <Typography color="text.secondary">
          Enter the information for this physical asset.
        </Typography>
      </Stack>

      <Paper component="form" onSubmit={handleSubmit} sx={{ p: 3, ...formCardAnimation }}>
        <Stack spacing={2}>
          {["assetNumber", "serialNumber", "brand", "model"].map((name) => (
            <TextField
              key={name}
              required
              name={name}
              label={fieldLabel(name)}
              value={form[name]}
              onChange={handleChange}
            />
          ))}

          <TextField
            select
            name="status"
            label="Status"
            value={form.status}
            onChange={handleChange}
          >
            {statusOptions.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>

          {["location", "responsiblePerson"].map((name) => (
            <TextField
              key={name}
              name={name}
              label={fieldLabel(name)}
              value={form[name]}
              onChange={handleChange}
            />
          ))}

          <TextField
            name="notes"
            label="Notes"
            multiline
            minRows={3}
            value={form.notes}
            onChange={handleChange}
          />

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button type="button" onClick={() => navigate("/equipment")}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Save equipment
            </Button>
          </Stack>
        </Stack>
      </Paper>
      <SuccessSnackbar open={successOpen} message={id ? "Equipment updated successfully." : "Equipment registered successfully."} onClose={() => setSuccessOpen(false)} />
    </Box>
  );
}
