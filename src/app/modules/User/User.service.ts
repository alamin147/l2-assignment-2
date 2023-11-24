import { IUpdateUserRequest, IUser } from './User.interface';
import { UserModels } from './User.model';

const createUserService = async (user: IUser) => {
    const stringUserId = user.userId.toString();
    const createUser = new UserModels(user);
if(await createUser.isUserExist(stringUserId)){
    throw new Error('User Exists')
}
    
    const result = await createUser.save();
    return result;
  };

const GetAllUsersService =async () => {
    const result = await UserModels.find().select('username fullName age email address')

    return result;
}
const getSingleUserService =async (userId:string) => {
    const result = await UserModels.findOne({userId:userId})
    
    return result;
}

const deleteSingleUserService = async(userId:string)=>{
const result = await UserModels.deleteOne({userId:userId})
return result;
}


const updateUserService = async(userId:string,userData:IUpdateUserRequest)=>{
    const result = await UserModels.findOneAndUpdate({userId:userId},userData, {new:true})
    return result;
}

export const UserServices= {
    createUserService,
    GetAllUsersService,
    getSingleUserService,
    deleteSingleUserService,updateUserService
}