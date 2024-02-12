const express = require('express');
const router = express.Router();


/*
 this simmiler to the
    app.get('/', (req, res) => {
    res.send(...);
})

but here we use router.get(....)
*/
router.get('/', (req, res) => {
    res.json([]);
})

module.exports = router;