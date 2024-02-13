const express = require('express');
// then import router to use routes 
const router = express.Router();
const user = require('../models/User');
const User = require('../models/User');

/*
 this simmiler to the
    app.get('/', (req, res) => {
    res.send(...);
})

but here we use router.get(....)
*/

// create a user using : Post " /api/auth/" , does not require Authentication
router.post('/', (req, res) => {
    console.log(req.body);
    const user = User(req.body);
    user.save();
    res.send(req.body);
})


module.exports = router;