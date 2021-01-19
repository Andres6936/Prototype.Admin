"use strict";

const express = require('express');
const path = require('path');
const {MongoClient} = require('mongodb')

const app = express();
const port = 3000;

// Connection URI
const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri);

async function run() {
    try {
        // Connect the client to server
        await client.connect();

        // Establish and verify connection
        await client.db("admin").command({ping: 1});
        console.log("Connected successfully to server");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
})

app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
})

app.get('/html/:file', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/html/' + req.params.file));
})

app.use(express.static('public/'));

app.listen(port, () => {
    console.log(`Executing app at http://localhost:${port}`);
})
