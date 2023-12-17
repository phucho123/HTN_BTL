const mqtt = require('mqtt');
const cors = require('cors');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const { Server } = require('socket.io');
const dotenv = require("dotenv");
dotenv.config();


app.use(cors);

const io = new Server(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
const client = mqtt.connect('mqtt://io.adafruit.com', {
  username: process.env.ADAFRUIT_USER,
  password: process.env.ADAFRUIT_KEY,
});

client.on('connect', () => {
  console.log('Connected to Adafruit IO MQTT broker');
});

client.on('error', (err) => {
  console.error('Connection error: ', err);
});

client.on('message', (topic, message) => {
  console.log('Received message:', topic, " - ", message.toString());
  // if (topic == "lexuanbach/feeds/ack") io.emit('ack', message.toString());
  if (topic == "lexuanbach/feeds/project-iot.auto") io.emit("auto", message.toString());
  else if (topic == "lexuanbach/feeds/project-iot.fan") io.emit("fan", message.toString());
  // else if (topic == "lexuanbach/feeds/image-detector") io.emit("image-detector", message.toString());
  else if (topic == "lexuanbach/feeds/project-iot.humidity") io.emit("humidity", message.toString());
  else if (topic == "lexuanbach/feeds/project-iot.temperature") io.emit("temperature", message.toString());
});

// client.subscribe('lexuanbach/feeds/ack');
client.subscribe('lexuanbach/feeds/project-iot.auto');
client.subscribe('lexuanbach/feeds/project-iot.fan');
// client.subscribe('PhucHo123/feeds/image-detector');
client.subscribe('lexuanbach/feeds/project-iot.humidity');
client.subscribe('lexuanbach/feeds/project-iot.temperature');
// client.publish(
//   '<username>/feeds/<feedname>',
//   'Hello, Adafruit IO from Node.js!',
//   (err) => {
//     if (err) {
//       console.error('Publish error: ', err);
//     } else {
//       console.log('Message sent');
//     }
//   }
// );


io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
  // socket.on('chat message', (msg) => {
  //   console.log('message: ' + msg);
  //   io.emit('chat message', msg);
  // });
});

http.listen(3001, () => {
  console.log("listen on port 3001");
})