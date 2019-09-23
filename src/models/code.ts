'use strict'

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CodeSchema = Schema({
	code: String,
});

module.exports = mongoose.model('Code', CodeSchema);