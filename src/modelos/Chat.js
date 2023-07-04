const mongoose = require('mongoose');
const { Schema } = mongoose;


const EsquemaChat = new Schema({
    nick: String,
    msg: String,
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Chat', EsquemaChat);