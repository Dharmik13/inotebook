const express = require('express');
// then import router to use routes 
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');


/*
 this simmiler to the
    app.get('/', (req, res) => {
    res.send(...);
})

but here we use router.get(....)
*/

// create a user using : Post " /api/auth/" , does not require Authentication
router.post('/', [
    body('name', 'Enter valid name').isLength({ min: 2 }),
    body('email', 'Enter Valid Email please Cheack').isEmail(),
    body('password', 'Your Password is not valid , please Enter valid Password').isLength({ min: 5 })
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }).then(user => res.json(user))
        .catch(err => {
            console.log(err)
            res.json({ error: 'Please enter a Unique value for email', message: err.message })
        })

})


module.exports = router;