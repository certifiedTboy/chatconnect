import "./ChatOnline.css";

const ChatOnline = (props) => {
  const { topic, description, id, imgpath } = props;

  return (
    <div className="chatOnline" key={id}>
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img className="chatOnlineImg" src={imgpath} />
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
