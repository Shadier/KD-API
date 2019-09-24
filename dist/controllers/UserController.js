"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const theUser = require('../models/user');
exports.userRouter = express_1.Router();
exports.userRouter.get('/', (req, res) => {
    theUser.find((err, users) => {
        if (err)
            return res.status(500).send({ message: 'Internal Server error' });
        if (!users)
            return res.status(404).send({ message: 'users not founded!' });
        return res.status(200).send({ users });
    });
});
exports.userRouter.get('/:id', (req, res) => {
    const userId = req.params.id;
    if (req.params.id != null) {
        theUser.findById(userId, (err, user) => {
            if (err)
                return res.status(500).send({ message: 'Internal Server error' });
            if (!user)
                return res.status(404).send({ message: 'user not founded!' });
            return res.status(200).send({ user });
        });
    }
});
exports.userRouter.post('/create', (req, res) => {
    const params = req.body;
    let usuario = new theUser();
    let idpartner = params.last_partner;
    usuario.name = params.name;
    usuario.lastname = params.lastname;
    usuario.email = params.email;
    usuario.password = params.password;
    usuario.role = params.role;
    usuario.userIA = params.userIA;
    usuario.monday = params.monday;
    usuario.tuesday = params.tuesday;
    usuario.wednesday = params.wednesday;
    usuario.thursday = params.thursday;
    usuario.friday = params.friday;
    usuario.remoteDays = params.remoteDays;
    usuario.last_day = params.last_day;
    usuario.report = params.report;
    theUser.findById(idpartner, (err, result) => {
        console.log(result);
        if (err)
            return res.status(500).send({ message: 'Error interno' });
        if (result)
            usuario.last_partner = result;
        else
            usuario.last_partner = null;
    });
    usuario.save((err, usrsave) => {
        console.log({ usrsave });
        console.log(err);
        if (err)
            return res.status(500).send({ message: 'Internal Server error, User doesn´t saved' });
        if (usrsave)
            res.status(200).send({ client: usrsave });
        else
            res.status(404).send({ message: 'Usuario not saved!' });
    });
});
exports.userRouter.patch('/update', (req, result) => {
    const params = req.body;
    const leId = params.id;
    console.log(leId);
    theUser.update({ _id: leId }, { $set: params }, (err, res) => {
        if (err)
            return result.status(500).send({ message: 'Internal Server error, User doesn´t saved' });
        if (res)
            result.status(200).send({ client: res });
        else
            result.status(404).send({ message: 'Usuario not saved!' });
    });
});
//# sourceMappingURL=UserController.js.map