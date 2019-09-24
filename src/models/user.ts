'use strict'

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Report  = require('./report').schema

const UserSchema = Schema({
	name: String,
    lastname: String,
    email: String,
    password: String,
    role: String,
    userIA: Boolean,
        monday: Boolean,
        tuesday: Boolean,
        wednesday: Boolean,
        thursday: Boolean,
        friday: Boolean,

    last_partner: this,
    last_day: Number
});

module.exports = mongoose.model('User', UserSchema);