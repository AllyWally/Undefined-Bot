const { MessageEmbed } = require('discord.js');
const { q } = require('./play.js')
module.exports = {
    name: "resume",
    category: 'music',
    description: 'Resume the previous song',
    usage: `[p]resume`
}

module.exports.run = async(client, message, args) => {
    const serverQueue = q.get(message.guild.id)
    if (!message.member.voice.channel) return message.channel.send("You need to be in a voice channel to use music commands!")
    if (!serverQueue) return message.channel.send("There is nothing playing!")

}