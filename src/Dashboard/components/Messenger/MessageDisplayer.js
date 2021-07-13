import React, { useState } from 'react';
import { sendMessageUsingDataChannel } from '../../../utils/webRTC/webRTCHandler';
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import './Messenger.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  ConversationHeader,
} from "@chatscope/chat-ui-kit-react";


 const MessageDisplayer = (props) => {

  const {messages}=props;
  // input value of message
  const [inputValue, setInputValue] = useState('');

  // when the user presses enter
  const handleOnKeyDownEvent = (e) => {
    console.log("hi");
    if (e.keyCode === 13) {
      // send the message through data signal
      sendMessageUsingDataChannel(inputValue);

      setInputValue('');
    }
  }
  
  return (
      <div style={{ position: "absolute", height: "66.5%", width: "18.8%", right: "0px" , top: "8%"}}>
        <ConversationHeader>
            <ConversationHeader.Content>
              <span style={{
                color: "black",
                fontweight: "bold",
                fontSize: "x-large",
                alignSelf: "flex-center",
                fontFamily: 'Libre Baskerville',
                fontweight: 500,
                alignContent: "center"
                }}>Chat 
              </span>
            </ConversationHeader.Content>
        </ConversationHeader>
        <MainContainer responsive style={{position: "relative", height: "91%", width: "100%"}}>
          <ChatContainer>
            <MessageList>
            <div>
              {(messages).map(num => (
                  <Message 
                  model={{
                    message: num[0],
                    direction: num[1]}}/>
              ))}
            </div>
            </MessageList>
            {/* <MessageInput 
             attachButton={false} 
             sendButton={false} 
             placeholder="Type message here"
             /> */}
             {/* <input
            className='messages_input'
            type='text'
            value={inputValue}
            onChange={(e) => { setInputValue(e.target.value); }}
            onKeyDown={handleOnKeyDownEvent}
            placeholder='Type your message'
          /> */}
          </ChatContainer>
        </MainContainer>
      </div>
    // <div className='chat_box'>
    //   <div>
    //     {(props.messages).map(num => (
    //         <p>{num}</p>
    //       ))}
    //   </div>
      
    // </div>
  );
};

export default MessageDisplayer;
