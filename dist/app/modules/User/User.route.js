"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const User_controller_1 = require("./User.controller");
const router = express_1.default.Router();
router.post('/', User_controller_1.UserControllers.createUser);
router.get('/', User_controller_1.UserControllers.getUsers);
router.get('/:userId', User_controller_1.UserControllers.getSingleUser);
router.delete('/:userId', User_controller_1.UserControllers.deleteSingleUser);
router.get('/:userId/orders/total-price', User_controller_1.UserControllers.calculateOrderPrice);
router.put('/:userId/orders', User_controller_1.UserControllers.createOrders);
router.get('/:userId/orders', User_controller_1.UserControllers.getAllOrdersByUser);
router.put('/:userId', User_controller_1.UserControllers.updateSingleUser);
exports.UserRoutes = router;
