import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res, next) => {
  res.json({ message: 'Backend working!' });
});

export default app;
