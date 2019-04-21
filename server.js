'use strict';

const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');
const Discord = require('discord.js');
const client = new Discord.Client();

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on Port ${ PORT }`));

  client.on('ready', () => {
    console.log('Bot Online!');
  });

const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  

  client.on('message', message => {
    
    if (message.content === '+question') {
      
      ws.send(`{"type":"question","ts":"2018-12-08T02:05:50.075Z","totalTimeMs":20000,"timeLeftMs":20000,"questionId":86541,"question":"Who Is Hosting?","category":"Tech","answers":[{"answerId":227665,"text":"iHelp"},{"answerId":227666,"text":"Rabbit Guy"}],"questionNumber":12,"questionCount":11,"askTime":"2018-12-08T02:05:50.074Z","extraLifeEligible":true,"questionMedia":null,"sent":"2018-12-08T02:05:50.145Z","c":1115}
  `);
  message.channel.send('Sent Question Through The Websocket!');
    }

    if (message.content === '+giftdrop') {
      ws.send(`{"type":"giftDrop","ts":"2019-02-13T02:11:29.034Z","timeLeftMs":10000,"giftDropId":694,"itemType":"extraLives","itemAmount":25,"sent":"2019-02-13T02:11:29.216Z","c":1745}`)
      message.channel.send('Giftdrop Sent!');
    }
  });

  //var ip = req.connection.remoteAddress;

  console.log("Connection From:"+ws._socket.remoteAddress);
  
  ws.on('close', () => console.log('Client disconnected'));
});

/*setInterval(() => {
  wss.clients.forEach((client) => {
    client.send(new Date().toTimeString());
  });
}, 1000);*/

client.login('NTY0OTQ3NTMzOTY1ODE5OTE0.XLwNkg.fZL2ZjautdU9jcStiIZRZSuAkjE');