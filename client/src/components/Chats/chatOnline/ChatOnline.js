import { NavLink } from "react-router-dom";
import "./ChatOnline.css";
import Image from "../../../assets/back.jpg";

const ChatOnline = (props) => {
  const { topic, description, id } = props;

  return (
    <div className="chatOnline" key={id}>
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img className="chatOnlineImg" src={Image} />
          <div className="chatOlineBadge"> </div>
        </div>
        <span className="chatOnlineName">
          <a href={`/rooms/${topic}`} title={description}>
            {topic}
          </a>
        </span>
      </div>
    </div>
  );
};

export default ChatOnline;
