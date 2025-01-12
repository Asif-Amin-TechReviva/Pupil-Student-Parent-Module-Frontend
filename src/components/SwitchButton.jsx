import React from 'react';
import { Box, Typography } from '@mui/material';

const SwitchButton = ({ activeTab, setActiveTab }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: { xs: '60px', md: '120px' }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: '20px',
          height: '40px',
          backgroundColor: '#d3d3d3',
          position: 'relative',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
          cursor: 'pointer',
          width: { xs: '100%', sm: '60%', md: '50%' }
        }}
      >
        {/* Toggle Indicator */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: activeTab === 'ongoing' ? '0%' : '50%',
            width: '50%',
            height: '100%',
            backgroundColor: '#4285F4',
            borderRadius: '20px',
            transition: 'left 0.3s ease-in-out'
          }}
        ></Box>

        {/* Ongoing */}
        <Box
          onClick={() => setActiveTab('ongoing')}
          sx={{
            width: '50%',
            textAlign: 'center',
            zIndex: 1,
            color: activeTab === 'ongoing' ? '#fff' : '#000',
            fontWeight: 'bold',
            transition: 'color 0.3s ease'
          }}
        >
          <Typography variant="body1">Ongoing</Typography>
        </Box>

        {/* Previous */}
        <Box
          onClick={() => setActiveTab('previous')}
          sx={{
            width: '50%',
            textAlign: 'center',
            zIndex: 1,
            color: activeTab === 'previous' ? '#fff' : '#000',
            fontWeight: 'bold',
            transition: 'color 0.3s ease'
          }}
        >
          <Typography variant="body1">Over</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SwitchButton;
