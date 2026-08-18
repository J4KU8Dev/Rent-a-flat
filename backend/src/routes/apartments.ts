import { Router } from 'express';
import { prisma } from '../prisma';
import { requireAdmin } from '../middleware/auth';

const router = Router();

// GET /apartments — list all
router.get('/', async (_req, res, next) => {
  try {
    const apartments = await prisma.apartment.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(apartments);
  } catch (err) {
    next(err);
  }
});

// GET /apartments/:id — single apartment with its opinions
router.get('/:id', async (req, res, next) => {
  try {
    const apartment = await prisma.apartment.findUnique({
      where: { id: req.params.id },
      include: { opinions: true },
    });
    if (!apartment) return res.status(404).json({ error: 'Apartment not found' });
    res.json(apartment);
  } catch (err) {
    next(err);
  }
});

// POST /apartments — create (admin only)
router.post('/', requireAdmin, async (req, res, next) => {
  try {
    const apartment = await prisma.apartment.create({ data: req.body });
    res.status(201).json(apartment);
  } catch (err) {
    next(err);
  }
});

// PUT /apartments/:id — update (admin only)
router.put('/:id', requireAdmin, async (req, res, next) => {
  try {
    const id = req.params.id as string;
    const apartment = await prisma.apartment.update({
      where: { id },
      data: req.body,
    });
    res.json(apartment);
  } catch (err) {
    next(err);
  }
});

// DELETE /apartments/:id — delete (admin only)
router.delete('/:id', requireAdmin, async (req, res, next) => {
  try {
    const id = req.params.id as string;
    await prisma.apartment.delete({ where: { id }});
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;