const { MessageEmbed, Message } = require('discord.js');


module.exports = {
    name: "kick",
    category: 'admin',
    description: 'A command to kick someone from your guild!',
    usage: `${(process.env.PREFIX)}kick <client id or tag>`
}

module.exports.run = async (client, message, args) => {
        if(!message.member.hasPermission('KICK_MEMBERS'))
            return message.channel.send("You don't have enough permission to use this command!");
            let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]); 
                if(!member) 
                    return message.channel.send("Please mention a valid user in the server!");
                    if(!member.kickable)
                        return message.channel.send("I cannot kick this user!")
                    let reason = args.slice(1).join(' ');
                        if(!reason)
                            return message.channel.send("Please specify a reason!")
                        await member.kick(reason)
                            .catch(error => message.channel.send(`ERROR! Please report this to a Disk Bot Developer! Reason: ${error}`));
                        let user = `${member.user}`
                        const kick = new MessageEmbed()
                        .setColor("YELLOW")
                        .setTitle('**A player has been kicked!**')
                        .addField(`Player Kicked:`, `${user}`)
                        .addField(`Reason:`, `${reason}`)
                        .setTimestamp()
                        .setFooter(`${process.env.FOOTER} Moderation`)
                        message.channel.send(kick);
                        message.delete({ timeout: 3000 });
                        message.delete({ timeout: 0 })
}