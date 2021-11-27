const backup = require("discord-backup");
const Discord = require("discord.js");
//backup.setStorageFolder("../../backups/");
const mongoose = require("mongoose");
const schema = require('../../models/settings');

module.exports = {
    name: "infobackup",
    category: "backup",
    description: "Get info about the backup id",
    run: async (client, message, args) => {
//-----------
const oldval = { guildID: message.guild.id}
      schema.find(oldval, function(err, data1){
        const prefix = data1.shift().prefix;
if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ content: 'You need administrator permission' })
           const backupID = args.join(' ');

    if (!backupID)
        return message.channel.send({ content: ':x: Please specify a valid backup ID!'});

    backup.fetch(backupID).then((backup) => {

        const date = new Date(backup.data.createdTimestamp);
        const yyyy = date.getFullYear().toString(), mm = (date.getMonth()+1).toString(), dd = date.getDate().toString();
        const formattedDate = `${yyyy}/${(mm[1]?mm:"0"+mm[0])}/${(dd[1]?dd:"0"+dd[0])}`;

        const embed = new Discord.MessageEmbed()
            .setAuthor('ℹ️ Backup', backup.data.iconURL)
            .addField('Server name', backup.data.name)
            .addField('Size', backup.size + ' kb')
            .addField('Created at', formattedDate)
            .setFooter('Backup ID: '+backup.id);

        return message.channel.send({ embed: embed });

    }).catch((err) => {

        if (err === 'No backup found')
            return message.channel.send({ content: ':x: No backup found for ID '+backupID+'!'});
        else
            return message.channel.send({ content: ':x: An error occurred'});
      console.log(err)

    });
      })}};