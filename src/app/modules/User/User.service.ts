import { IUser } from './User.interface';
import { UserModel } from './User.model';

const createUserService = async (user: IUser) => {
    const result = await UserModel.create(user);
    return result;
  };

const GetAllUsersService =async () => {
    const result = (await UserModel.find().select('username fullName age email address')
    )
    return result;
}

export const UserServices= {
    createUserService,
    GetAllUsersService
}