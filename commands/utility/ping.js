const Discord = require("discord.js");

module.exports = {
    name: "ping",
    category: "utility",
    description: "Check the connection",
    run: async (client, message, args) => {
//----------------------------------------------------------------------------------------
    const roundtripMessage = await message.channel.send({ content: "Pong!" });
    return roundtripMessage.edit(
      `*${roundtripMessage.createdTimestamp - message.createdTimestamp}ms*`,
    )
}};