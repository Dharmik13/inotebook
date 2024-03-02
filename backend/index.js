// This is the entry Point of our Backend Programming  and this is express Server Also

const connectToMongo = require('./db');
connectToMongo();
const express = require("express");
var cors = require('cors')


const app = express();
app.use(cors())
const port = 5000;

app.use(express.json());
// Our Available Routes 
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
    console.log(`inotebook Backend listening at http://localhost:${port}`);
});