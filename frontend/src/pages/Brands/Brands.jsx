import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { getBrands, removeBrand } from "./brandStorage";
import { pageEnterAnimation } from "../../animation/pageAnimations";

export default function Brands() {
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  useEffect(() => { getBrands().then(setBrands).catch(console.error); }, []);
  async function handleDelete(id) {
    await removeBrand(id);
    setBrands(await getBrands());
  }
  return (
    <Box component="section" sx={pageEnterAnimation}>
      <Stack spacing={1} sx={{ mb: 4 }}>
        <Typography component="h1" variant="h4" fontWeight={600}>Brands</Typography>
        <Typography color="text.secondary">Manage the brands available for your equipment catalog.</Typography>
        <Button variant="contained" sx={{ alignSelf: "flex-start", mt: 2 }} onClick={() => navigate("/brands/new")}>Add brand</Button>
      </Stack>
      <Paper sx={{ p: 2 }}>
        {brands.length === 0 ? <Typography color="text.secondary" sx={{ p: 2 }}>No brands registered yet.</Typography> : <List>{brands.map((brand) => <ListItem key={brand.id} divider secondaryAction={<IconButton onClick={() => handleDelete(brand.id)}><DeleteIcon /></IconButton>}><ListItemText primary={<Link to={`/brands/${brand.id}`}>{brand.name}</Link>} /></ListItem>)}</List>}
      </Paper>
    </Box>
  );
}
