const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "poll",
    description: "Creates a poll",
    category: "admin",
    usage: "[p]poll"
}

module.exports.run = async(client, message, args) => {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("You don\'t have permission to mute users :(")
    let pollChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
    if (!pollChannel) return message.channel.send("You must mention a channel to send a poll")
    let pollDescription = args.slice(1).join(' ')
    if (!pollDescription) return message.channel.send("You must give a poll description")

    let embed = new MessageEmbed()
        .setTitle('❗ New Poll ❗')
        .setDescription(`Question: **${pollDescription}**`)
        .setFooter(`Poll started by: ${message.author.username}`)
        .setColor('BLUE')
    let msg = await client.channels.cache.get(pollChannel.id).send(embed)
    await msg.react('✅')
    await msg.react('❌')
    //Cleaning is retarded
    // And gay as fuck
}