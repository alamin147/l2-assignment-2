import express from 'express';
import { UserControllers } from './User.controller';

const router = express.Router();

router.post('/',UserControllers.createUser);

router.get('/',UserControllers.getUsers);

router.get('/:userId',UserControllers.getSingleUser);

export const UserRoutes = router;