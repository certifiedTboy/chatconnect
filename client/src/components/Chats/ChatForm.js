import React, { useState, useRef } from "react";
import { Form } from "react-bootstrap";
import Picker from "emoji-picker-react";
import useSound from "use-sound";
import messageSent from "../../sounds/sentmessage.mp3";
// import messengerEffect from "../../sounds/messenger.mp3";
import click from "../../sounds/click.mp3";

import "./ChatForm.css";

const ChatForm = (props) => {
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const focusInput = useRef();
  const [play] = useSound(messageSent);
  // const [play2] = useSound(messengerEffect);
  const [play3] = useSound(click);

  // get chat message input text area state
  const messageHandler = (event) => {
    const text = event.target.value;
    setMessage(text);
  };

  // chat message submit form handler function
  const onSubmitChat = (event) => {
    event.preventDefault();

    // check if chat input text area is empty
    if (message.trim().length === 0) {
      return;
    }

    // fetch current user from local storage
    const user = localStorage.getItem("user");
    const newUser = JSON.parse(user);

    // creating an object data from chat input state and active current user
    const data = {
      message,
      sender: newUser.username,
    };

    play();
    // send chat message
    props.onSubmit(data);
    focusInput.current.focus();

    // set chatmessage text area to empty state after sending
    setMessage("");
  };

  // listening to typing event
  const typingOption = (event) => {
    props.onTyping(event.target.value);
  };

  // listenening to stop typing event
  const stopTypingOption = () => {
    props.onTyping(`stopTyping`);
  };

  const onEmojiClick = (event, emojiObject) => {
    play3();
    setMessage(emojiObject.emoji);
  };

  // console.log(message);
  return (
    <div className="chatBoxBottom">
      <Form onSubmit={onSubmitChat}>
        <div>
          {showEmoji && (
            <Picker
              onEmojiClick={onEmojiClick}
              disableSearchBar={true}
              pickerStyle={{ width: "100%" }}
            />
          )}
          <div className="input_container">
            <textarea
              ref={focusInput}
              placeholder="write something..."
              className="chatMessageInput"
              onChange={messageHandler}
              value={message}
              onKeyPress={typingOption}
              onKeyUp={stopTypingOption}
            ></textarea>
            <img
              src="https://cdn4.iconfinder.com/data/icons/36-slim-icons/87/calender.png"
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
            <button type="submit" className="chatSubmitButton">
              Send
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ChatForm;
