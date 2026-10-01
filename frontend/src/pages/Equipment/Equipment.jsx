import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/Delete";
import { getEquipment, removeEquipment } from "./equipmentStorage";
import { pageEnterAnimation } from "../../animation/pageAnimations";

export default function Equipment() {
  const navigate = useNavigate();
  const [equipment, setEquipment] = useState([]);
  useEffect(() => { getEquipment().then(setEquipment).catch(console.error); }, []);
  const remove = async (id) => { await removeEquipment(id); setEquipment(await getEquipment()); };
  return (
    <Box component="section" sx={pageEnterAnimation}>
      <Stack spacing={1} sx={{ mb: 4 }}>
        <Typography component="h1" variant="h4" fontWeight={600}>Equipment</Typography>
        <Typography color="text.secondary">Manage the equipment registered in your inventory.</Typography>
        <Button variant="contained" sx={{ alignSelf: "flex-start", mt: 2 }} onClick={() => navigate("/equipment/new")}>Add equipment</Button>
      </Stack>
      <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid", borderColor: "divider" }}>
        <Table><TableHead><TableRow><TableCell>Asset number</TableCell><TableCell>Serial number</TableCell><TableCell>Brand</TableCell><TableCell>Model</TableCell><TableCell>Status</TableCell><TableCell align="right">Actions</TableCell></TableRow></TableHead>
          <TableBody>{equipment.length === 0 ? <TableRow><TableCell colSpan={6} align="center" sx={{ py: 6 }}><Typography color="text.secondary">No equipment registered yet.</Typography></TableCell></TableRow> : equipment.map((item) => <TableRow key={item.id} hover><TableCell><Link to={`/equipment/${item.id}`}>{item.assetNumber}</Link></TableCell><TableCell>{item.serialNumber}</TableCell><TableCell>{item.brand}</TableCell><TableCell>{item.model}</TableCell><TableCell>{item.status}</TableCell><TableCell align="right"><IconButton component={Link} to={`/equipment/${item.id}/edit`} aria-label="Edit equipment"><EditOutlinedIcon /></IconButton><IconButton onClick={() => remove(item.id)} aria-label="Delete equipment"><DeleteOutlineIcon /></IconButton></TableCell></TableRow>)}</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
