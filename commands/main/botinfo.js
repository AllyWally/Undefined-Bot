const { MessageEmbed } = require("discord.js");
const dev = process.env.DEV

module.exports = {
    name: "info",
    category: 'main',
    description: 'Returns bot and API latency',
    usage: `${(process.env.PREFIX)}botinfo`
}

module.exports.run = async (client, message, args) => {
    const embed = new MessageEmbed()
    .setTitle(`Current Prefix: ${process.env.PREFIX}`)
    .addField(`Developers:`, dev)
    message.channel.send(embed)
}