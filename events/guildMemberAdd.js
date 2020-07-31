const { MessageEmbed, Message } = require('discord.js');
const Guild = require('../models/guild.js')
module.exports = (client, member, message) => {

    if (!member) return;

    Guild.findById(member.guild.id, async function(err, res) {
        if (err) return message.channel.send(`It seems an error was recieved, this has been reported to our dev team.`)
        if (!res) return client.logger.log(`No response recieved when creating a new guild table`, "error")
        res.save()
        const join = member.guild.channels.cache.get(res.welcomeChannel)
        let joinR = member.guild.roles.cache.get(res.joinRole)
        if (!joinR) joinR = false;
        if (!join) return console.log(`no join mssg`)
        let welcomeMess = res.welcomeMssg
        if (!welcomeMess) welcomeMess = `Welcome {member} to **{guild.name}**!`
        let final = welcomeMess.replace(`{member}`, member).replace(`{guild.name}`, member.guild.name).replace(`{guild.id}`, member.guild.id).replace(`{guild.memberCount}`, member.guild.memberCount).replace(`{member.tag}`, member.tag).replace(`{member.username}`, member.username)
        let memberjoin = new MessageEmbed()
            .setColor("GREEN")
            .setTitle("**Join Notification**")
            .setDescription(final)
            .setTimestamp()
        join.send(memberjoin)
        if (joinR == false) return;
        member.roles.add(joinR)
    })
}