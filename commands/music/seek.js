const ms = require('ms');
module.exports = {
  name: "seek",
  category: "music",
  description: "seek your music to your desire",
  run: async (client, message, args, player) => {
    const queue = player.getQueue(message.guild.id);
        
        if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);
        if (!args[0]) return message.channel.send(`Till what time do you wanna seek to`);
        const timeToMS = ms(args.join(' '));

        if (timeToMS >= queue.current.durationMS) return message.channel.send(`The indicated time is higher than the total time of the current song ${message.author}... try again ? ❌\n*Try for example a valid time like **5s, 10s, 20 seconds, 1m**...*`);

        await queue.seek(timeToMS);

        message.channel.send(`Time set on the current song **${ms(timeToMS, { long: true })}** ✅`);
    },
};