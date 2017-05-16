const express = require('express');
const fs = require('fs');
const routerMedia = express.Router();
const multer = require('multer');
const Media = require('../models/media');

var storage = multer.diskStorage({
    // set uploads folder
    destination: (req, file, cb) => {
        cb(null, 'ng-src/src/assets/uploads');
    },
    // set default filename
    filename: (req, file, cb) => {
        cb(null, file.originalname); // overwrites current file with same name!!!
    }
});

var upload = multer({ storage: storage }).single('file');

// Get All Media Files
routerMedia.get('/', (req, res, next) => {
    Media.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.json({ err: err });
        } else {
            res.json({ medias: items });
        }
    });
});

// Get Single Media File
routerMedia.get('/:id', (req, res, next) => {
    const mediaId = req.params.id;
    Media.findOne({ _id: mediaId }, (err, item) => {
        if (err) {
            console.log(err);
            res.json({ err: err });
        } else {
            res.json({ media: item });
        }
    });
});

// Add New Media File
routerMedia.post('/upload', upload, (req, res, next) => {

    // Initializing Media Info
    let newFile = new Media({
        filePath: 'assets\/uploads\/' + req.file.filename,
        fileName: req.file.filename,
        imageTitle: req.file.filename,
        imageAlt: req.file.filename,
        fileType: req.file.mimetype,
        fileSize: req.file.size,
        // imageDimension: fileDimension,
        fileUploadDate: Date.now()
    });

    // Add File to DB
    Media.addNewFile(newFile, (err, result) => {
        if (err) {
            res.json({ success: false, msg: 'Image Not added to DB. Error: ' + err });
        } else {
            res.json({ success: true, msg: 'Image Added to DB! ' + result });
        }
    });

    // Upload file to uploads folder
    upload(req, res, (err) => {
        if (err) {
            // Error occurred when uploading
            res.json({
                success: false,
                message: 'An error occurred when uploading: ' + err
            });
        }
        // Upload Successful
        res.json({
            success: true,
            message: 'Image Uploaded!'
        });
    });
});

// Update Media File
routerMedia.put('/:id', (req, res, next) => {
    const mediaId = req.params.id;
    const mediaObj = req.body;
    Media.findByIdAndUpdate({ _id: mediaId }, mediaObj, (err, result) => {
        if (err) {
            res.status(500).json({ success: false, msg: 'Media Not Updated. Error: ' + err });
        } else if (!result) {
            res.status(500).json({ success: false, msg: 'Media With Specified ID Not Found.' }); // ???
        } else {
            result.save((err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false, msg: 'An Error Occurred!' + err
                    });
                }
                res.status(200).json({ succes: true, msg: 'Media Updated. ' + result });
            });
        }
    });
});

module.exports = routerMedia;
