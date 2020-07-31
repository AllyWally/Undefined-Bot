const { MessageEmbed } = require('discord.js');


module.exports = {
    name: "push-update",
    category: 'owners',
    description: 'Gives everyone a update on the bot',
    usage: `[p]update`
}

module.exports.run = async(client, message, args) => {
    await message.delete()

    if (!client.config.devs.includes(message.author.id)) return message.channel.send(`Only our bot devs can use this.`).then(cock => cock.delete({ timeout: 5000 }))

    client.waitReply(message, `Supply the update notes.`).then(res => {
        if (res.toLowerCase() == "cancel") return message.channel.send(`Prompt cancelled`)
        let updateNotes = res;
        client.waitReply(message, `Supply the version of the bot`).then(res => {
            if (res.toLowerCase() == "cancel") return message.channel.send(`Prompt cancelled`)
            let vs = res;
            client.waitReply(message, `Finally where should this message be sent?`).then(res => {
                if (res.toLowerCase() == "cancel") return message.channel.send(`Prompt cancelled`)
                let update = new MessageEmbed()
                    .setColor(client.config.color)
                    .setTitle(`A bot update`)
                    .setDescription(`${updateNotes}`)
                    .setFooter(`New version: ${vs}`)

                let sender = message.guild.channels.cache.get(res)
                if (!sender) return message.channel.send(`That's not a valid channel`)
                sender.send(update)
                message.channel.bulkDelete(6)
                message.channel.send(`The update log was sent to ${sender}`)
            })

        })
    })


}