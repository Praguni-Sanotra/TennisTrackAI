import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
  Fade,
  Tabs,
  Tab
} from '@mui/material';
import { 
  Speed, 
  DirectionsRun, 
  ArrowBack,
  TipsAndUpdates,
  Assessment,
  CompareArrows,
  SportsTennis,
  Download,
  Timeline, 
  FitnessCenter, 
  Visibility 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

// StatCard Component
const StatCard = ({ title, value, icon, color }) => (
  <Paper
    elevation={4}
    sx={{
      p: 3,
      background: 'rgba(16, 18, 24, 0.95)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      borderRadius: 3,
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: `0 8px 25px ${color}33`,
        borderColor: color,
      },
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Box sx={{ 
        p: 1.5, 
        borderRadius: 2, 
        bgcolor: `${color}22`,
        color: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {icon}
      </Box>
      <Box>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
          {title}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {value}
        </Typography>
      </Box>
    </Box>
  </Paper>
);

// Add AccuracyMeter component
const AccuracyMeter = ({ value, label }) => (
  <Box sx={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
    <Box sx={{ position: 'relative' }}>
      <CircularProgress
        variant="determinate"
        value={100}
        size={80}
        thickness={4}
        sx={{ color: 'rgba(255, 255, 255, 0.1)' }}
      />
      <CircularProgress
        variant="determinate"
        value={value}
        size={80}
        thickness={4}
        sx={{
          position: 'absolute',
          left: 0,
          color: value > 70 ? '#00f5d4' : value > 40 ? '#ff9800' : '#f44336',
        }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {value}%
        </Typography>
      </Box>
    </Box>
    <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
      {label}
    </Typography>
  </Box>
);

// Add more detailed suggestions
const improvementSuggestions = [
  {
    title: "Shot Speed Optimization",
    description: "Increase power generation through improved footwork and core rotation",
    detailedTips: [
      "Focus on hip rotation during serve",
      "Improve follow-through mechanics",
      "Practice split-step timing"
    ],
    icon: <Speed />,
    color: "#00f5d4"
  },
  {
    title: "Positioning Enhancement",
    description: "Maintain closer position to baseline during defensive plays",
    detailedTips: [
      "Adjust recovery position after shots",
      "Improve lateral movement speed",
      "Practice defensive stance transitions"
    ],
    icon: <SportsTennis />,
    color: "#7209b7"
  },
  {
    title: "Movement Efficiency",
    description: "Reduce lateral movement to conserve energy between shots",
    detailedTips: [
      "Optimize court coverage patterns",
      "Improve anticipation skills",
      "Work on quick direction changes"
    ],
    icon: <DirectionsRun />,
    color: "#00f5d4"
  }
];

const analysisData = {
  positionalAnalysis: {
    player1: {
      position: "Baseline defensive stance",
      courtLocation: "Right side, 2m from baseline",
      bodyPosition: "Low center of gravity, ready position",
      advantages: ["Good defensive coverage", "Strong return position"],
      disadvantages: ["Limited attacking options", "Increased court coverage required"]
    },
    player2: {
      position: "Aggressive court position",
      courtLocation: "Mid-court, left side",
      bodyPosition: "Forward-leaning, attacking stance",
      advantages: ["Pressure position", "Shorter reaction time needed"],
      disadvantages: ["Vulnerable to lobs", "Less recovery time"]
    }
  },
  ballTracking: {
    currentSpeed: "45.3 km/h",
    trajectory: "Cross-court",
    spin: "Topspin",
    height: "0.9m at net"
  }
};

// Add this constant before the AnalysisReport component
const pdfStyles = {
  page: {
    fontFamily: 'Helvetica',
    padding: 20,
    backgroundColor: '#13151a',
    color: '#ffffff',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  section: {
    marginBottom: 15,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: 15,
  },
  tableCell: {
    border: '1px solid #2a2a2a',
    padding: 8,
  },
};

// Add this helper function before the AnalysisReport component
const getAllTabsContent = (currentTab, setActiveTab) => {
  const tabs = [0, 1, 2, 3];
  const originalTab = currentTab;
  
  return new Promise(async (resolve) => {
    const report = document.getElementById('tennis-report');
    const reportClone = report.cloneNode(true);
    
    // Hide tabs navigation in clone
    const tabsElement = reportClone.querySelector('.MuiTabs-root');
    if (tabsElement) {
      tabsElement.style.display = 'none';
    }

    // Show all tab contents
    tabs.forEach(tabIndex => {
      const tabContent = reportClone.querySelector(`[data-tab="${tabIndex}"]`);
      if (tabContent) {
        tabContent.style.display = 'block';
        tabContent.style.opacity = '1';
      }
    });

    resolve(reportClone);
  });
};

// Update AnalysisReport component
const AnalysisReport = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  // Move accuracyMetrics inside component
  const accuracyMetrics = {
    tracking: 85,
    speed: 78,
    position: 92
  };

  // Move createPDFContent inside component
  const createPDFContent = () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    let yOffset = 20;

    const addText = (text, fontSize = 12, isBold = false) => {
      pdf.setFontSize(fontSize);
      pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
      
      // Handle automatic page breaks
      if (yOffset > 270) {
        pdf.addPage();
        pdf.setFillColor(19, 21, 26);
        pdf.rect(0, 0, pageWidth, pdf.internal.pageSize.getHeight(), 'F');
        pdf.setTextColor(255, 255, 255);
        yOffset = 20;
      }
      
      pdf.text(text, 20, yOffset);
      yOffset += fontSize + 4;
    };

    // Set initial page background and text color
    pdf.setFillColor(19, 21, 26);
    pdf.rect(0, 0, pageWidth, pdf.internal.pageSize.getHeight(), 'F');
    pdf.setTextColor(255, 255, 255);

    // Title Page
    addText('Tennis Match Analysis Report', 24, true);
    yOffset += 10;
    addText('Event: ATP Tennis Match', 14);
    addText('Venue: Vienna', 14);
    addText('Players: Novak Djokovic vs. Lorenzo Sonego', 14);
    yOffset += 15;

    addText('Analysis Accuracy Metrics', 18, true);
    Object.entries(accuracyMetrics).forEach(([key, value]) => {
      addText(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}%`, 12);
    });

    // Player Stats Page (Tab 1)
    pdf.addPage();
    yOffset = 20;
    pdf.setFillColor(19, 21, 26);
    pdf.rect(0, 0, pageWidth, pdf.internal.pageSize.getHeight(), 'F');
    addText('Player Statistics', 20, true);
    yOffset += 10;

    ['Djokovic', 'Sonego'].forEach((player, index) => {
      addText(`Player ${index + 1} - ${player}`, 16, true);
      yOffset += 5;
      addText('Main Statistics:', 14, true);
      if (index === 0) {
        addText('• Shot Speed: 45.3 km/h', 12);
        addText('• Player Speed: 6.7 km/h', 12);
        addText('• Average Shot Speed: 39.2 km/h', 12);
        addText('• Average Player Speed: 5.6 km/h', 12);
      } else {
        addText('• Shot Speed: 32.3 km/h', 12);
        addText('• Player Speed: 9.0 km/h', 12);
        addText('• Average Shot Speed: 37.6 km/h', 12);
        addText('• Average Player Speed: 5.3 km/h', 12);
      }
      yOffset += 10;
    });

    // Comparison Page (Tab 2)
    pdf.addPage();
    yOffset = 20;
    pdf.setFillColor(19, 21, 26);
    pdf.rect(0, 0, pageWidth, pdf.internal.pageSize.getHeight(), 'F');
    addText('Performance Comparison', 20, true);
    yOffset += 10;

    const comparisons = [
      ['Shot Speed (P1)', '45.3 km/h', '120-140 km/h', 'Much lower'],
      ['Shot Speed (P2)', '32.3 km/h', '120-140 km/h', 'Much lower'],
      ['Player Speed (P1)', '6.7 km/h', '10-12 km/h', 'Lower'],
      ['Player Speed (P2)', '9.0 km/h', '10-12 km/h', 'Slightly lower']
    ];

    comparisons.forEach(([metric, current, avg, diff]) => {
      addText(metric, 14, true);
      addText(`Current: ${current}`, 12);
      addText(`ATP Average: ${avg}`, 12);
      addText(`Difference: ${diff}`, 12);
      yOffset += 8;
    });

    // Analysis Page (Tab 3)
    pdf.addPage();
    yOffset = 20;
    pdf.setFillColor(19, 21, 26);
    pdf.rect(0, 0, pageWidth, pdf.internal.pageSize.getHeight(), 'F');
    addText('Technical Analysis', 20, true);
    yOffset += 10;

    Object.entries(analysisData.positionalAnalysis).forEach(([player, data], index) => {
      addText(`Player ${index + 1} Analysis`, 16, true);
      addText(`Position: ${data.position}`, 12);
      addText(`Court Location: ${data.courtLocation}`, 12);
      addText(`Body Position: ${data.bodyPosition}`, 12);
      addText('Advantages:', 12, true);
      data.advantages.forEach(adv => addText(`• ${adv}`, 12));
      addText('Disadvantages:', 12, true);
      data.disadvantages.forEach(dis => addText(`• ${dis}`, 12));
      yOffset += 10;
    });

    addText('Ball Trajectory Analysis', 16, true);
    Object.entries(analysisData.ballTracking).forEach(([key, value]) => {
      addText(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`, 12);
    });

    // Suggestions Page (Tab 4)
    pdf.addPage();
    yOffset = 20;
    pdf.setFillColor(19, 21, 26);
    pdf.rect(0, 0, pageWidth, pdf.internal.pageSize.getHeight(), 'F');
    addText('Improvement Suggestions', 20, true);
    yOffset += 10;

    improvementSuggestions.forEach((suggestion, index) => {
      addText(`${index + 1}. ${suggestion.title}`, 16, true);
      addText(suggestion.description, 12);
      addText('Key Focus Areas:', 14, true);
      suggestion.detailedTips.forEach(tip => {
        addText(`• ${tip}`, 12);
      });
      yOffset += 10;
    });

    return pdf;
  };

  // Move generatePDF inside component
  const handleGeneratePDF = async () => {
    try {
      setIsGenerating(true);
      const pdf = createPDFContent();
      pdf.save('tennis-analysis-report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Update the Export button onClick handler
  return (
    <Box sx={{ minHeight: '100vh', py: 4, px: 2 }}>
      <Paper 
        id="tennis-report"
        elevation={24}
        sx={{
          p: 4,
          background: 'rgba(16, 18, 24, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/')}
          >
            Back to Video
          </Button>
          
          <Button
            startIcon={<Download />}
            onClick={handleGeneratePDF}
            disabled={isGenerating}
            sx={{
              background: 'linear-gradient(45deg, #00f5d4, #7209b7)',
              color: 'white',
              '&:hover': {
                background: 'linear-gradient(45deg, #00d4b8, #6308a1)',
              },
              '&:disabled': {
                background: 'rgba(255, 255, 255, 0.12)',
              }
            }}
          >
            {isGenerating ? 'Generating PDF...' : 'Export Report'}
          </Button>
        </Box>

        <Typography 
          variant="h4" 
          sx={{
            mb: 4,
            background: 'linear-gradient(45deg, #00f5d4, #7209b7)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}
        >
          Tennis Match Analysis Report
        </Typography>

        <Box 
          className="accuracy-meters"
          sx={{ mb: 4, display: 'flex', justifyContent: 'space-around' }}
        >
          <AccuracyMeter value={accuracyMetrics.tracking} label="Tracking Accuracy" />
          <AccuracyMeter value={accuracyMetrics.speed} label="Speed Analysis" />
          <AccuracyMeter value={accuracyMetrics.position} label="Position Detection" />
        </Box>

        <Tabs 
          value={activeTab} 
          onChange={(e, newValue) => setActiveTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            mb: 3,
            '& .MuiTabs-indicator': {
              background: 'linear-gradient(45deg, #00f5d4, #7209b7)',
              height: '3px',
              borderRadius: '2px',
            },
            '& .MuiTab-root': {
              color: 'rgba(255,255,255,0.7)',
              fontWeight: 600,
              textTransform: 'none',
              minHeight: 48,
              '&.Mui-selected': {
                color: '#00f5d4',
              },
            }
          }}
        >
          <Tab icon={<Assessment />} label="Player Stats" />
          <Tab icon={<CompareArrows />} label="Comparison" />
          <Tab icon={<SportsTennis />} label="Analysis" />
          <Tab icon={<TipsAndUpdates />} label="Suggestions" />
        </Tabs>

        <Fade in={activeTab === 0}>
          <Box 
            data-tab="0" 
            sx={{ display: activeTab === 0 ? 'block' : 'none' }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                  Player 1 (Djokovic)
                </Typography>
                <Box sx={{ display: 'grid', gap: 2 }}>
                  <StatCard
                    title="Shot Speed"
                    value="45.3 km/h"
                    icon={<Speed />}
                    color="#00f5d4"
                  />
                  <StatCard
                    title="Player Speed"
                    value="6.7 km/h"
                    icon={<DirectionsRun />}
                    color="#7209b7"
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                  Player 2 (Sonego)
                </Typography>
                <Box sx={{ display: 'grid', gap: 2 }}>
                  <StatCard
                    title="Shot Speed"
                    value="32.3 km/h"
                    icon={<Speed />}
                    color="#00f5d4"
                  />
                  <StatCard
                    title="Player Speed"
                    value="9.0 km/h"
                    icon={<DirectionsRun />}
                    color="#7209b7"
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Fade>

        <Fade in={activeTab === 1}>
          <Box 
            data-tab="1" 
            sx={{ display: activeTab === 1 ? 'block' : 'none' }}
          >
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Metric</TableCell>
                    <TableCell align="right">Image Data</TableCell>
                    <TableCell align="right">ATP Average</TableCell>
                    <TableCell align="right">Difference</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Shot Speed (P1)</TableCell>
                    <TableCell align="right">45.3 km/h</TableCell>
                    <TableCell align="right">120-140 km/h</TableCell>
                    <TableCell 
                      align="right" 
                      sx={{ color: 'error.main' }}
                    >
                      Much lower
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Shot Speed (P2)</TableCell>
                    <TableCell align="right">32.3 km/h</TableCell>
                    <TableCell align="right">120-140 km/h</TableCell>
                    <TableCell align="right" sx={{ color: 'error.main' }}>Much lower</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Player Speed (P1)</TableCell>
                    <TableCell align="right">6.7 km/h</TableCell>
                    <TableCell align="right">10-12 km/h</TableCell>
                    <TableCell align="right" sx={{ color: 'warning.main' }}>Lower</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Player Speed (P2)</TableCell>
                    <TableCell align="right">9.0 km/h</TableCell>
                    <TableCell align="right">10-12 km/h</TableCell>
                    <TableCell align="right" sx={{ color: 'info.main' }}>Slightly lower</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Fade>

        <Fade in={activeTab === 2}>
          <Box 
            data-tab="2" 
            sx={{ display: activeTab === 2 ? 'block' : 'none' }}
          >
            <Grid container spacing={4}>
              {/* Player Positions Analysis */}
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={4}
                  sx={{
                    p: 3,
                    background: 'rgba(16, 18, 24, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: 3,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Visibility sx={{ color: '#00f5d4' }} />
                    <Typography variant="h6">Position Analysis</Typography>
                  </Box>
                  
                  {['player1', 'player2'].map((player, index) => (
                    <Box key={player} sx={{ mb: 3 }}>
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          color: '#00f5d4',
                          mb: 1,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1
                        }}
                      >
                        {`Player ${index + 1}`}
                      </Typography>
                      <Box sx={{ pl: 2, borderLeft: '2px solid rgba(0, 245, 212, 0.3)' }}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          {analysisData.positionalAnalysis[player].position}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                          Location: {analysisData.positionalAnalysis[player].courtLocation}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          Stance: {analysisData.positionalAnalysis[player].bodyPosition}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Paper>
              </Grid>

              {/* Ball Tracking Analysis */}
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={4}
                  sx={{
                    p: 3,
                    background: 'rgba(16, 18, 24, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: 3,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Timeline sx={{ color: '#7209b7' }} />
                    <Typography variant="h6">Ball Trajectory Analysis</Typography>
                  </Box>
                  
                  <Grid container spacing={2}>
                    {Object.entries(analysisData.ballTracking).map(([key, value]) => (
                      <Grid item xs={6} key={key}>
                        <Paper
                          sx={{
                            p: 2,
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: 2,
                            border: '1px solid rgba(255,255,255,0.05)'
                          }}
                        >
                          <Typography variant="caption" sx={{ color: '#7209b7' }}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {value}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </Grid>

              {/* Movement Patterns */}
              <Grid item xs={12}>
                <Paper
                  elevation={4}
                  sx={{
                    p: 3,
                    background: 'rgba(16, 18, 24, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: 3,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <FitnessCenter sx={{ color: '#00f5d4' }} />
                    <Typography variant="h6">Movement Patterns</Typography>
                  </Box>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Player 1 demonstrates defensive movement patterns, maintaining a stable base position
                    near the baseline with quick lateral adjustments. The primary focus is on court coverage
                    and return preparation.
                  </Typography>
                  <Typography variant="body1">
                    Player 2 shows more aggressive movement, stepping into the court to take control of points.
                    The forward positioning indicates an attacking strategy, though it requires excellent
                    reaction time and agility.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Fade>

        <Fade in={activeTab === 3}>
          <Box 
            data-tab="3" 
            sx={{ display: activeTab === 3 ? 'block' : 'none' }}
          >
            <Grid container spacing={3}>
              {improvementSuggestions.map((suggestion, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Paper
                    elevation={4}
                    sx={{
                      p: 3,
                      height: '100%',
                      background: 'rgba(16, 18, 24, 0.95)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                      overflow: 'hidden',
                      position: 'relative',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: `0 8px 25px ${suggestion.color}33`,
                        borderColor: suggestion.color,
                        '& .suggestion-details': {
                          maxHeight: '200px',
                          opacity: 1,
                        }
                      },
                    }}
                  >
                    <Box 
                      sx={{ 
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: `linear-gradient(90deg, ${suggestion.color}, transparent)`
                      }} 
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Box sx={{ 
                        p: 1.5, 
                        borderRadius: 2, 
                        bgcolor: `${suggestion.color}22`,
                        color: suggestion.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {suggestion.icon}
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {suggestion.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                      {suggestion.description}
                    </Typography>
                    <Box 
                      className="suggestion-details"
                      sx={{ 
                        maxHeight: 0,
                        opacity: 0,
                        transition: 'all 0.3s ease',
                        mt: 2
                      }}
                    >
                      <Typography variant="subtitle2" sx={{ color: suggestion.color, mb: 1 }}>
                        Key Focus Areas:
                      </Typography>
                      <Box component="ul" sx={{ m: 0, pl: 2 }}>
                        {suggestion.detailedTips.map((tip, idx) => (
                          <Typography 
                            component="li" 
                            key={idx} 
                            variant="body2" 
                            sx={{ 
                              color: 'text.secondary',
                              mb: 0.5,
                              '&::marker': {
                                color: suggestion.color
                              }
                            }}
                          >
                            {tip}
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fade>
      </Paper>
    </Box>
  );
};

export default AnalysisReport;