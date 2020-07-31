const mongoose = require('mongoose');
const Guild = require('../models/guild');

module.exports = async(client, guild) => {
    Guild.findOneAndDelete({
        _id: guild.id
    }, (err, res) => {
        if (err) console.error(err)
        console.log('I have been removed from a server!');
    });
};