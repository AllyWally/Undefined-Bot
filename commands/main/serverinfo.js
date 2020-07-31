const { MessageEmbed, Message } = require('discord.js')


module.exports = {
    name: "serverinfo",
    category: 'main',
    description: 'Tells you information on your guild',
    usage: `[p]serverinfo`
}


module.exports.run = async(client, message, args, member) => {
    const serverinfo = MessageEmbed()

    message.channel.send(Embed)
}