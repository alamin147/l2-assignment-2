import Joi from "joi";

const addressSchema = Joi.object({
    city: Joi.string().required(),
    country: Joi.string().required(),
    street: Joi.string().required(),
  });
  
  // Define Joi schema for user
 export const userValidateSchema = Joi.object({
    userId: Joi.number().required(),
    username: Joi.string().required(),
    fullName: Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
    }).required(),
    password: Joi.string().required(),
    age: Joi.number().required(),
    email: Joi.string().required(),
    isActive: Joi.boolean().default(true),
    address: addressSchema.required(),
    hobbies: Joi.array().items(Joi.string()).default([]),
    orders: Joi.array().items(
      Joi.object({
        productName: Joi.string().required(),
        price: Joi.number().required(),
        quantity: Joi.number().required(),
      })
    ).default([]),
  });
