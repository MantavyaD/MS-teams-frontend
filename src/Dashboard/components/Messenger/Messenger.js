import React, { useState, useEffect } from 'react';
import store from '../../../store/store';
import { sendMessageUsingDataChannel } from '../../../utils/webRTC/webRTCHandler';
import { setMessages } from '../../../store/actions/callActions';
import MessageDisplayer from './MessageDisplayer';
import './Messenger.css';



const Messenger = ({ messages, setDirectCallMessages }) => {
  const [inputValue, setInputValue] = useState('');
  const handleOnKeyDownEvent = (e) => {
    console.log("checking if listening event");
    if (e.keyCode === 13) {
      sendMessageUsingDataChannel(inputValue);
      messages.push([inputValue,"outgoing"]);
      setInputValue('');
    }
  };
  return (
    <>
      <input
        className='messages_input'
        type='text'
        value={inputValue}
        onChange={(e) => { setInputValue(e.target.value); }}
        onKeyDown={handleOnKeyDownEvent}
        placeholder='Type your message'
      />
      {<MessageDisplayer messages={messages} />}
    </>
  );
};

export default Messenger;
