const { MessageEmbed } = require('discord.js');
const { q } = require('./play.js')
module.exports = {
    name: "pause",
    category: 'music',
    description: 'Pause the current song',
    usage: `[p]pause`
}

module.exports.run = async(client, message, args) => {
    const serverQueue = q.get(message.guild.id)
    if (!message.member.voice.channel) return message.channel.send("You need to be in a voice channel to use music commands!")
    if (!serverQueue) return message.channel.send("There is nothing playing!")
    if (serverQueue.playing == false) {
        if (serverQueue.playing) return message.channel.send("The music is already playing!")
        serverQueue.playing = true
        serverQueue.connection.dispatcher.resume()
        message.channel.send("I have resumed the music for you")
        serverQueue.playing == true;
        return;
    }
    serverQueue.playing = false
    serverQueue.connection.dispatcher.pause()
    message.channel.send("I have paused the music for you")
    return undefined
}