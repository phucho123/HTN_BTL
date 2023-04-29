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
  password: 'aio_UmMp89tirxTRtNmHylPj57udgFaR',
});

client.on('connect', () => {
  console.log('Connected to Adafruit IO MQTT broker');
});

client.on('error', (err) => {
  console.error('Connection error: ', err);
});

client.on('message', (topic, message) => {
  console.log('Received message:', topic," - ",message.toString());
  if(topic=="PhucHo123/feeds/ack") io.emit('ack',message.toString());
  else if(topic == "PhucHo123/feeds/adc1") io.emit("adc1",message.toString());
  else if(topic == "PhucHo123/feeds/adc2") io.emit("adc2",message.toString());
  else if(topic == "PhucHo123/feeds/image-detector") io.emit("image-detector",message.toString());
  else if(topic == "PhucHo123/feeds/button1") io.emit("button1",message.toString());
  else if(topic == "PhucHo123/feeds/button2") io.emit("button2",message.toString());
});

client.subscribe('PhucHo123/feeds/ack');
client.subscribe('PhucHo123/feeds/adc1');
client.subscribe('PhucHo123/feeds/adc2');
client.subscribe('PhucHo123/feeds/image-detector');
client.subscribe('PhucHo123/feeds/button1');
client.subscribe('PhucHo123/feeds/button2');
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