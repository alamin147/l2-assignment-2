import { IUser } from './User.interface';
import { UserModel } from './User.model';

const createUserService = async (user: IUser) => {
    const result = await UserModel.create(user);
    return result;
  };

const GetAllUsersService =async () => {
    const result = await UserModel.find().select('username fullName age email address')

    return result;
}
const getSingleUserService =async (userId:string) => {
    const result = await UserModel.findOne({userId:userId})
    
    return result;
}

const deleteSingleUserService = async(userId:string)=>{
const result = await UserModel.deleteOne({userId:userId})
return result;
}

export const UserServices= {
    createUserService,
    GetAllUsersService,
    getSingleUserService,
    deleteSingleUserService
}