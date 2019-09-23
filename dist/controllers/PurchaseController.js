"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Purchase = require('../models/Purchase');
const Client = require('../models/client');
exports.purchaseRouter = express_1.Router();
exports.purchaseRouter.get('/', (req, res) => {
    Purchase.find((err, purchases) => {
        if (err)
            return res.status(500).send({ message: 'Internal Server error' });
        if (!purchases)
            return res.status(404).send({ message: 'purchases not founded!' });
        return res.status(200).send({ purchases });
    });
});
exports.purchaseRouter.get('/:id', (req, res) => {
    const purchaseId = req.params.id;
    Purchase.findById(purchaseId, (err, purchase) => {
        if (err)
            return res.status(500).send({ message: 'Internal Server error' });
        if (!purchase)
            return res.status(404).send({ message: 'purchase not founded!' });
        return res.status(200).send({ purchase });
    });
});
exports.purchaseRouter.delete('/:id', (req, res) => {
    const purchaseId = req.params.id;
    const params = req.body;
    Purchase.findByIdAndRemove(purchaseId, (err, purchaseDeleted) => {
        if (err)
            return res.status(500).send({ message: 'Internal Server error, purchase doesn´t Deleted' });
        if (purchaseDeleted)
            res.status(200).send({ messafe: 'purchase Deleted successfully!' });
        else
            res.status(404).send({ message: 'purchase not Deleted!' });
    });
});
exports.purchaseRouter.post('/', (req, res) => {
    const params = req.body;
    let purchase = new Purchase();
    if (params.date && params.clientId && params.subtotal && params.total) {
        purchase.date = params.date;
        purchase.subtotal = params.subtotal;
        purchase.total = params.total;
        Client.findById(params.clientId, (err, client) => {
            if (err)
                return res.status(500).send({ message: 'Internal Server error, purchase doesn´t saved' });
            if (!client)
                return res.status(200).send({ message: "client doesn't exists" });
            else {
                purchase.client = client;
                purchase.save((err, purchaseStored) => {
                    if (err)
                        return res.status(500).send({ message: 'Internal Server error, purchase doesn´t saved' });
                    if (purchaseStored)
                        res.status(200).send({ purchase: purchaseStored });
                    else
                        res.status(404).send({ message: 'purchase not saved!' });
                });
            }
        });
    }
    else {
        res.status(400).send({ message: 'Send all data please' });
    }
});
exports.purchaseRouter.patch('/:id', (req, res) => {
    const purchaseId = req.params.id;
    const params = req.body;
    if (params.clientId) {
        Client.findById(params.clientId, (err, client) => {
            if (err)
                return res.status(500).send({ message: 'Internal Server error, List doesn´t saved' });
            if (!client)
                return res.status(400).send({ message: "that client doesnt exists" });
            else {
                params.client = client;
                Purchase.findByIdAndUpdate(purchaseId, params, (err, purchaseUpdated) => {
                    if (err)
                        return res.status(500).send({ message: 'Internal Server error, Purchase doesn´t updated' });
                    if (purchaseUpdated)
                        res.status(200).send({ messafe: 'Purchase updated successfully!' });
                    else
                        res.status(404).send({ message: 'Purchase not updated!' });
                });
            }
        });
    }
    else {
        Purchase.findByIdAndUpdate(purchaseId, params, (err, purchaseUpdated) => {
            if (err)
                return res.status(500).send({ message: 'Internal Server error, Purchase doesn´t updated' });
            if (purchaseUpdated)
                res.status(200).send({ messafe: 'Purchase updated successfully!' });
            else
                res.status(404).send({ message: 'Purchase not updated!' });
        });
    }
});
//# sourceMappingURL=PurchaseController.js.map