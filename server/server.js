const mqtt = require('mqtt');
const cors = require('cors');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const { Server } = require('socket.io');

app.use(cors);

const io = new Server(http,{
  cors: {
    origin:"http://localhost:3000",
    methods: ["GET","POST"]
  }
});
const client = mqtt.connect('mqtt://io.adafruit.com', {
  username: 'PhucHo123',
  password: 'aio_AoPz05HKIPs0c2QGpUMldKkGCrTc',
});

client.on('connect', () => {
  console.log('Connected to Adafruit IO MQTT broker');
});

client.on('error', (err) => {
  console.error('Connection error: ', err);
});

client.on('message', (topic, message) => {
  console.log('Received message:', message.toString());
  io.emit('ack',message.toString());
});

client.subscribe('PhucHo123/feeds/ack');

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

http.listen(3001,() => {
    console.log("listen on port 3001");
})