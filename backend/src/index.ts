import 'dotenv/config';
import express from 'express';
import cors from 'cors';
 
import apartmentsRouter from './routes/apartments';
import opinionsRouter from './routes/opinions';
import attractionsRouter from './routes/attractions';
import galleryRouter from './routes/gallery';
import authRouter from './routes/auth';
import usersRouter from './routes/users';
 
const app = express();
 
app.use(cors());
app.use(express.json());
 
app.use('/apartments', apartmentsRouter);
app.use('/opinions', opinionsRouter);
app.use('/attractions', attractionsRouter);
app.use('/gallery', galleryRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
 
app.get('/', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(err.status ?? 500).json({ error: err.message ?? 'Internal server error' });
});
 
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
 