const { Structures } = require('discord.js');

Structures.extend('Guild', Guild => {
    class MusicGuild extends Guild {
        constructor(client, data) {
            super(client, data);

            this.triviaData = {
                isTriviaOn: false,
                wasTriviaEndCalled: false,
                triviaQueue: [],
                triviaScores: new Map()
            }
        }
    }
    return MusicGuild;
})