'use strict'

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Item  = require('./item').schema

const ReportSchema = Schema({
    comment: String,
    qualification: Number,
    reportedAt: Date,
    checklist: [Item]
});

module.exports = mongoose.model('Report', ReportSchema);