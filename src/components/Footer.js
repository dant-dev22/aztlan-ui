// ./components/Footer.js
import React from 'react';
import { Box, IconButton, Link } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: 'white', // Fondo blanco
        color: 'black', // Texto negro
        padding: '1rem 0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <Link href="https://www.instagram.com/aztlan_bjj" target="_blank" sx={{ color: 'black', margin: '0 1rem' }}>
        <IconButton sx={{ color: 'black' }}>
          <InstagramIcon />
        </IconButton>
      </Link>
      <Link href="https://www.facebook.com/profile.php?id=100090876214567" target="_blank" sx={{ color: 'black', margin: '0 1rem' }}>
        <IconButton sx={{ color: 'black' }}>
          <FacebookIcon />
        </IconButton>
      </Link>
      <Link href="https://www.youtube.com/@AztlanBjj" target="_blank" sx={{ color: 'black', margin: '0 1rem' }}>
        <IconButton sx={{ color: 'black' }}>
          <YouTubeIcon />
        </IconButton>
      </Link>
    </Box>
  );
};

export default Footer;
