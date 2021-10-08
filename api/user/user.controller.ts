import { Request, Response } from 'express';
import { omit } from 'lodash';

import log from '../../logger';
import { createUser, listUsers, getUser, deleteUser } from './user.service';

export async function listUserHanndler(req: Request, res: Response) {
  try {
    const users = await listUsers();

    return res.status(200).json(users)
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
}

export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
    return res.send(omit(user.toJSON(), 'password'));
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
}

export async function getUserHandler(req: Request, res: Response) {
  const { id } = req.params

  try {
    const user = await getUser(id);
    if (!user) {
      return res.status(404).end()
    }
    return res.json(user)
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
}

export async function deleteUserHandler(req: Request, res: Response) {
  const { id } = req.params

  try {
    const user = await deleteUser(id);

    return res.status(204).end()
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
}
