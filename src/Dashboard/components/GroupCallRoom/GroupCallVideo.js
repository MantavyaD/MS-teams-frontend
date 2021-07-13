import React, { useRef, useEffect } from 'react';

const styles = {
  videoContainer: {
    width: '300px',
    height: '300px',
    borderRadius: '15px'
  },
  videoElement: {
    width: '100%',
    height: '100%',
    borderRadius: '15px',
  }
};

const GroupCallVideo = ({ stream }) => {
  const videoRef = useRef();

  useEffect(() => {
    const remoteGroupCallVideo = videoRef.current;
    remoteGroupCallVideo.srcObject = stream;
    remoteGroupCallVideo.onloadedmetadata = () => {
      remoteGroupCallVideo.play();
    };
  }, [stream]);

  return (
    <div style={styles.videoContainer}>
      <video ref={videoRef} autoPlay style={styles.videoElement} />
    </div>
  );
};

export default GroupCallVideo;
