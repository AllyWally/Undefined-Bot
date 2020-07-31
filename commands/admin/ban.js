const { MessageEmbed, Message } = require('discord.js');


module.exports = {
    name: "ban",
    category: 'admin',
    description: 'A command to ban someone from your guild!',
    usage: `[p]ban <client id or tag>`
}

module.exports.run = async(client, message, args) => {
    if (!message.member.hasPermission('BAN_MEMBERS'))
        return message.channel.send("You don't have enough permission to use this command!");
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member)
        return message.channel.send("Please mention a valid user in the server!");
    if (!member.bannable)
        return message.channel.send("I cannot ban this user!")
    let reason = args.slice(1).join(' ');
    if (!reason)
        return message.channel.send("Please specify a reason!")
    await member.ban(reason)
        .catch(error => message.channel.send(`ERROR! Please report this to a Undefined Bot Developer! Reason: ${error}`));
    const ban = new MessageEmbed()
        .setColor("RED")
        .setTitle('**A player has been banned!**')
        .addField(`Player Banned:`, `${member.user}`)
        .addField(`Reason:`, `${reason}`)
        .setTimestamp()
        .setFooter(`${client.config.Footer} Moderation`)
    message.channel.send(ban);
    message.delete({ timeout: 3000 });
    message.delete({ timeout: 0 })
}