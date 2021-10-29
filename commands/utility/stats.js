const Discord = require("discord.js");
const moment = require('moment');
const { stripIndent } = require('common-tags');
let colors = '#fff'

module.exports = {
    name: "stats",
    category: "utility",
    description: "Bot Stats",
    run: async (client, message, args) => {
//----------------------------------------------------------------------------------------
		const d = moment.duration(message.client.uptime);
    const days = (d.days() == 0) ? `` : `${d.days()} days, `;
    const hours = (d.hours() == 0) ? `` : `${d.hours()} hours, `;
    const minutes = (d.minutes() == 0) ? `` : `${d.minutes()} minutes, `;
    const seconds = (d.seconds() == 1) ? `${d.seconds()} seconds` : `${d.seconds()} seconds`;
    const clientStats = stripIndent`
      Servers   :: ${message.client.guilds.cache.size}
      Users     :: ${message.client.users.cache.size}
      Channels  :: ${message.client.channels.cache.size}
      WS Ping   :: ${Math.round(message.client.ws.ping)}ms
      Uptime    :: ${days}${hours}${minutes}${seconds}`;
    const embed = new Discord.MessageEmbed()
.setTitle("Kurama")
.setURL("https://kurama.beastcodz.ml")
.setAuthor(client.user.username, client.user.avatarURL())
.setColor(`${colors}`)
/*.addFields(
		//{ name: '**❯ Name:** ', value: client.user.username },
		{ name: '**❯ Developer:** ', value: '<:dev:890525076242444368> BeastCodZ#2617' },
		{ name: '**❯ Website:** ', value: 'https://kurama.beastcodz.ml/'},
		{ name: '**❯ Language:**', value: 'NodeJS'},
    { name: '\u200B', value: '\u200B' },
  )*/
//      .addField('Statistics', `\`\`\`asciidoc\n${clientStats}\`\`\``)
    .addField('Statistics', `\`\`\`asciidoc\n${clientStats}\`\`\``)
    
.setFooter("Kurama")
.setThumbnail("https://cdn.discordapp.com/attachments/719435289478692875/891366303783346186/unknown.png")
.setTimestamp()
message.channel.send({ embeds: [embed] });
	}
}