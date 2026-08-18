import { Router } from 'express';
import { prisma } from '../prisma';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const images = await prisma.galleryImage.findMany();
    res.json(images);
  } catch (err) {
    next(err);
  }
});

export default router;