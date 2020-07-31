const { MessageEmbed, Message, embed } = require('discord.js')
const { StripIndents } = require("discord.js")

module.exports = {
    name: "userinfo",
    category: 'main',
    description: 'Tells you information on a user',
    usage: `[p]query`
}


module.exports.run = async(client, message, args) => {
        let embed = new MessageEmbed()
        var color
        var bot

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
        let target = message.mentions.users.first() || message.author;
        let status = member.user.presence.status;
        if (status == "online") {
            status = `Online!`
            color = "GREEN"
        } else if (status == "idle") {
            status = "Currently Idle"
            color = "YELLOW"
        } else if (status == "offline") {
            status = "Offline"
            color = "RED"
        } else {
            status = "Do Not Disturb"
            color = "BLACK"
        }

        if (member.user.bot) {
            bot = "Yes";
        } else {
            bot = "No"
        }
        embed.setAuthor(`Query For ${member.user.tag}`)
        embed.setThumbnail(member.user.displayAvatarURL())
        embed.setColor(process.env.COLOR)
        embed.setDescription(`• **Full username:** ${member.user.tag}\n• **ID:** ${member.user.id}\n• **Nickname:** ${member.nickname !== null ? `Nickname: ${member.nickname}` : "None"}\n• **Bot**: ${member.user.bot}`)
   embed.addField(`\n**Status**`, `• **Status:** ${status}\n• **Activity:** ${member.user.presence.game ? ` ${member.user.presence.game.name}`: "Not Playing Anything"}`)
   embed.addField(`\n**Permissions**`, `• **Roles:** ${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\` ${roles.name}\``).join(" **|** ") || "No Roles Found!"}\n`)
   embed.setFooter(`Joined Discord At ${member.user.createdAt}`)
   .setTimestamp();
   message.channel.send(embed)
   message.delete({ timeout: 0 })
}



/*module.exports.run = async (client, message, args) => {
    const query = new MessageEmbed()
    .setTitle("This Command Is Still being made!")
        message.channel.send(query)
}*/


/*const { Client, Collection, MessageEmbed } = require("discord.js");*/