import { DocumentDefinition, FilterQuery } from 'mongoose';
import { omit } from 'lodash';

import User, { UserDocument } from './user.model';

export async function createUser(input: DocumentDefinition<UserDocument>) {
  try {
    return await User.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function listUsers() {
  try {
    const users = await User.find({}, '-password')
      .sort({
        createdAt: -1
      })
      .exec()

    return users
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getUser(id: string) {
  try {
    const user = await User.findById(id, '-password')
      .exec()
    return user
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function updateUser(id: string, input: DocumentDefinition<UserDocument>) {
  try {
    const user = await User.findByIdAndUpdate(id, input, {
      new: true,
      runValidators: true
    })
    return user

  } catch (error: any) {
    throw new Error(error);
  }
}

export async function deleteUser(id: string) {
  try {
    const user = await User.findByIdAndDelete(id)
    return user
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return User.findOne(query).lean();
}
