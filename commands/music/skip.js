module.exports = {
  name: "skip",
  category: "music",
  description: "skip song",
  run: async (client, message, args, player) => {
    let queue = player.getQueue(message.guild.id);
    let track = queue.nowPlaying()
        if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel !`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`You are not in the same voice channel !`);

        if (!queue) return message.channel.send(`No music currently playing !`);
        const success = queue.skip();

        return message.channel.send(`Current music ${track.title} skipped ✅`)
    },
};