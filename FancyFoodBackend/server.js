
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./routes/routes.js')(app, fs);

const server = app.listen(3001, () => {
    console.log('listening on port %s...', server.address().port);
});


// var db = require('./db.json');
//
// const jsonServer = require('json-server');
// const server = jsonServer.create();
// const router = jsonServer.router('./db.json');
// const middlewares = jsonServer.defaults();
// const port = process.env.PORT || 3355;
// server.use(jsonServer.bodyParser);
// server.use(middlewares);
//
// const imageToBase64 = require('image-to-base64');
//
//
// const getBase64StringFromDataURL = (dataURL) =>
//     dataURL.replace('data:', '').replace(/^.+,/, '');
//

//
// server.use(jsonServer.rewriter({
//     '/fancy_food_api': '/fancy_food_api'
// }));
//
// server.post('/tables', (req, res) => {
//     if (req.method === 'POST') {
//         let tables
//     }
// });
//
// server.get('/get/user_templates', (req, res) => {
//     if (req.method === 'GET') {
//
//     }
//
// });
//
// server.get('/get/system_templates', (req, res) => {
//     if (req.method === 'GET') {
//
//     }
// });
//
//
// server.use(router);
// server.listen(port);

