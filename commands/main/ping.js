const { MessageEmbed, Message , client} = require('discord.js');

module.exports = {
    name: "ping",
    category: 'main',
    description: 'Returns bot and API latency',
    usage: `${(process.env.PREFIX)}ping`
}

module.exports.run = async (client, message, args) => {
    const msg = await message.channel.send('Pinging....')
    const ping = new MessageEmbed()
    .setColor(process.env.COLOR)
    .setTitle(`🏓 Pong!`)
    .setDescription(`Bot Latency is **${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms** \nAPI Latency is **${Math.round(client.ws.ping)}ms**`)
    .setFooter(process.env.FOOTER)
    message.channel.send(ping)
    msg.delete({ timeout: 3000 });
    message.delete({ timeout: 0 })
    }