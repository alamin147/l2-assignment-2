import { Request, Response } from 'express';

import {UserServices} from './User.service';


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

  export const UserControllers = {
    createUser,getUsers
  }