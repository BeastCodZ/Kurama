const backup = require("discord-backup");
const Discord = require("discord.js");
//backup.setStorageFolder("../../backups/");
const mongoose = require("mongoose");
const schema = require('../../models/settings');

module.exports = {
    name: "loadbackup",
    category: "backup",
    description: "Enter the backup id and you can load your backup",
    run: async (client, message, args) => {
//-----------
const oldval = { guildID: message.guild.id}
      schema.find(oldval, function(err, data1){
        const prefix = data1.shift().prefix;
if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ content: 'You need administrator permission' })
const backupID = args.join(' ');

    backup.fetch(backupID).then(() => {

        message.channel.send({ content: ':warning: All the server channels, roles, and settings will be cleared. Do you want to continue? Send `-confirm` or `cancel`!'});
      const filter = m => m.author.id === message.author.id && [`${prefix}confirm`, `${prefix}cancel`].includes(m.content)
      const collector = message.channel.createMessageCollector({ filter, time: 30000 });
      //const collector = message.channel.createMessageCollector({(m) => m.author.id === message.author.id && ['-confirm', 'cancel'].includes(m.content), {
          //  time: 10000000,
         //   max: 1
       // }});
        collector.on('collect', (m) => {
            const confirm = m.content === '-confirm';
            collector.stop();
            if (confirm) {
                backup.load(backupID, message.guild).then(() => {

                    return message.channel.send({ content: 'Backup loaded successfully!'});
            
                }).catch((err) => {
            
                    if (err === 'No backup found')
                        return message.channel.send({ content: ':x: No backup found for ID '+backupID+'!'});
                    else
                        return message.author.send({ content: ':x: An error occurred: '+(typeof err === 'string') ? err : JSON.stringify(err)});
            
                });

            } else {
                return message.channel.send({ content: ':x: Cancelled.'});
            }
        })

        collector.on('end', (collected, reason) => {
            if (reason === 'time')
                return message.channel.send({ content: ':x: Command timed out! Please retry.'});
        })

    }).catch(() => {
        return message.channel.send({ content: ':x: No backup found for ID '+backupID+'!'});
    });
      })}};