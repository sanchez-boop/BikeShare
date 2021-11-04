const express = require('express')
const mongoose = require('mongoose');

const app = express();

app.post('api/test', (req, res) => {
    res.send("this is a test")
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port: ${port}`))
