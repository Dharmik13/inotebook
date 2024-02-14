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

// create a user using : Post " /api/auth/createuser" , No Login Required
router.post('/createuser', [
    body('name', 'Enter valid name').isLength({ min: 2 }),
    body('email', 'Enter Valid Email please Cheack').isEmail(),
    body('password', 'Your Password is not valid , please Enter valid Password').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // check the new created user is already exists or not with the help of email
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ errors: "Sorry a user with this email is already exists" });
        }

        // create a new user 
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        res.json(user);
    }

    catch (error) {
        console.error(error.message);
        return res.status(500).send("Some Error Occured");
    }

})

module.exports = router;