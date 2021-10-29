const backup = require("discord-backup");
const Discord = require("discord.js");
//backup.setStorageFolder("../../backups/");
const mongoose = require("mongoose");
const schema = require('../../models/settings');

module.exports = {
    name: "createbackup",
    category: "backup",
    description: "Creates backup of the server and helps you get your server settings saved",
    run: async (client, message, args) => {
//-----------
const oldval = { guildID: message.guild.id}
      schema.find(oldval, function(err, data1){
        const prefix = data1.shift().prefix;
if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ content: 'You need administrator permission' })

    backup.create(message.guild).then((backupData) => {

        return message.channel.send({ content: 'Backup created! Here is your ID: `'+backupData.id+'`! Use `'+prefix+'loadbackup '+backupData.id+'` to load the backup on another server!' });

    }).catch(() => {

        return message.channel.send({ content: ':x: An error occurred, please check if the bot is administrator!'});

    });
      })
    }};