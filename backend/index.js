// This is the entry Point of our Backend Programming  and this is express Server Also

const connectToMongo = require('./db');
const express = require("express");
const app = express();
const port = 3000;

// Our Available Routes 
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
    console.log(`server started on the port http://localhost:${port}`);
});
connectToMongo();