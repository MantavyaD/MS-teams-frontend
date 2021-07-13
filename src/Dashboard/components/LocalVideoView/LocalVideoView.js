import React, { useRef, useEffect } from 'react';

const styles = {
  videoContainer: {
    width: '160px',
    // height: '165px',
    // border: 'solid',
    // borderColor: 'black',
    // borderRadius: '10px',
    position: 'absolute',
    top: '10%',
    left: '20.2%'
  },
  videoElement: {
    width: '100%',
    height: '100%',
    borderRadius: '15px',
    border: 'solid 1px black'
  }
};

const LocalVideoView = props => {
  const { localStream } = props;
  const localVideoRef = useRef();

  useEffect(() => {
    if (localStream) {
      const localVideo = localVideoRef.current;
      localVideo.srcObject = localStream;

      localVideo.onloadedmetadata = () => {
        localVideo.play();
      };
    }
  }, [localStream]);

  return (
    <div style={styles.videoContainer}>
      <video style={styles.videoElement} ref={localVideoRef} autoPlay muted />
    </div>
  );
};

export default LocalVideoView;
