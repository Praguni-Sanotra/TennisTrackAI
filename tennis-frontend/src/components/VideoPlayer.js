import React from 'react';

const VideoPlayer = ({ videoUrl, muted }) => {
  return (
    <video
      width="100%"
      height="auto"
      controls
      autoPlay
      muted={muted}
      style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
    >
      <source src={videoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
