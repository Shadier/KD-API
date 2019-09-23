'use strict'

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProductSchema = Schema({
	codebar: String,
    name: String,
    description: String,
    size: String,
    cost: Number,
    price: Number,
    stock: Number
});

module.exports = mongoose.model('Product', ProductSchema);