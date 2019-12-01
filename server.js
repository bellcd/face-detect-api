const express = require('express');
const cors = require('cors');
const { PORT } = require('./config.js');
const app = express();

app.use(cors());

app.get('/image', (req, res, next) => {

});

app.listen(PORT, () => { console.log(`App is listening on port ${PORT}`)});