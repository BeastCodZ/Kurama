module.exports = {
  name: "autplay",
  category: "music",
  description: "pauses the current playing music",
  run: async (client, message, args, player) => {
    let queue = player.getQueue(message.guild.id);
    let track = queue.nowPlaying()
        if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel !`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`You are not in the same voice channel !`);

        if (!queue) return message.channel.send(`Autoplay only works when there is a music playing to play something related to it`);


        //queue.setPaused(true)
        //queue.setAutoPlay(message, !queue.autoPlay);
        queue._handleAutoplay(track)
        return message.channel.send(`Autoplay on`);
    },
};