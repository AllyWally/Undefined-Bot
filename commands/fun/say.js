const { MessageEmbed, Message, client } = require('discord.js');

module.exports = {
    name: "say",
    category: 'main',
    description: 'sends member messsage back in an embed',
    usage: `[p]say`
}
module.exports.run = async(client, message, args) => {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
    let user = message.mentions.users.first() || message.author;
    const embedMsg = message.content.split(" ").slice(1).join(" ")
    if (!embedMsg) return message.channel.send("You did not specify your message")
    let embed = new MessageEmbed()
    embed.setAuthor(`${member.user.tag}`)
    embed.setTitle("Your message was:")
    embed.setDescription(`**${message.content.split(" ").slice(1).join(" ")}**`)
    embed.setColor('RANDOM')
    embed.setTimestamp()
    message.channel.send(embed)
    message.delete({ timeout: 0 });
}