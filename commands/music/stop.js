const { MessageEmbed } = require('discord.js');
const { q } = require('./play.js')
module.exports = {
    name: "stop",
    category: 'music',
    description: 'Stop the current music playing',
    usage: `[p]stop`
}

module.exports.run = async(client, message, args) => {
    const serverQueue = q.get(message.guild.id)
    if (!message.member.voice.channel) return message.channel.send("You need to be in a voice channel to stop the music!")
    if (!serverQueue) return message.channel.send("There is nothing playing!")
    message.channel.send(`I stopped **${serverQueue.songs[0].title}**.`)
    serverQueue.connection.dispatcher.end()
    return undefined
}