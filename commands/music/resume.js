module.exports = {
  name: "resume",
  category: "music",
  description: "resumes music",
  run: async (client, message, args, player) => {
    let queue = player.getQueue(message.guild.id);
    let track = queue.nowPlaying()
        if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel !`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`You are not in the same voice channel !`);

        if (!queue) return message.channel.send(`No music currently playing !`);

        if (!queue.playing) return message.channel.send(`The music is already playing !`);

        queue.setPaused(false)
        return message.channel.send(`Song ${track.title} resumed !`);
    },
};