'use strict'
import mongoose from 'mongoose';

const ProductSchema  = require('./product').schema
const Schema = mongoose.Schema;

const ListSchema = Schema({
	quantity: Number,
    product: ProductSchema,
    subtotal: Number,
 	purchaseId: String,
});

module.exports = mongoose.model('List', ListSchema);