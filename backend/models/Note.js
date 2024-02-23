// This is the model for write the schemas  and use this schemas inside the routes 

const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose');
const { Schema } = mongoose;
// take it from mongoose schema
const NotesSchema = new Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
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

module.exports = mongoose.model('notes', NotesSchema);