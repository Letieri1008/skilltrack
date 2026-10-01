import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { findEquipment } from "./equipmentStorage";

export default function EquipmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [equipment, setEquipment] = useState(null);
  useEffect(() => { findEquipment(id).then(setEquipment).catch(() => setEquipment(false)); }, [id]);

  if (!equipment) {
    return <Typography>Equipment not found.</Typography>;
  }

  const details = Object.entries(equipment).filter(
    ([key]) => key !== "id",
  );

  return (
    <Box component="section" maxWidth="md">
      <Stack spacing={1} sx={{ mb: 4 }}>
        <Typography component="h1" variant="h4" fontWeight={600}>
          Equipment details
        </Typography>
        <Typography color="text.secondary">
          Review the information for this asset.
        </Typography>
      </Stack>

      <Paper sx={{ p: 3 }}>
        <Stack spacing={1}>
          {details.map(([key, value]) => (
            <Typography key={key}>
              <strong>{key}:</strong> {value || "—"}
            </Typography>
          ))}

          <Button
            sx={{ alignSelf: "flex-start", mt: 2 }}
            variant="outlined"
            onClick={() => navigate(`/equipment/${id}/edit`)}
          >
            Edit equipment
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
