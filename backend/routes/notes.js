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


//Route 3 : Update an existing note using : Put " /api/notes/updatenote:id" , Login Required

// update the note using the already exists note id  thats why i take this :-  /updatenote:id
router.put('/updatenote/:id', fetchuser, async (req, res) => {

    const { title, description, tag } = req.body;
    try {

        // create updateNote Object 
        const updateNote = {};

        if (title) { updateNote.title = title };
        if (description) { updateNote.description = description };
        if (tag) { updateNote.tag = tag };

        // check the note is exists or not into the database whatever you want to update 
        let note = await Note.findById(req.params.id);
        if (!note) {

            return res.status(404).send("Not Found");
        }
        // check the user , user is correct or not ,  user allowed to Updates ites own Notes or other user notes  , using toString() we can check
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: updateNote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Errors Occured");
    }

})


//Route 3 : Delete  existing notes using : Delete " /api/notes/deletenote:id" , Login Required

// Delete the note using the already exists note id  thats why i take this :-  /deletenote/:id
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        // check the note is exists or not into the database whatever you want to Delete 
        let note = await Note.findById(req.params.id);
        if (!note) {

            return res.status(404).send("Not Found");
        }
        // check the user , user is correct or not ,  user allowed to Delete ites own Notes or other user notes  , using toString() we can check
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id)

        res.json({ "success": "Note Has been Deleted", note: note });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Errors Occured");
    }


})

module.exports = router;