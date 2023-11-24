import { Schema, model } from 'mongoose';
import { Address, IUser, Fullname, IUpdateUserRequest, UserModel, IUserMethods } from './User.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

export const fullNameSchema = new Schema<Fullname>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
  },
});

export const addressSchema = new Schema<Address>({
  city: { type: String, required: [true, 'City is required'] },
  country: { type: String, required: [true, 'Country is required'] },
  street: { type: String, required: [true, 'Street is required'] },
});



export const userSchema = new Schema<IUser,UserModel,IUserMethods>({
  userId: {
    type: Number,
    required: [true, 'User ID is required'],
    unique: true,
  },
  username: {
    type: String,
    unique: true,
    required:[true,"Username is required"]
  },
  fullName: { type: fullNameSchema, required: [true,"Name is required"] },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  age: {
    type: Number,
    required:[true,"Age is required"]
  },
  email: { type: String, required: [true, 'Email is required'] },

  isActive: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },

  address: {
    type: addressSchema,
    required: [true, 'Address is required'],
  },
  hobbies: {
    type: [String],
    default: [],
  },
  orders: {
    type: [
      {
        productName: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    default: [],
  },
});


userSchema.pre('save',async function(next){
   this.password = await bcrypt.hash(this.password,Number(config.bcrypt_salt))
next();
})


userSchema.methods.isUserExist = async function(userId:string){
const existingUser = await UserModels.findOne({userId:userId})
return existingUser;
}

const updateUserSchema = new Schema<IUpdateUserRequest>({
  userId: {
    type: Number,
    required: true,
  },
  username: String,
  fullName: {
    firstName: String,
    lastName: String,
  },
  age: Number,
  email: String,
  isActive: Boolean,
  hobbies: [String],
  address: {
    street: String,
    city: String,
    country: String,
  },
});




export const UpdateUserModel = model<IUpdateUserRequest>('UpdateUser', updateUserSchema);

export const UserModels= model<IUser,UserModel>('User',userSchema)