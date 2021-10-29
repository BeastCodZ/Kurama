const { QueryType } = require('discord-player');
module.exports = {
  name: "playb",
  category: "music",
  description: "plays music",
  run: async (client, message, args, player) => {
        const res = await player.search('https://www.youtube.com/playlist?list=PLl_7Tun1IeuCzsidFnhotYQE2ApxCDOyH', {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return message.channel.send(`No results found ${message.author}... try again ? ❌`);

        const queue = await player.createQueue(message.guild, {
            metadata: message.channel
        });

        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch {
            await player.deleteQueue(message.guild.id);
            return message.channel.send(`I can't join the voice channel ${message.author}... try again ? ❌`);
        }

        await message.channel.send(`Loading your ${res.playlist ? 'playlist' : 'track'}... 🎧`);

        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.playing) await queue.play();
    },
};