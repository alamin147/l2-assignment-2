import { Schema } from 'mongoose';
import { Address, User, Username } from './User.interface';

export const fullNameSchema = new Schema<Username>({
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

export const useruSchema = new Schema<User>({
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
