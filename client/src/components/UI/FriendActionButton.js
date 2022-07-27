import React from "react";

const FriendActionButton = () => {
  return (
    <button type={props.type} onClick={props.onClick}>
      {props.title}
    </button>
  );
};

export default FriendActionButton;
