import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Box, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar
      position="fixed" // fijo sobre la ventana
      elevation={0} // quita sombra
      sx={{
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: "transparent", // fondo transparente
        boxShadow: "none",
        zIndex: 1000, // encima de todo
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {/*
        --- Botón de hamburguesa comentado ---
        <Box
          sx={{
            display: { xs: "block", sm: "none" },
            position: "absolute",
            left: 0,
          }}
        >
          <IconButton
            edge="start"
            sx={{
              color: "white",
              filter: "drop-shadow(0 0 6px rgba(0,0,0,0.8))",
              "&:hover": {
                color: "#FF5722",
                filter: "drop-shadow(0 0 8px #FF5722)",
                transform: "scale(1.2)",
              },
            }}
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
        */}

        {/* Menú de navegación para pantallas grandes */}
        <Box sx={{ display: "flex" }}>
          {/*
          --- Opción de Registro comentada ---
          <Link to="/" style={{ textDecoration: "none", margin: "0 1rem" }}>
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
          */}

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
