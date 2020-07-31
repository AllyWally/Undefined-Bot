const { MessageEmbed } = require('discord.js');
const { q } = require('./play.js')
module.exports = {
    name: "np",
    category: 'music',
    description: 'See what cool song is curretnly playing!',
    usage: `[p]np`
}

module.exports.run = async(client, message, args) => {
    const serverQueue = q.get(message.guild.id)
    if (!serverQueue) return message.channel.send("There is nothing playing!")
    message.channel.send(`Now Playing: **${serverQueue.songs[0].title}**`)

}