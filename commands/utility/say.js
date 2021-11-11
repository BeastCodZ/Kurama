const Discord = require("discord.js");
module.exports = {
    name: "say",
    category: "utility",
    description: "Invite the bot",
    run: async (client, message, args) => {
//----------------------------------------------------------------------------------------
   message.channel.send(args.slice(0).join(" "));
}
};