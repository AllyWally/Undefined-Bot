const { Client, Collection } = require('discord.js')
const { promisify } = require('util');
const { readdirSync } = require('fs');
const mongoose = require('mongoose');
const { config } = require('dotenv');
const nodemon = require('nodemon');
const path = require('path')

class Bot extends Client {
    constructor(options) {
        super(options);
        this.Developing = false;
        this.config = require('../config.js');
        this.commands = new Collection();
        this.aliases = new Collection();
        this.logger = require('./Logger.js');
        this.wait = require('util').promisify(setTimeout);

        this.waitReply = async(message, text, limit = 60000) => {
            const filter = m => m.author.id === message.author.id;
            await message.channel.send(text)
            try {
                const collected = await message.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] })
                return collected.first().content;
            } catch (e) {
                return false;
            }
        }
    }
}

const client = new Bot({
    fetchAllMembers: true
})

const init = async() => {
    readdirSync(path.join(__dirname, `../`, 'commands')).forEach(dir => {
        const commands = readdirSync(path.join(__dirname, `../`, `commands/`, `${dir}`)).filter(f => f.endsWith('.js'));

        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);

            if (pull.name) {
                client.commands.set(pull.name, pull)
                console.log(`Loaded ${pull.name}`)
            } else {
                console.log(`Failed to load a command.`)
                continue;
            }

            if (pull.aliases && Array.isArray(pull))
                pull.aliases.forEach(alias => {
                    return client.aliases.set(alias, pull.name)
                });
        }

    })


    const events = await readdirSync(path.join(__dirname, `../`, 'events'))
    console.log(`Loading ${events.length} event files.`)
    events.forEach(e => {
        const name = e.split('.')[0];
        console.log(`Loading ${name}`)
        const event = require(`../events/${e}`)
        client.on(name, event.bind(null, client));
        delete require.cache[require.resolve(`../events/${e}`)]
    })
    if (events.length === 0) console.warn(`No event files found to load.`)

    client.login(client.config.token).catch(e => console.log(`Failed to login [${e}]`))
    require('../utils/functions')(client);
    const mongoClient = require(`../utils/mongoose.js`)
    mongoClient.init()

}

exports.init = init;

client.on('disconnect', () => client.logger.warn(`Connection the Discord API lost, attempting to reconnect.`)).on('reconnecting', () => client.logger.log(`Attempting API reconnection.`))
client.on(`error`, e => client.logger.log(e)).on(`warn`, w => client.logger.warn(w))