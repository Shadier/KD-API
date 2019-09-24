'use strict'

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CodeSchema = Schema({
	codeWeek: String,
	validated: Boolean
});

module.exports = mongoose.model('Code', CodeSchema);