'use strict'

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = Schema({
	name: String,
    lastname: String,
    email: String,
    password: String,
    role: Number,
    userIA: Boolean,
    monday: Boolean,
    tuesday: Boolean,
    wednesday: Boolean,
    thursday: Boolean,
    friday: Boolean,
    last_partner: this,
    last_day: Number,
});

module.exports = mongoose.model('User', UserSchema);