const Guild = require('../models/guild.js');
const guild = require('../models/guild.js');

module.exports = async(client, message) => {
    if (message.content === "@emitter") {
        let emitterType = `guildMemberAdd`
        client.emit(emitterType, message.member)
        return message.channel.send(`Emitted ${emitterType}`)
    }

    Guild.findById(message.guild.id, async function(err, res) {
        if (err) return message.channel.send(`It seems an error was recieved, this has been reported to our dev team.`)
        if (res === undefined) {
            try {
                Guild.create({
                    _id: message.guild.id,
                    prefix: client.config.prefix,
                    welcomeChannel: null,
                    welcomeMssg: null,
                    leaveChannel: null,
                    leaveMessage: null
                })
            } catch (err) {
                client.logger.log(`Failed to save guild to the database [${err}]`)
            }
        }

        var prefix = client.config.prefix;
        if (res == null) prefix = client.config.prefix
        if (res.prefix === null) prefix = client.config.prefix
        prefix = res.prefix

        const atHelp = new RegExp(`^<@!?${client.user.id}>( |)$`)
        if (message.content.match(atHelp)) {
            await message.delete()
            return message.channel.send(`Your server's prefix is: **${prefix}**`)
        }

        if (message.author.bot) return;
        if (!message.guild) return;
        if (!message.content.startsWith(prefix)) return;

        if (!message.member) message.member = await message.guild.fetchMember(message);

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();

        if (cmd.length === 0) return;

        let command = client.commands.get(cmd);
        if (!command) command = client.commands.get(client.aliases.get(cmd));

        if (command)
            command.run(client, message, args);
    })



};