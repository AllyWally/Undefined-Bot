const { MessageEmbed } = require('discord.js');

module.exports = (client, member) => {

    if(!member)
        return;

        const join = member.guild.channels.cache.find(channel => channel.name === "welcome-leave")
        let memberjoin = new MessageEmbed()
        .setColor("GREEN")
        .setTitle("**Join Notification**")
        .setDescription(`${member} has joined the server!`)
        .setTimestamp()
        join.send(memberjoin)
}