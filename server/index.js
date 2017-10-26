// server.js

// set up ========================
var express = require('express');
var app = express();                               // create our app w/ express
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var fs = require('fs');
var csv = require('csvtojson');
var json2csv = require('json2csv');

app.use(express.static(__dirname + '/csv'));                 // set the static files location /public/img will be /img for users
app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

//for CORS(port)
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// api ---------------------------------------------------------------------

app.get('/api/csv', function (req, res, next) {
    const csvName = req.query.name;
    let sheet = [];
    let setting;
    let csvPath = './server/csv/' + csvName + '.csv';
    let settingPath = './server/csv.setting/' + csvName + '.json';
    csv()
        .fromFile(csvPath)
        .on('json', jsonObj => {
            sheet.push(jsonObj);
        })
        .on('done', (error) => {
            if (error) {
                res.send(error);
            }
            else {
                fs.readFile(settingPath, 'utf8', function (err, content) {
                    if (!err) setting = JSON.parse(content);
                    let data = {};
                    data[csvName] = {
                        sheet,
                        setting
                    }
                    res.json(data);
                });
            }
        })
});

app.post('/api/save', function (req, res, next) {
    const fields = Object.keys(req.body.table[0]);
    try {
        var csvResult = json2csv({ data: req.body.table, fields: fields });
        fs.writeFile('./server/csv/' + req.body.name + '.csv', csvResult, function (err) {
            if (err) throw err;
            console.log('file saved');
            res.send('saved');
        });
    } catch (err) {
        // Errors are thrown for bad options, or if the data is empty and no fields are provided.
        // Be sure to provide fields if it is possible that your data array will be empty.
        console.error(err);
    }
});

// listen (start app with node server.js) ======================================
app.listen(8081);
console.log("App listening on port 8081");