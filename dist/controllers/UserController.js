"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const elUsuario = require('../models/user');
exports.userRouter = express_1.Router();
exports.userRouter.get('/', (req, res) => {
    elUsuario.find((err, users) => {
        if (err)
            return res.status(500).send({ message: 'Internal Server error' });
        if (!users)
            return res.status(404).send({ message: 'users not founded!' });
        return res.status(200).send({ users });
    });
});
exports.userRouter.get('/:id', (req, res) => {
    const userId = req.params.id;
    elUsuario.findById(userId, (err, user) => {
        if (err)
            return res.status(500).send({ message: 'Internal Server error' });
        if (!user)
            return res.status(404).send({ message: 'user not founded!' });
        return res.status(200).send({ user });
    });
});
exports.userRouter.post('/create', (req, res) => {
    const params = req.body;
    console.log(params);
    let usuario = new elUsuario();
    usuario.name = params.name;
    usuario.lastname = params.lastname;
    usuario.email = params.email;
    usuario.password = params.password;
    usuario.role = params.role;
    usuario.userIA = params.userIA;
    usuario.remoteDays = params.remoteDays;
    usuario.last_day = params.last_day;
    usuario.report = params.report;
    usuario.last_partner = params.last_partner;
    usuario.save((err, usrsave) => {
        console.log({ usrsave });
        console.log(err);
        if (err)
            return res.status(500).send({ message: 'Internal Server error, User doesn´t saved' });
        if (usrsave)
            res.status(200).send({ client: usrsave });
        else
            res.status(404).send({ message: 'Actor not saved!' });
    });
});
//# sourceMappingURL=UserController.js.map