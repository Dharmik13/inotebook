const express = require('express');
// then import router to use routes 
const router = express.Router();

/*
 this simmiler to the
    app.get('/', (req, res) => {
    res.send(...);
})

but here we use router.get(....)
*/
router.get('/', (req, res) => {

    obj = {
        name: 'Dharmik',
        age: 22
    }
    res.json(obj);
})


module.exports = router;