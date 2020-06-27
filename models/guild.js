const mongoose = require('mongoose');
const { config } = require('dotenv');
const { defaultSettings: defaults } = require('../config');

const guildSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    guildName: String,
    prefix: {
        type: String,
        default: defaults.prefix
    },
    welcomeChannel: {
        type: String,
        default: defaults.welcomeChannel
    },
    leaveChannel: {
        type: String,
        default: defaults.leaveChannel
    }
});

module.exports = mongoose.model('Guild', guildSchema, 'guilds');