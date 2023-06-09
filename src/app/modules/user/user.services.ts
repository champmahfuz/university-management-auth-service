import config from '../../../config/index';
import { User } from './user.model';
import { IUser } from './user.interfaces';
import { generateUserId } from './user.utlis';
import ApiError from '../../../errors/ApiError';

const createUser = async (user: IUser): Promise<IUser | null> => {
  //auto generated incremenatal id
  const id = await generateUserId();
  user.id = id;
  //default password

  if (!user.password) {
    user.password = config.default_user_pass as string;
  }

  const createdUser = await User.create(user);

  if (!createUser) {
    throw new ApiError(400, 'Failed to create user!');
  }
  return createdUser;
};

export const usersServices = {
  createUser,
};
