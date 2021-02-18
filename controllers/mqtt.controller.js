const root = require('app-root-path').path;
const fs = require('fs');
const path = require('path');

const mqtt = require(path.join(root, 'services/mqtt.service'));
const ads = require('../controllers/ads.controller');

(async () => {
    const client = await mqtt.connect();

    /* 
        age: int, gender: int
    */
    client.subscribe('ads/decide');

    client.on('message', (topic, payload, packet) => {
        try {

            /* similiraty scoring */
            // ...
            const { age, gender } = JSON.parse(payload);

            const suitableAdsUrl = ads.findMostSuitable(age, gender);

            if (suitableAdsUrl !== '') {
                client.publish('ads/update', suitableAdsUrl);
            }
        } catch(e) {
            console.log(`Error reading MQTT payload: ${e.message}`);
        }
    });
})();