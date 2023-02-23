import "./Message.css";
import Moment from "react-moment";
import { NavLink } from "react-router-dom";
import { Fragment } from "react";

const Message = ({ id, own, sender, message, time, image }) => {
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
                  alt="profile img"
                />
              </NavLink>
            </div>
            <Moment className="meta-own" fromNow>
              {time}
            </Moment>
          </div>
        )}

        {!own && (
          <div className="message">
            <div className="messageTop">
              <NavLink to={`/user/userprofile/${sender}`}>
                <img
                  className="messageImg"
                  src={`http://localhost:3001/${image}`}
                  alt="profile img"
                />
              </NavLink>

              <p className="messageText">
                <NavLink to={`/user/userprofile/${sender}`}>
                  <span style={{ fontWeight: 700 }}>{sender}: </span>
                </NavLink>{" "}
                {message}
              </p>
            </div>
            <Moment className="meta" fromNow>
              {time}
            </Moment>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Message;
