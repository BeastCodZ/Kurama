const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const fs = require("fs");
const schema = require('../../models/settings');

module.exports = {
    name: "help",
    category: "utility",
    description: "Sends you the help menu",
    run: async (client, message, args) => {
//----------------------------------------------------------------------------------------	
      const helpCommands = [...new Set(client.helpCommands.map((cmd => cmd.name)))];
       const oldval = { guildID: message.guild.id}
      schema.find(oldval, function(err, data1){
        const prefix = data1.shift().prefix;
        const roleColor =
      message.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;

    if (!args[0]) {
      let categories = [];
    const loadDir = (dirs) => {
    const helperFiles = fs.readdirSync(`./commands/${dirs}`).filter(file => file.endsWith('.js'));
    for (const file of helperFiles) {
      const helpCommand = require(`../../commands/${dirs}/${file}`);
      // Message Commands
      if (helpCommand.name) {
        client.helpCommands.set(helpCommand.name, helpCommand);
        const embed = new MessageEmbed()
        .setTitle("📬 Need help? Here are all of my commands:")
        .addFields(categories)
        .setDescription(
          `Use \`${prefix}help\` followed by a command name to get more additional information on a command. For example: \`${prefix}help ban\`.`
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send({ embeds: [embed] });
    } else {
      const command =
        helpCommands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );
      const embed = new MessageEmbed()
        .setTitle("Command Details:")
        .addField("PREFIX:", `\`${prefix}\``)
        .addField(
          "COMMAND:",
          command.name ? `\`${command.name}\`` : "No name for this command."
        )
        .addField(
          "ALIASES:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "No aliases for this command."
        )
        .addField(
          "USAGE:",
          command.usage
            ? `\`${prefix}${command.name} ${command.usage}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          "DESCRIPTION:",
          command.description
            ? command.description
            : "No description for this command."
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send({ embeds: [embed] });

      }
    }
  };
  ['config', 'backup', 'music', 'moderation', 'utility'].forEach(e => loadDir(e));
          }
      })}}