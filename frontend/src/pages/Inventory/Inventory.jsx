import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import SuccessSnackbar from "../../components/SuccessSnackbar";
import { pageEnterAnimation } from "../../animation/pageAnimations";
import { getEquipment, saveEquipment } from "../Equipment/equipmentStorage";

const statusOptions = ["Available", "In use", "Under maintenance", "Retired"];

export default function Inventory() {
  const [equipment, setEquipment] = useState([]);
  const [successOpen, setSuccessOpen] = useState(false);

  useEffect(() => { getEquipment().then(setEquipment).catch(console.error); }, []);

  function handleStatusChange(item, status) {
    const updatedItem = { ...item, status };
    saveEquipment(updatedItem).then(() => getEquipment()).then(setEquipment);
    setSuccessOpen(true);
  }

  return (
    <Box component="section" sx={pageEnterAnimation}>
      <Stack spacing={1} sx={{ mb: 4 }}>
        <Typography component="h1" variant="h4" fontWeight={600}>
          Inventory
        </Typography>
        <Typography color="text.secondary">
          Track equipment availability and movement.
        </Typography>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Asset number</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Responsible person</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {equipment.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No equipment registered yet.
                </TableCell>
              </TableRow>
            ) : (
              equipment.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>{item.assetNumber}</TableCell>
                  <TableCell>{item.location || "—"}</TableCell>
                  <TableCell>{item.responsiblePerson || "—"}</TableCell>
                  <TableCell>
                    <Select
                      size="small"
                      value={item.status}
                      onChange={(event) =>
                        handleStatusChange(item, event.target.value)
                      }
                    >
                      {statusOptions.map((status) => (
                        <MenuItem key={status} value={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <SuccessSnackbar
        open={successOpen}
        message="Equipment status updated successfully."
        onClose={() => setSuccessOpen(false)}
      />
    </Box>
  );
}
