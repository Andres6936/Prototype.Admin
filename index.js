"use strict";

const nunjucks = require('nunjucks');
const express = require('express');
const path = require('path');
const {MongoClient} = require('mongodb')
//
// // Connection URI
// const uri = "mongodb://localhost:27017";
//
// const client = new MongoClient(uri);
//
// async function run() {
//     try {
//         // Connect the client to server
//         await client.connect();
//
//         // Establish and verify connection
//         const databse = client.db("admin");
//         const collection = databse.collection("users");
//
//         console.log("Connected successfully to server");
//
//         return collection;
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }
//
// run().catch(console.dir);

const app = express();
const port = 3000;

nunjucks.configure('public/html', {
    autoescape: true,
    express: app,
});

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());
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
    console.log(req.body.user.firstName);
    res.send('Send File ' + req.body.user.lastName);
})
