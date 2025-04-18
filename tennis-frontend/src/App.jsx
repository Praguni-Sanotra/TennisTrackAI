import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  LinearProgress, 
  ThemeProvider,
  Paper,
  Fade
} from '@mui/material';
import { CloudUpload, PlayArrow, Assessment } from '@mui/icons-material';
import { theme } from './theme/theme';
import VideoPlayer from './components/VideoPlayer';
import AnalysisReport from './components/AnalysisReport';
import './styles/globals.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [showReport, setShowReport] = useState(false);

  const handleAnalyze = () => {
    if (!selectedFile) return;
    
    setAnalyzing(true);
    setVideoUrl(null);

    setTimeout(() => {
      setVideoUrl(`http://localhost:5001/output_video?t=${Date.now()}`);
      setAnalyzing(false);
    }, 3500);
  };

  const handleReviewReport = () => {
    setShowReport(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', py: 4 }}>
        <Container maxWidth="lg">
          <Paper elevation={24} sx={{ p: 4 }}>
            <Typography variant="h1" align="center" sx={{ mb: 6 }}>
              Tennis Analysis AI
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <input
                accept="video/*"
                type="file"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                style={{ display: 'none' }}
                id="video-upload"
              />
              <label htmlFor="video-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<CloudUpload />}
                >
                  {selectedFile ? "Video Selected ✓" : "Upload Video"}
                </Button>
              </label>

              <Button
                variant="contained"
                onClick={handleAnalyze}
                disabled={analyzing || !selectedFile}
                startIcon={<PlayArrow />}
                sx={{
                  background: 'linear-gradient(45deg, #00f5d4, #7209b7)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #00d4b8, #6308a1)',
                  },
                }}
              >
                Analyze Video
              </Button>
            </Box>

            {analyzing && (
              <Box sx={{ my: 4 }}>
                <LinearProgress 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(45deg, #00f5d4, #7209b7)',
                    }
                  }} 
                />
                <Typography align="center" sx={{ mt: 2, color: 'text.secondary' }}>
                  Analyzing video...
                </Typography>
              </Box>
            )}

            <Fade in={Boolean(videoUrl)} timeout={1000}>
              <Box sx={{ mt: 4 }}>
                {videoUrl && (
                  <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" align="center">Processed Video</Typography>
                    <VideoPlayer videoUrl={videoUrl} muted={true} />
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      mt: 3,
                      mb: 2 
                    }}>
                      <Button
                        variant="contained"
                        startIcon={<Assessment />}
                        onClick={handleReviewReport}
                        sx={{
                          background: 'linear-gradient(45deg, #00f5d4, #7209b7)',
                          borderRadius: '12px',
                          padding: '12px 28px',
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
                  </Box>
                )}
              </Box>
            </Fade>

            {showReport && (
              <Fade in={showReport} timeout={1000}>
                <Box sx={{ mt: 4 }}>
                  <AnalysisReport />
                </Box>
              </Fade>
            )}
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;