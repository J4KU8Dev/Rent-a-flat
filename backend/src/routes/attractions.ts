import { Router } from 'express';
import { prisma } from '../prisma';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const attractions = await prisma.attraction.findMany();
    res.json(attractions);
  } catch (err) {
    next(err);
  }
});

export default router;