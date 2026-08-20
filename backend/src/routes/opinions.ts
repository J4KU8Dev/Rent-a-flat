import { Router } from 'express';
import { prisma } from '../prisma';

const router = Router();

// GET /opinions — list all, or filter by customer via ?CustomerId=xyz
router.get('/', async (req, res, next) => {
  try {
    const customerId = (req.query.CustomerId ?? req.query.customerId) as string | undefined;

    const opinions = await prisma.opinion.findMany({
      where: customerId ? { customerId } : undefined,
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