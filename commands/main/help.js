const { MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs');
const path = require('path')
const { devs } = require('../../config.js')

module.exports = {
    name: "help",
    category: 'main',
    description: 'Gives Information on the bot',
    usage: `[p]help`
}

module.exports.run = async(client, message, args) => {
    const mainEmbed = new MessageEmbed()
    mainEmbed.setAuthor(`Undefined The Discord Bot`)
    mainEmbed.setColor("BLUE")
    var admin = `__**Admin Commands**__\n\n`;
    var fun = `__**Fun Commands**__\n\n`;
    var util = `__**Utility Commands**__\n\n`;
    var music = `__**Music Commands**__\n\n`;
    var dev = `__**Developer Commands**__\n\n`;
    let page = 1;
    const adM = await readdirSync(path.join(__dirname, `../`, `admin`));
    adM.forEach(f => {
        let prop = require(`../admin/${f}`)
        admin += `__**${prop.name}**__ - **${prop.description}**\n`
    })
    const F_un = await readdirSync(path.join(__dirname, `../`, `fun`));
    F_un.forEach(f => {
        let prop = require(`../fun/${f}`)
        fun += `__**${prop.name}**__ - **${prop.description}**\n`
    })
    const Util = await readdirSync(path.join(__dirname, `../`, `main`));
    Util.forEach(f => {
        let prop = require(`../main/${f}`)
        util += `__**${prop.name}**__ - **${prop.description}**\n`
    })
    const Mus_ic = await readdirSync(path.join(__dirname, `../`, `music`));
    Mus_ic.forEach(f => {
        let prop = require(`../music/${f}`)
        music += `__**${prop.name}**__ - **${prop.description}**\n`
    })
    const D_ev = await readdirSync(path.join(__dirname, `../`, `owners`));
    D_ev.forEach(f => {
        let prop = require(`../owners/${f}`)
        dev += `__**${prop.name}**__ - **${prop.description}**\n`
    })

    if (devs.includes(message.author.id)) pages = [`Hello my name is **Undefined**, I am an all in one mutli-purpose bot\nI was created by **Allison#5700, Clean1ng#2032, BongLongCS#3155**\nThanks for using me!\n\nYou can join my support server here: https://discord.gg/r5BaXkx`, `${admin}`, `${fun}`, `${util}`, `${music}`, `${dev}`]

    pageTitle = [`Undefined the Discord Bot`, `Admin Commands`, `Fun Commands`, `Util Commands`, `Music Commands`, `Dev Commands`]
    pages = [`Hello my name is **Undefined**, I am an all in one mutli-purpose bot\nI was created by **Allison#5700, Clean1ng#2032, BongLongCS#3155**\nThanks for using me!\n\nYou can join my support server here: https://discord.gg/r5BaXkx`, `${admin}`, `${fun}`, `${util}`, `${music}`]



    mainEmbed.setDescription(pages[0])
    mainEmbed.setFooter(`Currently on page ${page} of ${pages.length}`)

    message.channel.send(mainEmbed).then(async(m) => {
        m.react(`⬅️`).then(async(r) => {
            await m.react(`❌`)
            await m.react(`➡️`)
            const removeReaction = async(m, msg, emoji) => { try { m.reactions.cache.find(r => r.emoji.name === emoji).users.remove(message.author.id); } catch (err) {} }
            const back = (reaction, user) => reaction.emoji.name === '⬅️' && user.id === message.author.id;
            const forward = (reaction, user) => reaction.emoji.name === "➡️" && user.id === message.author.id;
            const close = (reaction, user) => reaction.emoji.name === "❌" && user.id === message.author.id;
            const backwards = m.createReactionCollector(back, { time: 60000 });
            const forwards = m.createReactionCollector(forward, { time: 60000 });
            const closer = m.createReactionCollector(close, { time: 60000 });

            backwards.on('collect', async(r) => {
                await removeReaction(m, message, '⬅️')
                if (page === 1) return;
                page--;
                mainEmbed.setDescription(pages[page - 1])
                mainEmbed.setFooter(`Currently on page ${page} of ${pages.length}`)
                m.edit(mainEmbed)
            });

            forwards.on(`collect`, async(r) => {
                await removeReaction(m, message, `➡️`)
                if (page == pages.length) return;
                page++;
                mainEmbed.setDescription(pages[page - 1])
                mainEmbed.setFooter(`Currently on page ${page} of ${pages.length}`)
                m.edit(mainEmbed)
            })

            closer.on(`collect`, async(r) => {
                await m.delete()
            })
        })
    })
}