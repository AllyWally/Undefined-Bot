const { MessageEmbed } = require('discord.js');
const { q } = require('./play.js')
module.exports = {
    name: "queue",
    category: 'music',
    description: 'See the server\'s queue',
    usage: `[p]queue`
}

module.exports.run = async(client, message, args) => {
        const serverQueue = q.get(message.guild.id)
        if (!serverQueue) return message.channel.send("There is nothing playing!")
        message.channel.send(`
__**Song Queue:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
**Now Playing:** ${serverQueue.songs[0].title}
`, { split: true })
return undefined
}