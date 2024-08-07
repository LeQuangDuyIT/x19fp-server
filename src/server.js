import express from 'express';
import cors from 'cors';
import 'dotenv/config.js';
import { connectToDatabase } from './config/database.js';
import apiLoggerMiddleware from './middlewares/apiLogger.mdw.js';
import appRouter from './routes/index.js';
import handleErrorMiddleware from './middlewares/handleError.mdw.js';
import { Server } from 'socket.io';
const app = express();
const PORT = process.env.PORT;

connectToDatabase();

app.use(express.json());
app.use(cors('*'));
// app.use(
//   cors({
//     origin: [
//       'https://x19fp-client.onrender.com',
//       'https://x19fp-client-cx84.onrender.com',
//       'http://localhost:5173',
//       'https://x19fp-server.onrender.com',
//       'http://localhost:3001'
//     ]
//   })
// );

app.use(apiLoggerMiddleware);

app.use('/api/v1', appRouter);
app.get('/api/v1/test', (req, res) => {
  res.status(200).json({
    message: 'api go here'
  });
});
app.use(handleErrorMiddleware);

const expressServer = app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});

const io = new Server(expressServer, {
  cors: '*'
});
// const io = new Server(expressServer, {
//   cors: [
//     'https://x19fp-client.onrender.com',
//     'https://x19fp-client-cx84.onrender.com',
//     'https://x19fp-server.onrender.com',
//     'http://localhost:5173',
//     'http://localhost:3001'
//   ]
// });

io.on('connection', socket => {
  socket.on('send-answer', answer => {
    socket.broadcast.emit('recevice-answer', answer);
  });
  socket.on('send-test-noti', testNoti => {
    socket.broadcast.emit('recevice-testNoti', testNoti);
    socket.join(testNoti.authorId);
  });
  socket.on('enter-room', room => {
    socket.join(room.roomId);
  });
  socket.on('send-noti-testOwner', noti => {
    io.to(noti.testOwnerId).emit('recevice-noti-testOwner', noti.message);
    socket.leave(noti.testOwnerId);
  });
  socket.on('join-room', id => {
    socket.join(id?.id);
  });
  socket.on('add-user-to-room', user => {
    socket.join(user.id);
    io.to(user.id).emit('get-user-in-room', user.currentUser);
  });
});
