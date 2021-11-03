module.exports = {
  name: "clearqueue",
  category: "music",
  description: "plays the previous music",
  run: async (client, message, args, player) => {
    let queue = player.getQueue(message.guild.id);
        if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel !`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`You are not in the same voice channel !`);

        await queue.clear();

        message.channel.send(`The queue has just been cleared 🗑️`);
    },
};