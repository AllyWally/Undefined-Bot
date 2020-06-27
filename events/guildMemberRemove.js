const { MessageEmbed } = require('discord.js');

module.exports = (client, member) => {
        
    if(!member) 
            return
                const leave = member.guild.channels.cache.find(channel => channel.name === "welcome-leave")
                let send = new MessageEmbed()
                .setColor("RED")
                .setTitle("**Leave Notification**")
                .setDescription(`${member} has left the server!`)
                .setTimestamp()
                leave.send(send)
};