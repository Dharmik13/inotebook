// This is the entry Point of our Backend Programming  and this is express Server Also

const connectToMongo = require('./db');
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello I am Dharmik Patel");
});

app.listen(port, () => {
    console.log(`server started on the port http://localhost:${port}`);
});
connectToMongo();