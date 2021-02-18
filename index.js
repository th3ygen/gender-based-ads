require('dotenv').config();

const express = require('express');
const fs = require('fs');
const path = require('path');
const mqtt = require('./services/mqtt.service');

const app = express();

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/res', require('./routers/resource.router'));

(async () => {
    console.log('Connecting to MQTT broker');

    try {
        await mqtt.connect();
    } catch(e) {
        return console.log(`Error connecting to MQTT broker: ${e.message}\nexiting...`);
    }

    console.log('Connected to MQTT broker');

    require('./controllers/mqtt.controller');

    console.log(require('./controllers/ads.controller').findMostSuitable(15, 'male'));

    app.listen(8080, () => {
        console.log('Listening to port 8080');
    });
})();