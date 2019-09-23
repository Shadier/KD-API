"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Client = require('../models/client');
exports.clientRouter = express_1.Router();
exports.clientRouter.get('/', (req, res) => {
    Client.find((err, clients) => {
        if (err)
            return res.status(500).send({ message: 'Internal Server error' });
        if (!clients)
            return res.status(404).send({ message: 'clients not founded!' });
        return res.status(200).send({ clients });
    });
});
exports.clientRouter.get('/:id', (req, res) => {
    const clientId = req.params.id;
    Client.findById(clientId, (err, client) => {
        if (err)
            return res.status(500).send({ message: 'Internal Server error' });
        if (!client)
            return res.status(404).send({ message: 'Client not founded!' });
        return res.status(200).send({ client });
    });
});
exports.clientRouter.post('/', (req, res) => {
    const params = req.body;
    let client = new Client();
    if (params.name && params.lastname && params.email) {
        client.name = params.name;
        client.lastname = params.lastname;
        client.email = params.email;
        client.age = params.age;
        Client.find({ email: client.email.toLowerCase() }).exec((err, clients) => {
            if (err)
                return res.status(500).send({ message: 'Internal Server error, Client doesn´t saved' });
            if (clients && clients.length >= 1)
                return res.status(200).send({ message: "email registered before, please use another" });
            else {
                client.save((err, clientStored) => {
                    if (err)
                        return res.status(500).send({ message: 'Internal Server error, Client doesn´t saved' });
                    if (clientStored)
                        res.status(200).send({ client: clientStored });
                    else
                        res.status(404).send({ message: 'Client not saved!' });
                });
            }
        });
    }
    else {
        res.status(400).send({ message: 'Send all data please' });
    }
});
exports.clientRouter.patch('/:id', (req, res) => {
    const clientId = req.params.id;
    const params = req.body;
    Client.update({ _id: clientId }, { $set: params }, (err, clientUpdated) => {
        if (err)
            return res.status(500).send({ message: 'Internal Server error, Client doesn´t updated' });
        if (clientUpdated)
            res.status(200).send({ messafe: 'Client updated successfully!' });
        else
            res.status(404).send({ message: 'Client not updated!' });
    });
});
exports.clientRouter.delete('/:id', (req, res) => {
    const clientId = req.params.id;
    const params = req.body;
    Client.findByIdAndRemove(clientId, (err, clientDeleted) => {
        if (err)
            return res.status(500).send({ message: 'Internal Server error, Client doesn´t Deleted' });
        if (clientDeleted)
            res.status(200).send({ messafe: 'Client Deleted successfully!' });
        else
            res.status(404).send({ message: 'Client not Deleted!' });
    });
});
//# sourceMappingURL=ClientController.js.map