const { MessageEmbed, Message } = require('discord.js');

module.exports = {
    name: "uptime",
    category: 'main',
    description: 'Will show the user the uptime of the bot',
    usage: `${(process.env.PREFIX)}uptime`
}

module.exports.run = async (client, message, args) => {
    let uptimeDays = Math.floor(client.uptime / 86400000);
    let uptimeHours = Math.floor(client.uptime / 3600000) % 24;
    let uptimeMinutes = Math.floor(client.uptime / 60000) % 60;
    let uptimeSeconds = Math.floor(client.uptime / 1000) % 60;
    let uptime = new MessageEmbed()
    .setTitle("Uptime :alarm_clock:")
    .setColor(process.env.COLOR)
    .addField('**Days**:', `${uptimeDays}`)
    .addField('**Hours**:', `${uptimeHours}`)
    .addField('**Minutes**:', `${uptimeMinutes}`)
    .addField('**Seconds**:', `${uptimeSeconds}`)
    .setTimestamp()
    message.channel.send(uptime)
    message.delete({ timeout: 0 })
}