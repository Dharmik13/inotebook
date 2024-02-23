const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

/*
 this simmiler to the
    app.get('/', (req, res) => {
    res.send(...);
})

but here we use router.get(....)
*/
// router.get('/', (req, res) => {
//     res.json([]);
// })


//Route 1 : fetch all the notes using : Get " /api/notes/fetchallnots" , Login Required

router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        // fetch all the notes using .find method and we get all the notes of user using user id 
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Errors Occured");
    }

})


//Route 2 : Add a note using : Post " /api/notes/addnote" , Login Required

router.post('/addnote', fetchuser, [
    // take it from express validator
    body('title', 'Enter valid title').isLength({ min: 2 }),
    body('description', 'Your Description Must be 5 characters').isLength({ min: 5 })
], async (req, res) => {

    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })

        const savedNote = await note.save()
        res.json(savedNote);

    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Errors Occured");
    }

})
module.exports = router;