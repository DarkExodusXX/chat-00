import express from 'express';
import path from 'path';
import socketIO from 'socket.io';

const PORT = process.env.PORT || 5000;
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
  res.render('home');
});

const server = app.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
});

const io = socketIO(server);

io.on('connection', (socket) => {
  socket.on('newMessage', ({ message }) => {
    socket.broadcast.emit('messageNotification', {
      message,
      nickname: socket.nickname || 'Anon'
    });
  });
  socket.on('setNickname', ({ nickname }) => {
    socket.nickname = nickname;
  });
});
