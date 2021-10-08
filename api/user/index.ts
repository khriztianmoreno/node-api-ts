import { Router } from 'express';

import {
  createUserHandler,
  deleteUserHandler,
  getUserHandler,
  listUserHanndler
} from './user.controller'
import { createUserSchema } from './user.schema';
import validateRequest from '../../middleware/validateRequest';

const router = Router();

router.get('/', listUserHanndler)
router.delete('/:id', deleteUserHandler)
router.get('/:id', getUserHandler)
router.post('/', validateRequest(createUserSchema), createUserHandler)

export default router;
