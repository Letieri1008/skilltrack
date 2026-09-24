import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { NavLink } from "react-router-dom";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import {
  sidebarItemAnimation,
  sidebarPaperAnimation,
} from "../animation/sidebarAnimations";

const sidebarWidth = 260;

const menuItems = [
  { label: "Dashboard", path: "/dashboard", icon: DashboardOutlinedIcon },
  { label: "Equipment", path: "/equipment", icon: DevicesOutlinedIcon },
  { label: "Brands", path: "/brands", icon: BusinessOutlinedIcon },
  { label: "Models", path: "/models", icon: CategoryOutlinedIcon },
  { label: "Inventory", path: "/inventory", icon: Inventory2OutlinedIcon },
  { label: "Settings", path: "/settings", icon: SettingsOutlinedIcon },
];

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: sidebarWidth,
          height: "100dvh",
          boxSizing: "border-box",
          p: "28px 18px",
          bgcolor: "#111827",
          color: "#fff",
          border: 0,
          overflowX: "hidden",
          ...sidebarPaperAnimation,
        },
      }}
    >
      <Box
        component="aside"
        sx={{ display: "flex", flexDirection: "column", flex: 1 }}
      >
        <Box sx={{ px: 2, mb: 4 }}>
          <Typography
            component="h1"
            sx={{
              fontFamily: '"Segoe UI", Arial, sans-serif',
              fontSize: 21,
              fontWeight: 400,
              lineHeight: 1.15,
              letterSpacing: 0.2,
              color: "#fff",
              whiteSpace: "nowrap",
            }}
          >
            Asset Management
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              fontSize: 12,
              color: "#9ca3af",
              whiteSpace: "nowrap",
            }}
          >
            SkillTrack
          </Typography>
        </Box>

        <Typography
          component="h2"
          sx={{
            px: 2,
            mb: 1,
            fontSize: 12,
            fontWeight: 700,
            color: "#9ca3af",
          }}
        >
          Workspace sections
        </Typography>

        <List>
          {menuItems.map(({ label, path, icon: Icon }) => (
            <ListItem key={path} disablePadding sx={sidebarItemAnimation}>
              <ListItemButton
                component={NavLink}
                to={path}
                sx={{ px: 2, py: 1, color: "#cbd5e1", "&.active": { color: "#fff", bgcolor: "rgba(255, 255, 255, 0.1)" } }}
              >
                <ListItemIcon sx={{ minWidth: 36, color: "inherit" }}>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Typography sx={{ mt: "auto", pt: 4, fontSize: 12, color: "#9ca3af" }}>
          Power by Matheus Letieri
        </Typography>
      </Box>
    </Drawer>
  );
}
