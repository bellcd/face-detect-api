const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3030;

app.use(cors());

app.get('/image', (req, res, next) => {

});

app.listen(PORT, () => { console.log(`App is listening on port ${PORT}`)});