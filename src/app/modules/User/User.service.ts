import { IUser } from './User.interface';
import { UserModel } from './User.model';

const createUserService = async (user: IUser) => {
    const result = await UserModel.create(user);
    return result;
  };


export const UserServices= {
    createUserService
}