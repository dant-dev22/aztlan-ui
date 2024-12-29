import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Box, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "white" }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "center", // Centrar el contenido
          flexWrap: "wrap",
        }}
      >
        {/* Botón de hamburguesa para dispositivos móviles */}
        <Box sx={{ display: { xs: "block", sm: "none" }, position: "absolute", left: 0 }}>
          <IconButton edge="start" color="inherit" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>Inicio</Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link to="/admin-aztlan" style={{ textDecoration: "none", color: "inherit" }}>Admin</Link>
            </MenuItem>
          </Menu>
        </Box>

        {/* Menú de navegación para pantallas grandes */}
        <Box sx={{ display: { xs: "none", sm: "flex" } }}>
          <Link to="/" style={{ textDecoration: "none", color: "white", margin: "0 1rem" }}>
            <Typography variant="body1" sx={{ color: "black" }}>
                Inicio
            </Typography>
          </Link>
          <Link to="/aztlan-2024" style={{ textDecoration: "none", color: "white", margin: "0 1rem" }}>
            <Typography variant="body1" sx={{ color: "black" }}>
               Aztlan 2024 
            </Typography>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
