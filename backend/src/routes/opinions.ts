import { Router } from 'express';
import { prisma } from '../prisma';

const router = Router();

// GET /opinions — list all
router.get('/', async (_req, res, next) => {
  try {
    const opinions = await prisma.opinion.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(opinions);
  } catch (err) {
    next(err);
  }
});

// POST /opinions — submit a new review for an apartment
router.post('/', async (req, res, next) => {
  try {
    const { apartmentId, customerId, gender, firstName, lastName, opinionDate, opinionContent, rating } = req.body;

    if (!apartmentId || !opinionContent || rating === undefined) {
      return res.status(400).json({ error: 'apartmentId, opinionContent and rating are required' });
    }

    const opinion = await prisma.opinion.create({
      data: { apartmentId, customerId, gender, firstName, lastName, opinionDate, opinionContent, rating },
    });
    res.status(201).json(opinion);
  } catch (err) {
    next(err);
  }
});

export default router;