'use strict'

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CodeSchema = Schema({
	codeWeek: String,
	constraint: Number
});

module.exports = mongoose.model('Code', CodeSchema);