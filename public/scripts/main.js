const { ads } = require("../../controllers/ads.controller");

const vidElem = document.querySelector('#vid');

const mqttConnAsync = () => (
    new Promise(async (resolve, reject) => {
        const conn = await mqtt.connect('wss://theygen', {
            port: 9001,
            username: 'ceis',
            password: 'iseedeadpeople'
        });

        conn.on('connect', () => resolve(conn));
    })
);

let mayUpdateAds = true;
let adsQueue = [];
const onAdsVideoEnd = () => {
    if (adsQueue.length > 0) {
        return vidElem.setAttribute('src', `http://localhost:8080${adsQueue.shift()}`);
    }

    mayUpdateAds = true;
};

(async () => {
    let mqttClient;
    console.log('Connecting to MQTT broker');
    try {
        mqttClient = await mqttConnAsync();
    } catch(e) {
        return console.log(`Error connecting to MQTT broker: ${e.message}\nexiting...`);
    }
    console.log('connected!');
    
    mqttClient.subscribe('ads/update');
    mqttClient.on('message', (topic, payload, packet) => {
        if (mayUpdateAds) {
            vidElem.setAttribute('src', `http://localhost:8080${payload}`);
            mayUpdateAds = false;
        } else {
            adsQueue.push(payload);
        }
    });
})();