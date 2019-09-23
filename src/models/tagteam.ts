'use strict'

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const User  = require('./user').schema

const TagteamSchema = Schema({
	dayNumber: Number,
	usrMorning: User,
	usrAfternoon: User,
});

module.exports = mongoose.model('Tagteam', TagteamSchema);