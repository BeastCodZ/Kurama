const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  name: "np",
  category: "music",
  description: "Tells you about what am i playing",
  run: async (client, message, args, player) => {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

        const track = queue.current;

        const embed = new MessageEmbed();

        embed.setColor('RED');
        embed.setThumbnail(track.thumbnail);
        embed.setAuthor(track.title, client.user.displayAvatarURL({ size: 1024, dynamic: true }));

        const methods = ['disabled', 'track', 'queue'];
        const progress = queue.createProgressBar();
        const timestamp = queue.getPlayerTimestamp();
        const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;

        embed.setDescription(`Volume **${queue.volume}**%\nDuration **${trackDuration}**\nLoop mode **${methods[queue.repeatMode]}**\nRequested by ${track.requestedBy}\n**${progress}**`);

        embed.setTimestamp();
        embed.setFooter('Kurama', message.author.avatarURL({ dynamic: true }));

        message.channel.send({ embeds: [embed] });
  }
}