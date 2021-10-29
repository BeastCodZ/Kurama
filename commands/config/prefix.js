const Discord = require("discord.js");
const mongoose = require("mongoose");
const schema = require('../../models/settings');

module.exports = {
    name: "prefix",
    category: "config",
    description: "Set my default prefix for the server",
    run: async (client, message, args) => {
      if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ content: 'You need administrator permission' })
      const setprefix = args[0];
      const oldval = { guildID: message.guild.id}
      schema.find(oldval, function(err, data1){
        const prefix = data1.shift().prefix;
        const newval = { $set: {guildID: message.guild.id, prefix: setprefix} }
        if(!setprefix) return message.channel.send(`The current prefix is **${prefix}**`)
        schema.updateOne(oldval, newval, function(err, data){
      if (err) throw err;
                message.channel.send(`Prefix has been set to: **${setprefix}** \nfrom: **${prefix}**`)
            }
        )
    })}}