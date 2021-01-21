"use strict";

const nunjucks = require('nunjucks');
const express = require('express');
const assert = require('assert');
const path = require('path');
const MongoClient = require('mongodb').MongoClient

// Connection URI
const uri = "mongodb://localhost:27017";

const app = express();
const port = 3000;

nunjucks.configure('public/html', {
    autoescape: true,
    express: app,
});

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended: true}));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(express.static('public/'));
app.set('view engine', 'html');

app.listen(port, () => {
    console.log(`Executing app at http://localhost:${port}`);
})

app.get('/', (req, res) => {
    res.render(path.join(__dirname + '/public/html/index.html'));
})

app.get('/html/:file', (req, res) => {
    res.render(path.join(__dirname + '/public/html/' + req.params.file));
})

app.post('/user/register', (req, res) => {

    const userData = req.body.user;

    const userInformation = {
        name: {
            first: userData.firstName,
            last: userData.lastName,
        },
        email: userData.email,
        password: userData.password,
    }

    console.log(userInformation);

    // Create a new MongoClient
    const client = new MongoClient(uri);

    // Use connect method to connect to the Server
    client.connect(function (err) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db('admin');
        const collection = db.collection('users');

        collection.insertOne(userInformation, (error, result) => {
            assert.strictEqual(error, null);
        });

        client.close();
    });

    res.render((path.join(__dirname + '/public/html/login.html')));
})
