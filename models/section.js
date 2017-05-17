const mongoose = require('mongoose');

const SectionSchema = mongoose.Schema({
    secTitle: String,
    secContent: String,
    secImage: String
});

const Section = module.exports = mongoose.model('section', SectionSchema);
