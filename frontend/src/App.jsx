import Box from "@mui/material/Box";
import Sidebar from "./components/Sidebar.jsx";
import Equipment from "./pages/Equipment/Equipment.jsx";
import EquipmentForm from "./pages/Equipment/EquipmentForm.jsx";
import EquipmentDetails from "./pages/Equipment/EquipmentDetails.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Brands from "./pages/Brands/Brands.jsx";
import Models from "./pages/Models/Models.jsx";
import BrandForm from "./pages/Brands/BrandForm.jsx";
import ModelForm from "./pages/Models/ModelForm.jsx";
import Inventory from "./pages/Inventory/Inventory.jsx";
import Settings from "./pages/Settings/Settings.jsx";
import { Navigate, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <Box component="main" sx={{ flex: 1, p: 4, bgcolor: "#f8fafc" }}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/equipment/new" element={<EquipmentForm />} />
          <Route path="/equipment/:id/edit" element={<EquipmentForm />} />
          <Route path="/equipment/:id" element={<EquipmentDetails />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/brands/new" element={<BrandForm />} />
          <Route path="/models" element={<Models />} />
          <Route path="/models/new" element={<ModelForm />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/" element={<Navigate to="/equipment" replace />} />
          <Route path="*" element={<Navigate to="/equipment" replace />} />
        </Routes>
      </Box>
    </Box>
  );
}
