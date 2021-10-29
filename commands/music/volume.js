module.exports = {
  name: "volume",
  category: "music",
  description: "change volume of the music",
  run: async (client, message, args, player) => {
    let maxVol = "100"
    let queue = player.getQueue(message.guild.id);
    let track = queue.nowPlaying()
        if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel !`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`You are not in the same voice channel !`);

        if (!queue) return message.channel.send(`No music currently playing !`);
        const vol = parseInt(args[0]);
        if (!vol) return message.channel.send(`The current volume is ${queue.volume} 🔊\n*To change the volume enter a valid number between **1** and **${maxVol}**.*`);

        if (queue.volume === vol) return message.channel.send(`The volume you want to change is already the current one ${message.author}... try again ? ❌`);

        if (vol < 0 || vol > maxVol) return message.channel.send(`The specified number is not valid. Enter a number between **1** and **${maxVol}** ${message.author}... try again ? ❌`);

        const success = queue.setVolume(vol);

        return message.channel.send(`The volume has been modified to **${vol}**/**${maxVol}**% 🔊`);
    },
};