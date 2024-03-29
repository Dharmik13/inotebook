const express = require('express');
// then import router to use routes 
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'dharmikpatel$cric';


/*
 this simmiler to the
    app.get('/', (req, res) => {
    res.send(...);
})

but here we use router.get(....)
*/

//Route 1 : create a user using : Post " /api/auth/createuser" , No Login Required
router.post('/createuser', [
    // take it from express validator
    body('name', 'Enter valid name').isLength({ min: 2 }),
    body('email', 'Enter Valid Email please Cheack').isEmail(),
    body('password', 'Your Password is not valid , please Enter valid Password').isLength({ min: 5 })
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    // check the new created user is already exists or not with the help of email
    // take it from express validator
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {

            return res.status(400).json({ success, errors: "Sorry a user with this email is already exists" });
        }

        // bcrypt js - here we generate salt for more secure password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // create a new user 
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })
        // res.json(user);

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken });
    }

    catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Errors Occured");
    }

})



//Route 2 : Login a user using : Post " /api/auth/login" , No Login Required
router.post('/login', [
    // take it from express validator
    body('email', 'Enter Valid Email please Cheack').isEmail(),
    body('password', 'Password can Not be Blank').exists(),

], async (req, res) => {
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ success, errors: "Please Try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, errors: "Please Try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken });

    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Errors Occured");
    }

})


//Route 3 : Get the Loggedin user Details using : Post " /api/auth/getuser" , Login Required

router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Errors Occured");
    }

})
module.exports = router;