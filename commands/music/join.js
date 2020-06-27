const { MessageEmbed, Message , client} = require('discord.js');

module.exports = {
    name: "join",
    category: 'music',
    description: 'Joins the voice channel, This would work as a music command',
    usage: `${(process.env.PREFIX)}join`
}

module.exports.run = async (client, message, args) => {
        if (!message.guild) return;
      
          if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.join();
          } else {
            message.reply('You need to join a voice channel first!');
          }
    }