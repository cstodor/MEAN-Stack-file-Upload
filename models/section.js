const mongoose = require('mongoose');

const SectionSchema = mongoose.Schema({
    secTitle: String,
    secContent: String,
    secImage: {
        type: String,
        default: 'assets/img/default'
    },
});

const Section = module.exports = mongoose.model('section', SectionSchema);
