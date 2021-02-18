const mqtt = require('mqtt');

const client = mqtt.connect(process.env.MQTT_URL, {
    port: process.env.MQTT_PORT,
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD
});

let isConnected = false;

client.on('connect', () => isConnected = true);

const connect = () => (
    new Promise((resolve, reject) => {
        if (isConnected) return resolve(client);

        client.on('connect', () => resolve(client));
        client.on('error', e => reject(e));
    })
);

module.exports = {
    connect, client
};