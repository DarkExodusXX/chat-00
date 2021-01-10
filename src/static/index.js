// eslint-disable-next-line no-undef
const socket = io('/');

const sendMessage = (message) => {
  socket.emit('newMessage', { message });
  console.log(`You: ${message}`);
};

const setNickname = (nickname) => {
  socket.emit('setNickname', { nickname });
};

const handleNotification = (data) => {
  const { message, nickname } = data;
  console.log(`${nickname}: ${message}`);
};

socket.on('messageNotification', handleNotification);
