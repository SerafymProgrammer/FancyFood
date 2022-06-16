
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const fs = require('fs');
const migrations = require("./migrations");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./routes/routes.js')(app, fs);

const server = app.listen(3001, () => {
    console.log('listening on port %s...', server.address().port);
});


fs.readFile(
    './migration_config.json', 'utf8', (err, data) =>{
        let config = JSON.parse(data);
        if (!config.success_migration) {
            migrations(app, fs)
        }
    })


