'use strict'

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = Schema({
	name: String,
    lastname: String,
    email: String,
    age: Number,
});

module.exports = mongoose.model('User', UserSchema);