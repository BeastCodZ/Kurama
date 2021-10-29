
const ownerid = ["516140725185019905"];

const { Permissions, MessageEmbed } = require('discord.js');

module.exports = {
    name: "nuke",
    category: "moderation",
    description: "delete the whole channel and make a similar one",
    run: async (client, message, args) => {    
  const embed = new MessageEmbed()
        .setColor("#33FFF4")
        .setDescription(`**${message.member.displayName}** nuked this channel.`)
        .setImage("https://cdn.discordapp.com/attachments/869445310781472788/881089708086657034/boom.gif")
        .setFooter(message.guild.name, message.guild.iconURL())
        .setTimestamp()
        if (!message.member.permissions.has("MANAGE_CHANNELS")){
          return message.channel.send({ content: 'You need Manage channels permission' })
        }
        if (!message.guild.me.permissions.has("MANAGE_CHANNELS")) {
            return message.channel.send({ content: 'I dont have manage channel permission' })
        }

        message.channel.send('**nuking...**')
        
        await message.channel.clone().then

        ((ch) =>{ch.setParent(message.channel.parent.id);

        ch.setPosition(message.channel.position);

        message.channel.delete().then

        (ch.send({ content: 'Nuked Successfully' }))
 
    });
}}