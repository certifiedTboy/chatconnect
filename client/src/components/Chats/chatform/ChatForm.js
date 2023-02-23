import React, { useState, useRef } from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import Picker from "emoji-picker-react";
import useSound from "use-sound";
import emojiIcon from "../../../assets/emoji.jpg";
import messageSent from "../../../sounds/sentmessage.mp3";
// import messengerEffect from "../../../sounds/messenger.mp3";
import click from "../../../sounds/click.mp3";

import "./ChatForm.css";

const ChatForm = (props) => {
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(true);
  const focusInput = useRef();
  const [play] = useSound(messageSent);
  // const [play2] = useSound(messengerEffect);
  const [play3] = useSound(click);
  const { user } = useSelector((state) => state.login);



  // listening to typing event
  const typingOption = (event) => {
    props.onTyping(event.key);
  };

  // listenening to stop typing event
  const stopTypingOption = () => {
    props.onTyping(`stopTyping`);
  };



  // get chat message input text area state
  const messageHandler = (event) => {
    setMessage(event.target.value);
  };

  const SendMessageHandler = async (event) => {
    event.preventDefault();
    if (event.type === "submit") {
      // check if chat input text area is empty
      if (message.trim().length === 0) {
        return;
      }

      // creating an object data from chat input state and active current user
      const data = {
        message,
        sender: user,
      };

      play();
      // send chat message
      props.onSubmit(data);
      focusInput.current.focus();

      // set chatmessage text area to empty state after sending
      setMessage("");
    }
  };


  const onEmojiClick = (event, emojiObject) => {
    play3();
    setMessage(emojiObject.emoji);
  };

  // console.log(message);
  return (
    <div className="chatBoxBottom">
      <Form onSubmit={SendMessageHandler}>
        <div>
          {showEmoji && (
            <Picker
              onEmojiClick={onEmojiClick}
              disableSearchBar={true}
              pickerStyle={{ width: "100%" }}
            />
          )}
          <div className="input_container">
            <input
              type="text"
              ref={focusInput}
              placeholder="write something..."
              className="chatMessageInput"
              onChange={messageHandler}
              value={message}
              onKeyPress={typingOption}
              // onKeyDown={SendMessageHandler}
              onKeyUp={stopTypingOption}
            ></input>
            <img
              src={emojiIcon}
              className="input_img"
              onClick={() => {
                if (showEmoji === true) {
                  setShowEmoji(false);
                }
                if (showEmoji === false) {
                  setShowEmoji(true);
                }
              }}
              />
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ChatForm;
