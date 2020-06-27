const { MessageEmbed } = require('discord.js');


module.exports = {
    name: "help",
    category: 'main',
    description: 'Tells you in a dm all the commands',
    usage: `${(process.env.PREFIX)}help`
}

module.exports.run = async (client, message, args) => {
    const embed = new MessageEmbed()
    embed.setTitle("All Commands for the Undefined Bot!")
    embed.setColor(process.env.COLOR)
    .setDescription(`**Commands Prefix is ${process.env.PREFIX}**\n **Ping**: Get The Bots latency and API\n **Query**: Gives you information on a user.\n **Prefix**: Tells you the prefix for the bot\n **Uptime**: Tells you how long the bot has been online!\n **FUN COMMANDS**: 8Ball Ask the 8ball the a question and it will respond with yes or no!\n **COINFLIP**: Coinflip: Coinflip and get a chance to get heads or tails?\n **ADMINS/MODERATION**\n**Mute**: Mute the user you desire make sure to add a reason!\n **Botinfo** BotInfo: Get information on the bot!\n **Clear**: Clear Messages in a certain channel 1-100\n **Ban**: Ban the user you desire make sure to add a reason ;) `)
    message.author.send(embed);
    message.delete({ timeout: 0 })
    }