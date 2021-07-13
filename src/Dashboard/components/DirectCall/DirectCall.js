import React from 'react';
import { connect } from 'react-redux';
import LocalVideoView from '../LocalVideoView/LocalVideoView';
import RemoteVideoView from '../RemoteVideoView/RemoteVideoView';
import CallRejectedDialog from '../CallRejectedDialog/CallRejectedDialog';
import IncomingCallDialog from '../IncomingCallDialog/IncomingCallDialog';
import CallingDialog from '../CallingDialog/CallingDialog';
import { callStates, setCallRejected, setLocalCameraEnabled, setLocalMicrophoneEnabled, setMessage, setMessages } from '../../../store/actions/callActions';
import ConversationButtons from '../ConversationButtons/ConversationButtons';
import Messenger from '../Messenger/Messenger';


const DirectCall = (props) => {
  const {
    localStream,
    remoteStream,
    callState,
    callerUsername,
    callingDialogVisible,
    callRejected,
    hideCallRejectedDialog,
    setDirectCallMessages,
    messages
  } = props;

  return (
    <>
      <LocalVideoView localStream={localStream} />
      {remoteStream && callState === callStates.CALL_IN_PROGRESS && <RemoteVideoView remoteStream={remoteStream} />}
      {callRejected.rejected && <CallRejectedDialog
        reason={callRejected.reason}
        hideCallRejectedDialog={hideCallRejectedDialog}
      />}
      {callState === callStates.CALL_REQUESTED && <IncomingCallDialog callerUsername={callerUsername} />}
      {callingDialogVisible && <CallingDialog />}
      {remoteStream && callState === callStates.CALL_IN_PROGRESS && <ConversationButtons {...props} />}
      {remoteStream && callState === callStates.CALL_IN_PROGRESS && <Messenger messages={messages} setDirectCallMessages={setDirectCallMessages} />}
    </>
  );
};

function mapStoreStateToProps ({ call }) {
  return {
    ...call
  };
}

function mapDispatchToProps (dispatch) {
  return {
    hideCallRejectedDialog: (callRejectedDetails) => dispatch(setCallRejected(callRejectedDetails)),
    setCameraEnabled: (enabled) => dispatch(setLocalCameraEnabled(enabled)),
    setMicrophoneEnabled: (enabled) => dispatch(setLocalMicrophoneEnabled(enabled)),
    setDirectCallMessages: (messages) => dispatch(setMessages(messages))
  };
}

export default connect(mapStoreStateToProps, mapDispatchToProps)(DirectCall);
