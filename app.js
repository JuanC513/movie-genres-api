import express from 'express';
import genresRouter from './routes/genres.js';

const app = express();

app.use(express.json());
app.use('/api/genres', genresRouter);

export default app;