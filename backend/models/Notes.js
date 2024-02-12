// This is the model for write the schemas  and use this schemas inside the routes 
const mongoose = require('mongoose');


const NotesSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: 'General'
    },
    date: {
        type: String,
        default: Date.now
    },

});

module.exports = mongoose.model('notes', NotesSchema)