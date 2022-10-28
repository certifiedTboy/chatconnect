import "./Message.css";
import { format } from "timeago.js";
import { NavLink } from "react-router-dom";
import { Fragment } from "react";

const Message = ({ id, own, sender, message, time, image }) => {
  // console.log(id, own, sender, message, time, image);
  return (
    <Fragment>
      <div key={id}>
        {own && (
          <div className="message own">
            <div className="messageTop">
              <p className="messageText">{message}</p>

              <NavLink to={`/user/userprofile/${sender}`}>
                <img
                  className="messageImg"
                  src={`http://localhost:3001/${image}`}
                />
              </NavLink>
            </div>
            <div className="ownMessageBottom">{format(time)}</div>
          </div>
        )}

        {!own && (
          <div className="message">
            <div className="messageTop">
              <NavLink to={`/user/userprofile/${sender}`}>
                <img
                  className="messageImg"
                  src={`http://localhost:3001/${image}`}
                />
              </NavLink>

              <p className="messageText">
                <NavLink to={`/user/userprofile/${sender}`}>
                  <span style={{ fontWeight: 700 }}>{sender}: </span>
                </NavLink>{" "}
                {message}
              </p>
            </div>
            <div className="messageBottom">{format(time)}</div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Message;
