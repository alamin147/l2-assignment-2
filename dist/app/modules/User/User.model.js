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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModels = exports.UpdateUserModel = exports.userSchema = exports.addressSchema = exports.fullNameSchema = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
exports.fullNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
    },
});
exports.addressSchema = new mongoose_1.Schema({
    city: { type: String, required: [true, 'City is required'] },
    country: { type: String, required: [true, 'Country is required'] },
    street: { type: String, required: [true, 'Street is required'] },
});
exports.userSchema = new mongoose_1.Schema({
    userId: {
        type: Number,
        required: [true, 'User ID is required'],
        unique: true,
    },
    username: {
        type: String,
        unique: true,
        required: [true, 'Username is required'],
    },
    fullName: { type: exports.fullNameSchema, required: [true, 'Name is required'] },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
    },
    email: { type: String, required: [true, 'Email is required'] },
    isActive: {
        type: Boolean,
        default: true,
    },
    address: {
        type: exports.addressSchema,
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
exports.userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.bcrypt_salt));
        next();
    });
});
exports.userSchema.methods.isUserExist = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.UserModels.findOne({ userId: userId });
        return existingUser;
    });
};
const updateUserSchema = new mongoose_1.Schema({
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
exports.UpdateUserModel = (0, mongoose_1.model)('UpdateUser', updateUserSchema);
exports.UserModels = (0, mongoose_1.model)('User', exports.userSchema);
