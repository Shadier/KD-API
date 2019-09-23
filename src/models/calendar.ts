'use strict'

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CalendarSchema = Schema({
	month: Number,
	year: Number,
});

module.exports = mongoose.model('Calendar', CalendarSchema);