import React, { useState } from 'react';
import { Box, Button, Container, Typography, LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VideoPlayer from './components/VideoPlayer';

function App() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);

  const handleAnalyze = () => {
    if (!selectedFile) {
      alert("Please upload a video first.");
      return;
    }

    console.log("Simulating video analysis...");

    setAnalyzing(true);
    setVideoUrl(null); // Reset video before analysis

    // Simulate processing delay (3-4 seconds)
    setTimeout(() => {
      console.log("Processing complete! Displaying video...");
      setVideoUrl(`http://localhost:5001/output_video?t=${Date.now()}`);
      setAnalyzing(false);
    }, 3500); // 3.5 seconds delay
  };

  const handleReviewReport = () => {
    navigate('/report');
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Tennis Analysis
        </Typography>

        {/* File Upload */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 3, gap: 2 }}>
          <input
            accept="video/*"
            type="file"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            style={{ display: 'none' }}
            id="video-upload"
          />
          <label htmlFor="video-upload">
            <Button variant="outlined" component="span">
              {selectedFile ? "Video Selected ✅" : "Upload Video"}
            </Button>
          </label>

          <Button variant="contained" onClick={handleAnalyze} disabled={analyzing || !selectedFile}>
            Analyze Video
          </Button>
        </Box>

        {analyzing && (
          <Box sx={{ my: 2 }}>
            <LinearProgress />
            <Typography align="center" sx={{ mt: 1 }}>
              Processing video...
            </Typography>
          </Box>
        )}

        {videoUrl && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" align="center">Processed Video</Typography>
            <VideoPlayer videoUrl={videoUrl} muted={true} />
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button 
                variant="contained"
                onClick={handleReviewReport}
                sx={{
                  background: 'linear-gradient(45deg, #00f5d4, #7209b7)',
                  color: 'white',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #00d4b8, #6308a1)',
                  }
                }}
              >
                Review Report
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default App;
