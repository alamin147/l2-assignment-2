"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const User_service_1 = require("./User.service");
const mongoose_1 = require("mongoose");
const User_validate_1 = require("./User.validate");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const { error, value } = User_validate_1.userValidateSchema.validate(userData);
        const result = yield User_service_1.UserServices.createUserService(value);
        if (error) {
            res.status(500).json({
                success: false,
                message: 'User could not created',
                error: {
                    code: 500,
                    description: error.details,
                },
            });
        }
        res.status(200).json({
            success: true,
            message: 'User created successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'User could not created',
            error: {
                code: 500,
                description: 'User failed to create!',
            },
        });
    }
});
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield User_service_1.UserServices.GetAllUsersService();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: 'Users could not fetched!',
        });
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const UserId = req.params.userId;
        const result = yield User_service_1.UserServices.getSingleUserService(UserId);
        if (result === null) {
            throw new mongoose_1.Error('Failed to load single data');
        }
        res.status(200).json({
            success: true,
            message: 'User fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'User not fetched',
            error: {
                code: 500,
                description: 'User could not fetched!',
            },
        });
    }
});
const deleteSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const UserId = req.params.userId;
        yield User_service_1.UserServices.deleteSingleUserService(UserId);
        res.status(200).json({
            success: true,
            message: 'User deleted successfully!',
            data: null,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const updateSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const UserId = req.params.userId;
        const userData = req.body;
        const result = yield User_service_1.UserServices.updateUserService(UserId, userData);
        res.status(200).json({
            success: true,
            message: 'User updated successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: 'User updated failed',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const createOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const UserId = req.params.userId;
        // console.log("checking id",UserId);
        const OrderData = req.body;
        // console.log(OrderData);
        // console.log("122");
        const resultUser = yield User_service_1.UserServices.getSingleUserService(UserId);
        // console.log("122",resultUser);
        if (resultUser) {
            resultUser.orders.push(OrderData);
            yield resultUser.save();
        }
        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: null,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create order!',
            error: {
                code: 500,
                description: 'User not found!',
            },
        });
    }
});
const getAllOrdersByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const UserId = req.params.userId;
        const result = yield User_service_1.UserServices.getAllOrdersByUserService(UserId);
        res.status(200).json({
            success: true,
            message: 'Order fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Order failed to fetched!',
            error: {
                code: 500,
                description: 'Order failed to fetche!',
            },
        });
    }
});
const calculateOrderPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const UserId = req.params.userId;
        const result = yield User_service_1.UserServices.getAllOrdersByUserService(UserId);
        // console.log("from here",result?.orders);
        const arrOrder = result === null || result === void 0 ? void 0 : result.orders;
        let sum = 0;
        if (arrOrder) {
            for (let i = 0; i < (arrOrder === null || arrOrder === void 0 ? void 0 : arrOrder.length); i++) {
                sum += arrOrder[i].price * arrOrder[i].quantity;
            }
        }
        res.status(200).json({
            success: true,
            message: 'Total price calculated successfully!',
            data: {
                totalPrice: sum,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to calculate',
            error: {
                code: 500,
                description: 'Price could not calculated!',
            },
        });
    }
});
exports.UserControllers = {
    createUser,
    getUsers,
    getSingleUser,
    deleteSingleUser,
    updateSingleUser,
    createOrders,
    getAllOrdersByUser,
    calculateOrderPrice,
};
