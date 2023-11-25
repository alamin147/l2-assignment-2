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
exports.UserServices = void 0;
const User_model_1 = require("./User.model");
const createUserService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const stringUserId = user.userId.toString();
    const createUser = new User_model_1.UserModels(user);
    if (yield createUser.isUserExist(stringUserId)) {
        throw new Error('User Exists');
    }
    const result = yield createUser.save();
    return result;
});
const GetAllUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield User_model_1.UserModels.find().select('username fullName age email address');
    return result;
});
const getSingleUserService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield User_model_1.UserModels.findOne({ userId: userId });
    return result;
});
const deleteSingleUserService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield User_model_1.UserModels.deleteOne({ userId: userId });
    return result;
});
const updateUserService = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("from service",userData);
    const result = yield User_model_1.UserModels.findOneAndUpdate({ userId: userId }, userData, { new: true });
    return result;
});
const getAllOrdersByUserService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield User_model_1.UserModels.findOne({ userId: userId }).select('orders');
    return result;
});
exports.UserServices = {
    createUserService,
    GetAllUsersService,
    getSingleUserService,
    deleteSingleUserService,
    updateUserService,
    getAllOrdersByUserService,
};
