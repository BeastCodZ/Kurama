const backup = require("discord-backup");
const Discord = require("discord.js");
//backup.setStorageFolder("../../backups/");
const mongoose = require("mongoose");
const schema = require('../../models/settings');

module.exports = {
    name: "listbackups",
    category: "backup",
    description: "Get info about the backup id",
    run: async (client, message, args) => {
//-----------
const oldval = { guildID: message.guild.id}
      schema.find(oldval, function(err, data1){
        const prefix = data1.shift().prefix;
if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ content: 'You need administrator permission' })
           const backupID = args.join(' ');
backup.list().then((backups) => {
  console.log(backups)
  const embed = new Discord.MessageEmbed()
            .setAuthor(`Backups of ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
            .setFooter('Kurama');  
})
      }
)}
}