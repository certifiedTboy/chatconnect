const generalMessageFormat = (sender, message) => {
  return {
    sender,
    message,
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
