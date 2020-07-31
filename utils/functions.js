const mongoose = require('mongoose');
const { Guild } = require('../models');
const ytdl = require('ytdl-core');
const { MessageEmbed } = require(`discord.js`);

module.exports = client => {

    client.getGuild = async(guild) => {
        let data = await Guild.findOne({ guildID: guild.id });
        if (data) return data;
        else return client.config.defaultSettings;
    };

    client.updateGuild = async(guild, settings) => {
        let data = await client.getGuild(guild);

        if (typeof data !== 'object') data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] = settings[key];
            else return;
        }

        console.log(`Guild "${data.guildName}" updated settings: ${Object.keys(settings)}`);
        return await data.updateOne(settings);
    };
    const clean = text => {
        if (typeof(text) === "string")
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
    }

    async function playQuizSongDuce(queue, message) {
        queue[0].voiceChannel.join().then(con => {
            const dispatcher = connection.play(ytdl(queue[0].url), {
                quality: 'highestaudio',
                highWaterMark: 1024 * 1024 * 1024
            }).on('start', () => {
                dispatcher.setVolume(0.5);
                let songNameFound = false;
                let songArtistFound = false;

                const filter = m =>
                    message.guild.triviaData.triviaScore.has(m.author.username);
                const collector = message.channel.createMessageCollector(filter, { time: 30000 })
            })

            collector.on('collect', m => {
                if (!message.guild.triviaData.triviaScore.has(m.author.username)) return;
                if (m.content.startsWith(client.config.prefix)) return;
                if (m.content.toLowerCase() === queue[0].title.toLowerCase()) {
                    if (songNameFound) return;
                    songNameFound = true;

                    if (songNameFound && songArtistFound) {
                        message.guild.triviaData.triviaScore.set(m.author.username, message.guild.triviaData.triviaScore.get(m.author.username) + 1);
                        m.react(`☑`)
                        return collector.stop();
                    }
                    message.guild.triviaData.triviaScore.set(m.author.username, message.guild.triviaData.triviaScore.get(m.author.username) + 1);
                    m.react(`☑`)
                } else if (m.content.toLowerCase() === queue[0].artist.toLowerCase()) {
                    if (songArtistFound) return;
                    songArtistFound = true;
                    if (songNameFound && songArtistFound) {
                        message.guild.triviaData.triviaScore.set(m.author.username, message.guild.triviaData.triviaScore.get(m.author.username) + 1);
                        m.react(`☑`);
                        return collector.stop();
                    }
                    message.guild.triviaData.triviaScore.set(m.author.username, message.guild.triviaData.triviaScore.get(m.author.username) + 1);
                    m.react(`☑`);

                } else if (m.content.toLowerCase() === queue[0].artist.toLowerCase() + ' ' + queue[0].title.toLowerCase() + ' ' || m.content.toLowerCase() === queue[0].title.toLowerCase() + ' ' + queue[0].artist.toLowerCase() + ' ') {
                    message.guild.triviaData.triviaScore.set(m.author.username, message.guild.triviaData.triviaScore.get(m.author.username) + 1);
                    m.react(`☑`);
                    return collector.stop()
                } else {
                    if (message.guild.triviaData.wasTriviaEndCalled) {
                        message.guild.triviaData.wasTriviaEndCalled = false;
                        return;
                    }
                }

                const sortedMap = new Map([...message.guild.triviaData.triviaScore.entries()].sort((a, b) => b[1] - a[1]));

                const song = `${capitalize_Words(queue[0].artist)}: ${capitalize_Words(queue[0].title)}`;

                const embed = new MessageEmbed()
                    .setColor("GREEN")
                    .setAuthor(`The song was ${song}`)
                    .setDescription(getLeaderBoard(Array.from(sortedMap.entries())));
                message.channel.send(embed)
                queue.shift();
                dispatcher.end();
                return;
            }).on('finish', () => {
                if (queue.length >= 1) {
                    return playQuizSongDuce(queue, message);
                } else {
                    if (message.guild.triviaData.wasTriviaEndCalled) {
                        message.guild.triviaData.isRunning = false;
                        message.guild.me.voice.channel.leave()
                        return;
                    }
                }

                const sortedMap = new Map([...message.guild.triviaData.triviaScore.entries()].sort((a, b) => b[1] - a[1]));

                const embed = new MessageEmbed()
                    .setColor("GREEN")
                    .setAuthor(`Music Quiz Results:`)
                    .setDescription(getLeaderBoard(Array.from(sortedMap.entries())));
                message.channel.send(embed);
                message.guild.triviaData.isRunning = false;
                message.guild.triviaData.triviaScore.clear();
                message.guild.me.voice.channel.leave()
                return;
            })
        })
    }
    async function playQuizSong(queue, message) {
        queue[0].voiceChannel.join().then(con => {
            const dispatcher = connection.play(ytdl(queue[0].url), {
                quality: 'highestaudio',
                highWaterMark: 1024 * 1024 * 1024
            }).on('start', () => {
                dispatcher.setVolume(0.5);
                let songNameFound = false;
                let songArtistFound = false;

                const filter = m =>
                    message.guild.triviaData.triviaScore.has(m.author.username);
                const collector = message.channel.createMessageCollector(filter, { time: 30000 })
            })

            collector.on('collect', m => {
                if (!message.guild.triviaData.triviaScore.has(m.author.username)) return;
                if (m.content.startsWith(client.config.prefix)) return;
                if (m.content.toLowerCase() === queue[0].title.toLowerCase()) {
                    if (songNameFound) return;
                    songNameFound = true;

                    if (songNameFound && songArtistFound) {
                        message.guild.triviaData.triviaScore.set(m.author.username, message.guild.triviaData.triviaScore.get(m.author.username) + 1);
                        m.react(`☑`)
                        return collector.stop();
                    }
                    message.guild.triviaData.triviaScore.set(m.author.username, message.guild.triviaData.triviaScore.get(m.author.username) + 1);
                    m.react(`☑`)
                } else if (m.content.toLowerCase() === queue[0].artist.toLowerCase()) {
                    if (songArtistFound) return;
                    songArtistFound = true;
                    if (songNameFound && songArtistFound) {
                        message.guild.triviaData.triviaScore.set(m.author.username, message.guild.triviaData.triviaScore.get(m.author.username) + 1);
                        m.react(`☑`);
                        return collector.stop();
                    }
                    message.guild.triviaData.triviaScore.set(m.author.username, message.guild.triviaData.triviaScore.get(m.author.username) + 1);
                    m.react(`☑`);

                } else if (m.content.toLowerCase() === queue[0].artist.toLowerCase() + ' ' + queue[0].title.toLowerCase() + ' ' || m.content.toLowerCase() === queue[0].title.toLowerCase() + ' ' + queue[0].artist.toLowerCase() + ' ') {
                    message.guild.triviaData.triviaScore.set(m.author.username, message.guild.triviaData.triviaScore.get(m.author.username) + 1);
                    m.react(`☑`);
                    return collector.stop()
                } else {
                    if (message.guild.triviaData.wasTriviaEndCalled) {
                        message.guild.triviaData.wasTriviaEndCalled = false;
                        return;
                    }
                }

                const sortedMap = new Map([...message.guild.triviaData.triviaScore.entries()].sort((a, b) => b[1] - a[1]));

                const song = `${capitalize_Words(queue[0].artist)}: ${capitalize_Words(queue[0].title)}`;

                const embed = new MessageEmbed()
                    .setColor("GREEN")
                    .setAuthor(`The song was ${song}`)
                    .setDescription(getLeaderBoard(Array.from(sortedMap.entries())));
                message.channel.send(embed)
                queue.shift();
                dispatcher.end();
                return;
            }).on('finish', () => {
                if (queue.length >= 1) {
                    return playQuizSong(queue, message);
                } else {
                    if (message.guild.triviaData.wasTriviaEndCalled) {
                        message.guild.triviaData.isRunning = false;
                        message.guild.me.voice.channel.leave()
                        return;
                    }
                }

                const sortedMap = new Map([...message.guild.triviaData.triviaScore.entries()].sort((a, b) => b[1] - a[1]));

                const embed = new MessageEmbed()
                    .setColor("GREEN")
                    .setAuthor(`Music Quiz Results:`)
                    .setDescription(getLeaderBoard(Array.from(sortedMap.entries())));
                message.channel.send(embed);
                message.guild.triviaData.isRunning = false;
                message.guild.triviaData.triviaScore.clear();
                message.guild.me.voice.channel.leave()
                return;
            })
        })
    };

    async function getRandomX(arr, n) {
        var result = new Array(n)
        len = arr.length;
        taken = new Array(len);
        if (n > len) throw new RangeError(`GetRandomX: More elements were taken then recieved.`)
        while (n--) {
            var x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    }

    async function getLeaderBoard(arr) {
        if (!arr) return;
        let leaderBoard = '';

        leaderBoard = `👑   **${arr[0][0]}:** ${arr[0][1]}  points`;

        if (arr.length > 1) {
            for (let i = 1; i < arr.length; i++) {
                leaderBoard = leaderBoard + `\n\n   ${i + 1}: ${arr[i][0]}: ${arr[i][1]}  points`;
            }
        }
        return leaderBoard;
    }

    async function capitalize_Words(str) {
        return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
};