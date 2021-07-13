import * as wss from '../wssConnection/wssConnection';
import store from '../../store/store';
import { setGroupCallActive, setCallState, callStates, setGroupCallIncomingStreams, clearGroupCallData, setgroupMessages } from '../../store/actions/callActions';
import { getTurnServers } from './TURN';

let myPeer;
let myPeerId;
let groupCallRoomId;
let groupCallHost = false;
var group_messages=[];

export const connectWithMyPeer = () => {
  myPeer = new window.Peer(undefined, {
    config: {
      iceServers: [...getTurnServers(), { url : 'stun:stun.l.google.com:19302'}]
    }
  });

  myPeer.on('open', (id) => {
    console.log('succesfully connected with peer server');
    myPeerId = id;

    myPeer.on('data',(message) =>{
      group_messages.push(message);
      store.dispatch(setgroupMessages(group_messages));
    });

    // myPeer.send()



  });

  myPeer.on('call', call => {
    call.answer(store.getState().call.localStream);
    call.on('stream', incomingStream => {
      const streams = store.getState().call.groupCallStreams;
      const stream = streams.find(stream => stream.id === incomingStream.id);

      if (!stream) {
        addVideoStream(incomingStream);
      }
    });
  });

  
};

// logic for creating a new call
export const createNewGroupCall = () => {
  groupCallHost = true;
  wss.registerGroupCall({
    username: store.getState().dashboard.username,
    peerId: myPeerId
  });

  store.dispatch(setGroupCallActive(true));
  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
};

// logic for joining a call
export const joinGroupCall = (hostSocketId, roomId) => {
  const localStream = store.getState().call.localStream;
  groupCallRoomId = roomId;

  wss.userWantsToJoinGroupCall({
    peerId: myPeerId,
    hostSocketId,
    roomId,
    localStreamId: localStream.id
  });

  store.dispatch(setGroupCallActive(true));
  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
};

// logic for connecting to the new user
export const connectToNewUser = (data) => {
  const localStream = store.getState().call.localStream;
  const call = myPeer.call(data.peerId, localStream);

  call.on('stream', (incomingStream) => {
    const streams = store.getState().call.groupCallStreams;
    const stream = streams.find(stream => stream.id === incomingStream.id);

    if (!stream) {
      addVideoStream(incomingStream);
    }
  });
};
// to send the message to the server
export const sendMessagetoserver = (message) => {
  console.log('sending message');
  // myPeer.send(message);
  wss.sendMessage(message);
};
// logic for leaving the call
export const leaveGroupCall = () => {
  if (groupCallHost) {
    wss.groupCallClosedByHost({
      peerId: myPeerId
    });
  } else {
    wss.userLeftGroupCall({
      streamId: store.getState().call.localStream.id,
      roomId: groupCallRoomId
    });
  }
  clearGroupData();
};

// clear the group data
export const clearGroupData = () => {
  groupCallRoomId = null;
  groupCallHost = null;
  store.dispatch(clearGroupCallData());
  myPeer.destroy();
  connectWithMyPeer();
  group_messages.length=0;

  const localStream = store.getState().call.localStream;
  localStream.getVideoTracks()[0].enabled = true;
  localStream.getAudioTracks()[0].enabled = true;
};

// remove the inactive stream
export const removeInactiveStream = (data) => {
  const groupCallStreams = store.getState().call.groupCallStreams.filter(
    stream => stream.id !== data.streamId
  );
  store.dispatch(setGroupCallIncomingStreams(groupCallStreams));
};

// add the video stream to group call stream
const addVideoStream = (incomingStream) => {
  const groupCallStreams = [
    ...store.getState().call.groupCallStreams,
    incomingStream
  ];

  store.dispatch(setGroupCallIncomingStreams(groupCallStreams));
};

export const addMessage = (message) => {
  group_messages.push(message);
  store.dispatch(setgroupMessages(group_messages));
};

// if group call is active return roomId if not return false
export const checkActiveGroupCall = () => {
  if (store.getState().call.groupCallActive) {
    return groupCallRoomId;
  } 
  else {
    return false;
  }
};
