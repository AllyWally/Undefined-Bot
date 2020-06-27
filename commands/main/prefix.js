const { MessageEmbed, Message , client} = require('discord.js');

module.exports = {
    name: "prefix",
    category: 'main',
    description: 'Tells the user what the prefix is',
    usage: `${(process.env.PREFIX)}prefix`
}

module.exports.run = async (client, message, args) => {
    let currentprefix = new MessageEmbed()
    .setColor(process.env.COLOR)
    .setTitle("**Curent Prefix**")
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(`My current prefix is \n **${process.env.PREFIX}** `)
    .setFooter(process.env.FOOTER)
    .setTimestamp()
    message.channel.send(currentprefix)
    message.delete({ timeout: 0 })
}