const Discord = require("discord.js");

module.exports = {
    name: "roles",
    category: "utility",
    description: "Server roles",
    run: async (client, message, args) => {
//----------------------------------------------------------------------------------------
   let roleCount = message.guild.roles.cache.map(x => "<@&" + x.id + ">").join(" \n")
   const embed = new Discord.MessageEmbed() 
        .setColor(`fff`) 
        .setFooter(`Kurama`)
        .setTitle(`${message.guild.name} roles`)
        .setDescription(roleCount)
   message.channel.send({ embeds: [embed] });
}};