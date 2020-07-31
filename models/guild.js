const mongoose = require('mongoose');
const { defaultSettings: defaults } = require('../config');
const guildSchema = mongoose.Schema({
    _id: String,
    prefix: {
        type: String,
        default: defaults.prefix
    },
    welcomeChannel: {
        type: String,
        default: defaults.welcomeChannel
    },
    welcomeMssg: {
        type: String,
        default: null
    },
    leaveChannel: {
        type: String,
        default: defaults.leaveChannel
    },
    leaveMessage: {
        type: String,
        default: null
    },
    joinRole: { type: String, default: null }
});

module.exports = mongoose.model('Guild', guildSchema, 'guilds');