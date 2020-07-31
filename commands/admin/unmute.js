const { MessageEmbed, Message } = require("discord.js");

module.exports = {
    name: "unmute",
    description: "Unmute anyone whos has been muted ",
    category: "admin",
    usage: `[p]unmute`
}

module.exports.run = async(client, message, args) => {
    const reason = args.slice(1).join(" ")
    const mentionedMember = message.mentions.members.first()
    const role = message.guild.roles.cache.find(role => role.name === "Muted")
    if (!message.member.hasPermission('MUTE_MEMBERS')) return message.channel.send("You don\'t have permission to unmute users")
    if (!args[0]) return message.channel.send("You need to specify a user you will like to unmute")
    if (!mentionedMember) return message.channel.send("I can\'t find this user")
    if (mentionedMember.roles.highest.position >= message.member.roles.highest.position && message.author.id !== message.guild.owner.id) {
        return message.channel.send("You can\'t unmute this user")
    }
    if (mentionedMember.id === message.author.id) return
    if (!mentionedMember.roles.cache.has(role)) return message.channel.send("This user isn\'t muted")
    const embed = new MessageEmbed()
        .setAuthor(`${message.author.username} - (${message.author.id})`, message.author.displayAvatarURL())
        .setThumbnail(mentionedMember.user.displayAvatarURL())
        .setColor('RANDOM')
        .setDescription(`
    **Member:** ${mentionedMember.user.username} - (${mentionedMember.user.id})
    **Action:** Unmute
    **Reason:** ${reason || "Undefined"}
    **Channel:** ${message.channel}
    **Time:** ${moment().format('llll')}
    `)
    message.channel.send(embed)
    mentionedMember.roles.remove(role)
    return undefined
};