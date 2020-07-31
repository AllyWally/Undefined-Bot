const { MessageEmbed } = require('discord.js');
const { q } = require('./play.js')
module.exports = {
    name: "skip",
    category: 'music',
    description: 'Skip the current song',
    usage: `[p]skip`
}

module.exports.run = async(client, message, args) => {
    const serverQueue = q.get(message.guild.id)
    if (!message.member.voice.channel) return message.channel.send("You need to be in a voice channel to skip the music!")
    if (!serverQueue) return message.channel.send("There is nothing playing!")
    serverQueue.connection.dispatcher.end('Skip command has been used!');
}