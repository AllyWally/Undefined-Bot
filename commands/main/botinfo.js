const { MessageEmbed } = require("discord.js");
const dev = process.env.DEV
const FOU = process.env.FOU
module.exports = {
    name: "botinfo",
    category: 'main',
    description: 'Returns bot and API latency',
    usage: `[p]botinfo`
}

module.exports.run = async(client, message, args) => {
    const embed = new MessageEmbed()
        .setTitle(`Current Prefix: ${process.env.PREFIX}`)
        .setThumbnail(client.user.displayAvatarURL())
        .addField(`Founders:`, FOU)
        .addField(`Developers:`, dev)
    message.channel.send(embed)
}