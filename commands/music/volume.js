const { MessageEmbed } = require('discord.js');
const { q } = require('./play.js')
module.exports = {
    name: "volume",
    category: 'music',
    description: 'Change the bot\'s music volume ',
    usage: `[p]volume`
}

module.exports.run = async(client, message, args) => {
    const serverQueue = q.get(message.guild.id)
    if (!message.member.voice.channel) return message.channel.send("You need to be in a voice channel to use music commands!")
    if (!serverQueue) return message.channel.send("There is nothing playing!")
    if (!args[0]) return message.channel.send(`The volume is: **${serverQueue.volume}**`)
    if (isNaN(args[0])) return message.channel.send("That is not a valid amount to change the volume to!")
    if (args[0] >= 101) {
        serverQueue.connection.dispatcher.setVolumeLogarithmic(10)
        return message.channel.send(`I have changed the volume to: **100** (Over 100 is not supported.)`)
    }
    serverQueue.volume = args[0]
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 50)
    message.channel.send(`I have changed the volume to: **${args[0]}**`)
}