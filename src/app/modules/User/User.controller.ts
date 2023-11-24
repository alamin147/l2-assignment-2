import { Request, Response } from 'express';

import {UserServices} from './User.service';
import { Error } from 'mongoose';


const createUser = async (req: Request, res: Response) => {
    try {
      const userData = req.body;
      const result = await UserServices.createUserService(userData);
  
      res.status(200).json({
        "success": true,
        "message": "User created successfully!",
        "data": result
    });
    } catch (error) {
      res.send({
        "success": false,
        "message": "User could not created",
        "error": {
            "code": 404,
            "description": "User failed to create!"
        }
    });
    }
  };

const getUsers= async(req: Request, res: Response)=>{
try {
    const result = await UserServices.GetAllUsersService();

    res.status(200).json({
        "success": true,
        "message": "Users fetched successfully!",
        "data": result
    });
} catch (error) {
    res.status(404).json({
        "success": false,
        "message": "Users could not fetched!",
    });
}
}
const getSingleUser= async(req: Request, res: Response)=>{
try {
    const UserId = req.params.userId;
    const result = await UserServices.getSingleUserService(UserId);
    if(result===null){
        throw new Error('Failed to load single data')}
    res.status(200).json({
        "success": true,
        "message": "User fetched successfully!",
        "data": result
    });
} catch (error) {
    res.status(404).json({
        "success": false,
        "message": "User not found",
        "error": {
            "code": 404,
            "description": "User not found!"
        }})
}}


const deleteSingleUser = async(req:Request, res:Response)=>{
    try {
        const UserId = req.params.userId;
    await UserServices.deleteSingleUserService(UserId);

res.status(200).json({
	"success": true,
	"message": "User deleted successfully!",
	"data" : null
})

    } catch (error) {
        res.status(404).json({
            "success": false,
            "message": "User not found",
            "error": {
                "code": 404,
                "description": "User not found!"
            }
        })
    }
}



  export const UserControllers = {
    createUser,getUsers,getSingleUser,deleteSingleUser
  }