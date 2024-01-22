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
app.use(cors({ origin: ['https://x19fp-client.onrender.com', 'http://localhost:5173'] }));

app.use(apiLoggerMiddleware);

app.use('/api/v1', appRouter);

app.use(handleErrorMiddleware);

const expressServer = app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});

const io = new Server(expressServer, {
  cors: ['https://x19fp-client.onrender.com', 'http://localhost:5173']
});

io.on('connection', socket => {
  console.log(socket.id);
  socket.on('send-answer', answer => {
    console.log(answer);
    socket.broadcast.emit('recevice-answer', answer);
  });
});
