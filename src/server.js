import express from 'express';
import cors from 'cors';
import 'dotenv/config.js';
import appRouter from './routes/index.js';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors('*'));

app.use('/api/v1', appRouter);

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
