const Discord = require("discord.js");
module.exports = {
    name: "invite",
    category: "utility",
    description: "Invite the bot",
    run: async (client, message, args) => {
//----------------------------------------------------------------------------------------
  const embed = new Discord.MessageEmbed() 
        .setColor(`fff`) 
        .setFooter(`Kurama`)
        .setTitle(`Invite Me`)
        .setDescription('https://discord.com/oauth2/authorize?client_id=741349593127845989&scope=bot&response_type=code&redirect_uri=https%3A%2F%2Fkurama.beastcodz.ml%2Fcallback')
   message.channel.send({ embeds: [embed] });
}
};