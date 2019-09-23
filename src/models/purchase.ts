'use strict'

import mongoose from 'mongoose';

const ClientSchema  = require('./client').schema
const Schema = mongoose.Schema;

const PurchaseSchema = Schema({
	client: ClientSchema,
    date: Date,
    subtotal: Number,
    total: Number,
});

module.exports = mongoose.model('Purchase', PurchaseSchema);