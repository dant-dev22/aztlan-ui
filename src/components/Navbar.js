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
    <AppBar position="static" sx={{ backgroundColor: "#f5f5f5" }}> {/* Gris claro */}
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "center", // Centrar el contenido
          flexWrap: "wrap",
        }}
      >
        {/* Botón de hamburguesa para dispositivos móviles */}
        <Box
          sx={{
            display: { xs: "block", sm: "none" },
            position: "absolute",
            left: 0,
          }}
        >
          <IconButton
            edge="start"
            sx={{ color: "black" }} // Botón de hamburguesa negro
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                Registro
              </Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link
                to="/aztlan-2024"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Aztlan 2024
              </Link>
            </MenuItem>
          </Menu>
        </Box>

        {/* Menú de navegación para pantallas grandes */}
        <Box sx={{ display: { xs: "none", sm: "flex" } }}>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "white",
              margin: "0 1rem",
            }}
          >
            <Typography variant="body1" sx={{ color: "black" }}>
              Registro
            </Typography>
          </Link>
          <Link
            to="/aztlan-2024"
            style={{
              textDecoration: "none",
              color: "white",
              margin: "0 1rem",
            }}
          >
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
