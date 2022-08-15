import "./Message.css";
import { format } from "timeago.js";
import { NavLink } from "react-router-dom";
import { Fragment } from "react";

const Message = ({ id, own, sender, message, time, image }) => {
  return (
    <Fragment>
      {" "}
      <div key={id}>
        <div className={own ? "message own" : "message"}>
          <div className="messageTop">
            <NavLink to={`/user/userprofile/${sender}`}>
              {" "}
              <img
                className="messageImg"
                src={`http://localhost:3001/${image}`}
              />{" "}
            </NavLink>

            <p className="messageText">
              <NavLink to={`/user/userprofile/${sender}`}></NavLink>{" "}
              <span style={{ fontWeight: 700 }}>{sender}: </span>
              {message}
            </p>
          </div>
          <div className="messageBottom">{format(time)}</div>
        </div>
      </div>
    </Fragment>
  );
};

export default Message;
