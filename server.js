const express = require('express');
const cors = require('cors');
const utils = require('./utils.js');
const Clarifai = require('clarifai');
const bodyParser = require('body-parser');
const { PORT, KEYS_CLARIFAI } = require('./config.js');
const app = express();


app.use(cors());
app.use(bodyParser.json());

const clarifaiApp = new Clarifai.App({
  apiKey: KEYS_CLARIFAI
});

app.post('/image', (req, res, next) => {
  const { imgWidth, imgHeight, imgUrl } = req.body;

  clarifaiApp.models.initModel({id: Clarifai.FACE_DETECT_MODEL})
  .then(faceModel => {
    return faceModel.predict(imgUrl);
  })
  .then(response => {
    let hasNoFace = false;
    let regions = [];
    let boxPositions = [];

    if (response.outputs[0].data.regions.length === 0) {
      hasNoFace = true;
    } else {
      regions = response.outputs[0].data.regions;
    }

    boxPositions = regions.map(region => {
      return utils.calculateBox(region['region_info']['bounding_box'], imgWidth, imgHeight);
    });
    res.status(200).json({ regions, boxPositions, imgWidth, imgHeight, hasNoFace });
    })
  .catch(err => {
    console.log('err: ', err);
    res.status(400).send(err); // TODO: good way to handle the error??
  });
});

app.listen(PORT, () => { console.log(`App is listening on port ${PORT}`)});
// fixes mis-cased Procfile