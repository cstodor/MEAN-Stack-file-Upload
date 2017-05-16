const mongoose = require('mongoose');

const MediaSchema = mongoose.Schema({
    filePath: {
        type: String,
        required: true,
        trim: true
    },
    fileName: String,
    imageTitle: {
        type: String,
        default: ''
    },
    imageAlt: {
        type: String,
        default: ''
    },
    fileType: String,
    fileSize: String,
    // imageDimension: String,
    fileUploadDate: Date
});

const Media = module.exports = mongoose.model('uploads', MediaSchema);

module.exports.addNewFile = (newFile, callback) => {
    newFile.save(callback);
}