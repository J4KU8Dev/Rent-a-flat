import { Router } from 'express';
import { prisma } from '../prisma';
import { requireAdmin } from '../middleware/auth';

const router = Router();

// GET /users — admin only, never returns passwordHash
router.get('/', requireAdmin, async (_req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        gender: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// PUT /users/:id — admin only, update role/profile info
router.put('/:id', requireAdmin, async (req, res, next) => {
  try {
    const { firstName, lastName, gender, phone, role } = req.body;
    const id = req.params.id as string;
    const user = await prisma.user.update({
      where: { id },
      data: { firstName, lastName, gender, phone, role },
      select: { id: true, email: true, firstName: true, lastName: true, role: true },
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// DELETE /users/:id — admin only
router.delete('/:id', requireAdmin, async (req, res, next) => {
  try {
    const id = req.params.id as string;
    await prisma.user.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;