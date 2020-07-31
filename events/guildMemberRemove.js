const { MessageEmbed } = require('discord.js');
const Guild = require('../models/guild.js');
module.exports = (client, member) => {

    if (!member) return;

    Guild.findById(member.guild.id, async function(err, res) {
        if (err) return message.channel.send(`It seems an error was recieved, this has been reported to our dev team.`)
        if (!res) return client.logger.log(`No response recieved when creating a new guild table`, "error")
        res.save()
        const leaver = member.guild.channels.cache.get(res.leaveChannel)
        if (!leaver) return;
        let leaveMess = res.leaveMessage
        if (!leaveMess) leaveMess = `Welcome {member} to **{guild.name}**!`
        let final = leaveMess.replace(`{member}`, member).replace(`{guild.name}`, member.guild.name).replace(`{guild.id}`, member.guild.id).replace(`{guild.memberCount}`, member.guild.memberCount).replace(`{member.tag}`, member.tag).replace(`{member.username}`, member.username)
        let memebrgone = new MessageEmbed()
            .setColor("RED")
            .setTitle("**Leave Notification**")
            .setDescription(final)
            .setTimestamp()
        leaver.send(memebrgone)
    })

};