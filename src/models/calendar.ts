'use strict'

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TagTeam = require('./tagteam').schema

const CalendarSchema = Schema({
	month: Number,
	year: Number,
	distribution: [TagTeam]
});

module.exports = mongoose.model('Calendar', CalendarSchema);