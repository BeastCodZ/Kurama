const ownerid = ["516140725185019905"];
const Discord = require("discord.js");
const canvas = require('canvas')
module.exports = {
    name: "eval",
    category: "owner",
    description: "run a command",
    run: async (client, message, args) => {    
if (ownerid.includes(message.author.id)) {
const input = args.join(' ');
    if (!input) return message.channel.send('Please provide code to eval');
    if(!input.toLowerCase().includes('token')) {

      const embed = new Discord.MessageEmbed();

      try {
        let output = eval(input);
        if (typeof output !== 'string') output = require('util').inspect(output, { depth: 0 });
        
        embed
          .addField('Input', `\`\`\`js\n${input.length > 1024 ? 'Too large to display.' : input}\`\`\``)
          .addField('Output', `\`\`\`js\n${output.length > 1024 ? 'Too large to display.' : output}\`\`\``)
          .setColor('#66FF00');

      } catch(err) {
        embed
          .addField('Input', `\`\`\`js\n${input.length > 1024 ? 'Too large to display.' : input}\`\`\``)
          .addField('Output', `\`\`\`js\n${err.length > 1024 ? 'Too large to display.' : err}\`\`\``)
          .setColor('#FF0000');
      }

      message.channel.send({embeds: [embed]});

    } else {
      message.channel.send('(╯°□°)╯︵ ┻━┻ MY token. **MINE**.');
    }
  }}}