const Discord = require("discord.js");
const mongoose = require("mongoose");
const schema = require('../../models/settings');

module.exports = {
    name: "autorole",
    category: "config",
    description: "Config which role you wanna give to people who join the server",
    run: async (client, message, args) => {
//----------------------------------------------------------------------------------------
      if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ content: 'You need administrator permission' })
      const autorole = await message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
      const oldval = { guildID: message.guild.id}
      schema.find(oldval, { role:1, _id:0 }, function(err, data1){        
        const newval = { $set: {guildID: message.guild.id, role: autorole} }
        const roleId = data1.shift().role;
        if(!autorole) {        
          message.channel.send(`The current autorole is selected to <@&${roleId}>`);
        }
      else{
        schema.updateOne(oldval, newval, function(err, data){
      if (err) throw err;
                message.channel.send(`Autorole has been set to Role Name: ${autorole}\nFrom Role Name: <@&${roleId}>`)
            }
        )
    }})}}