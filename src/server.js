import express from 'express';
import cors from 'cors';
import 'dotenv/config.js';
import { connectToDatabase } from './config/database.js';
import apiLoggerMiddleware from './middlewares/apiLogger.mdw.js';
import appRouter from './routes/index.js';
import handleErrorMiddleware from './middlewares/handleError.mdw.js';

const app = express();
const PORT = process.env.PORT;

connectToDatabase();

app.use(express.json());
app.use(cors('*'));

app.use(apiLoggerMiddleware);

app.use('/api/v1', appRouter);

app.use(handleErrorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
