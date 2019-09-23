"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User = require('../models/user');
exports.userRouter = express_1.Router();
exports.userRouter.get('/', (req, res) => {
    User.find((err, users) => {
        if (err)
            return res.status(500).send({ message: 'Internal Server error' });
        if (!users)
            return res.status(404).send({ message: 'users not founded!' });
        return res.status(200).send({ users });
    });
});
//# sourceMappingURL=UserController.js.map