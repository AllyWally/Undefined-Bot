const mongoose = require('mongoose');
const Guild = require('../models/guild');

module.exports = async(client, guild) => {
    await Guild.create({
            guildName: guild.name,
            _id: guild.id,
            prefix: client.config.prefix,
            welcomeChannel: null,
            welcomeMssg: null,
            leaveChannel: null,
            leaveMessage: null

        })
        guild.save()
        .then(result => client.logger.log(`I have been added to a guild`, "log"))
        .catch(err => console.error(err));

    console.log('I\'ve joined a new server!');
};