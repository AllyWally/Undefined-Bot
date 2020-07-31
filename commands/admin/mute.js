const { MessageEmbed, Message } = require("discord.js");

module.exports = {
    name: "mute",
    description: "Mute anyone who break rules",
    category: "admin",
    usage: "[p]mute <@mention> <reason>"
}

module.exports.run = async(client, message, args) => {
    const ms = require('ms')
    const moment = require('moment')
    const mentionedMember = message.mentions.members.first()
    const reason = args.slice(2).join(" ")
    const regex = /\d+[smhdw]/.exec(args[1]);
    let role = message.guild.roles.cache.find(role => role.name === "Muted")
    if (!message.guild.roles.cache.find(role => role.name === "Muted")) {
        await (message.guild.roles.create({
            data: {
                name: 'Muted',
                color: 'GRAY',
            },
            reason: `Needed to excute the command`,
        }));
    }
    if (!message.member.hasPermission('MUTE_MEMBERS')) return message.channel.send("You don\'t have permission to mute users :(")
    if (!message.guild.me.hasPermission('MUTE_MEMBERS')) return message.channel.send("I don\'t have permission to mute users")
    if (!args[0]) return message.channel.send(`You need to mention a user to mute! if you did make sure the role name is named "Muted" `)
    if (!mentionedMember) return message.channel.send('I can\'t find this user')
    if (!args[2]) return message.channel.send("You need to give a reason on why you will like to mute this user!")
    if (!regex) return message.channel.send("You need to specify how long you will like to mute this user for!")
    if (ms(regex[0]) > 214748367) return message.channel.send("Make sure you don\'t mute a member for more than 25days")
    if (mentionedMember.roles.highest.position >= message.member.roles.highest.position && message.author.id !== message.guild.owner.id) {
        return message.channel.send("You can\'t mute a user that has a higher or equal role than you")

    }
    if (mentionedMember.id === message.author.id) return message.channel.send("why do you want to mute yourself?")
    if (mentionedMember.roles.cache.has(role)) return message.channel.send("This user is already muted")

    var embed = new MessageEmbed()
        .setAuthor(`${message.author.username} - (${message.author.id})`, message.author.displayAvatarURL())
        .setThumbnail(mentionedMember.user.displayAvatarURL())
        .setColor(process.env.COLOR)
        .setDescription(`
  **Member:** ${mentionedMember.user.username} - (${mentionedMember.user.id})
  **Action:** **Mute**
  **Reason:** ${reason || "Undefined"}
  **Length:** ${regex}
  **Channel:** ${message.channel}
  **Time:** ${moment().format('llll')}
  `)
    message.channel.send(embed)
    mentionedMember.roles.add(role)
    setTimeout(() => {
        if (!mentionedMember.roles.cache.has(role)) return undefined
        mentionedMember.roles.remove(role)
        message.channel.send(`${mentionedMember} has now been unmuted after ${regex[0]}`)
    }, ms(regex[0]))
}