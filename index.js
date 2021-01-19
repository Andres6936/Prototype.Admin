"use strict";

const nunjucks = require('nunjucks');
const express = require('express');
const path = require('path');
const {MongoClient} = require('mongodb')

const app = express();
const port = 3000;

nunjucks.configure('public/html', {
    autoescape: true,
    express: app,
});

app.get('/', (req, res) => {
    res.render(path.join(__dirname + '/public/html/index.html'));
})

app.get('/html/:file', (req, res) => {
    res.render(path.join(__dirname + '/public/html/' + req.params.file));
})

app.use(express.static('public/'));
app.set('view engine', 'html');

app.listen(port, () => {
    console.log(`Executing app at http://localhost:${port}`);
})
