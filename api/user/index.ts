import { Router } from 'express';

import {
  createUserHandler,
  deleteUserHandler,
  getUserHandler,
  listUserHanndler
} from './user.controller'

const router = Router();

router.get('/', listUserHanndler)
router.delete('/:id', deleteUserHandler)
router.get('/:id', getUserHandler)
router.post('/', createUserHandler)

export default router;
