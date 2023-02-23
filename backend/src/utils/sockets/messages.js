const generalMessageFormat = (sender, message, userImage) => {
  return {
    sender,
    message,
    userImage,
  };
};

const userMessageFormat = (sender, message, userImage) => {
  return {
    sender,
    message,
    userImage,
  };
};

module.exports = { generalMessageFormat, userMessageFormat };
