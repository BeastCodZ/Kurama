const { QueryType } = require('discord-player');
const { MessageEmbed } = require('discord.js');
module.exports = {
  name: "play",
  category: "music",
  description: "Search for a song and play it",
  run: async (client, message, args, player) => {
if (!args.slice(0).join(" ")) return message.channel.send(`Please enter a valid search ${message.author}... try again ? ❌`);

        const res = await player.search(args.join(' '), {
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
        const embed = new MessageEmbed()
.setTitle(`${res.playlist ? 'Playlist' : `Track`} has been added to queue`)
.setAuthor(client.user.username, client.user.avatarURL())
.setColor("RANDOM")
.addField("Title:",`${res.tracks[0].title}`)
.addField("Author:",`${res.tracks[0].author}`)
.setURL(res.tracks[0].url)
.setFooter(`📈: ${res.tracks[0].views} || ⏱️: ${res.tracks[0].duration} `)
.setThumbnail(`${res.tracks[0].thumbnail}`)
.setImage("https://cdn.glitch.me/89e8dcbe-769a-469d-9d90-204240ad88bf%2FEVP1.gif?v=1635447896981")
.setTimestamp()
        await message.channel.send({ embeds: [embed] });

        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.playing) await queue.play();
    },
};