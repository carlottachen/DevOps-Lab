//server file

const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());//axios requests

var Rollbar = require('rollbar')
var rollbar = new Rollbar({
    accessToken: 'e627d307b849456abf60927ac7436a03',
    captureUncaught: true,
    captureUnhandledRejections: true,
})

let students = [];

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
})

app.get('/js', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/function.js'));
})

app.get('/css', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/styles.css'));
})

app.post('/api/student', (req, res) => {
    let { name } = req.body;
    name = name.trim(); //get rid of whitespace for uniformity
    students.push(name);
    rollbar.log('Student added successfully', { author: "Carlotta", type: 'manual entry' });
    res.status(200).send(students);
})

app.use(rollbar.errorHandler());

const port = process.env.PORT || 4000;
app.listen(port, () => { console.log(`Working on PORT ${port}`) });
