const mongoose = require('mongoose');
const Guild = require('../models/guild');

module.exports = async (client, guild) => {
    guild = new Guild({
        _id: mongoose.Types.ObjectId(),
        guildID: guild.id,
        guildName: guild.name,
        guildPrefix: guild.prefix
    });

    guild.save()
    .then(result => console.log(result))
    .catch(err => console.error(err));

    console.log('I\'ve joined a new server!');
};