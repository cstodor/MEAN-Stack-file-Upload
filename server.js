const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const dbConfig = require('./config/db');

const sectionRoutes = require('./routes/section-routes');
const mediaRoutes = require('./routes/media-routes');

const app = express();
const port = 4000;

app.listen(port, () => {
    console.log('Server Stater at: ' + port);
});

mongoose.connect(dbConfig.database);
mongoose.connection
    .on('connected', () => {
        console.log('Connected to database ' + dbConfig.database);
    })
    .on('error', (err) => {
        console.log('Error: ' + err);
    });

app.use(bodyParser.json());
app.use(cors());

app.use('/v1/sections', sectionRoutes);
app.use('/v1/media', mediaRoutes);

app.get('/', (req, res) => {
    res.send('Error: Cannot find public files.');
});
