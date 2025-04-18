import React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { Assessment } from '@mui/icons-material';

const VideoPlayer = ({ videoUrl }) => {
  return (
    <Paper 
      elevation={8}
      sx={{
        overflow: 'hidden',
        background: 'linear-gradient(145deg, rgba(26,26,26,0.8), rgba(42,42,42,0.8))',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Typography variant="h6" sx={{ p: 2, color: 'primary.main' }}>
        Analysis Results
      </Typography>
      <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
        <video
          controls
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
          key={videoUrl}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support video playback.
        </video>
      </Box>
      
      {/* Review Report Button */}
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.2)',
        borderTop: '1px solid rgba(255,255,255,0.05)'
      }}>
        <Button
          variant="contained"
          startIcon={<Assessment />}
          onClick={() => console.log('Generate report')}
          sx={{
            background: 'linear-gradient(45deg, #00f5d4, #7209b7)',
            borderRadius: '12px',
            padding: '12px 24px',
            fontWeight: '600',
            letterSpacing: '0.5px',
            textTransform: 'none',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            '&:hover': {
              background: 'linear-gradient(45deg, #00d4b8, #6308a1)',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(0,245,212,0.2)',
            },
            '&:active': {
              transform: 'translateY(0)',
            }
          }}
        >
          Review Analysis Report
        </Button>
      </Box>
    </Paper>
  );
};

export default VideoPlayer;