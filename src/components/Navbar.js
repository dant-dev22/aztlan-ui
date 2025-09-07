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
    <AppBar
      position="fixed"       // <--- fijo sobre la ventana
      elevation={0}          // quita sombra
      sx={{
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: "transparent", // fondo transparente
        boxShadow: "none",
        zIndex: 1000,         // <--- encima de todo
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "center",
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
            sx={{ color: "white" }}
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
            style={{ textDecoration: "none", margin: "0 1rem" }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "white",
                transition: "all 0.3s ease",
                "&:hover": {
                  color: "#FF5722",
                  textShadow: "0 0 8px #FF5722",
                  transform: "scale(1.1)",
                },
              }}
            >
              Registro
            </Typography>
          </Link>
          <Link
            to="/aztlan-2024"
            style={{ textDecoration: "none", margin: "0 1rem" }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "white",
                transition: "all 0.3s ease",
                "&:hover": {
                  color: "#FFC107",
                  textShadow: "0 0 8px #FFC107",
                  transform: "scale(1.1)",
                },
              }}
            >
              Aztlan 2024
            </Typography>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
