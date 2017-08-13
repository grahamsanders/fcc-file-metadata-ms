'use strict'

const express = require('express');
const multer = require('multer');
const app = express();
const upload = multer();

app.get('/favicon.ico', (request, response) => {
  response.status(204).end();
});

app.get('/', (request, response) => {
  response.sendFile(process.cwd() + '/views/index.html');
});

app.post('/filesize', upload.single('file'), (request, response) => {
  response.status(200).send({ "size" : request.file.size });
});

// Respond not found to all the wrong routes
app.use( (req, res, next) => {
  res.status(404);
  res.type('txt').send('Not found');
});

// Error Middleware
app.use( (err, req, res, next) => {
  if(err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || 'SERVER ERROR');
  }  
});

app.listen(process.env.PORT, () => {
  console.log('Node.js listening on ' + process.env.PORT + '...');
});
