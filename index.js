const { Player } = require('discord-player');
const autorole = require('./models/settings');
const { tictactoe } = require('reconlx')
const reconlx = require('reconlx')
const config = require("./config");
const mongoose = require("mongoose");
const GuildSettings = require("./models/settings");
const Dashboard = require("./dashboard/dashboard");
const fs = require("fs");
const Discord = require("discord.js")
const { Client, Intents, Permissions, Collection } = require("discord.js");
const { stripIndent } = require('common-tags');
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES],
});
client.config = require('./config');
const player = new Player(client, client.config.opt.discordPlayer);
mongoose.connect(config.mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.config = config;
client.commands = new Collection();
client.helpCommands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");

["command","helper"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});


client.on("ready", async () => {
  console.log("Fetching members...");
  for (const [id, guild] of client.guilds.cache) {
    await guild.members.fetch();
  }
  console.log("Fetched members.");

  console.log(
    `Bot is ready. (${client.guilds.cache.size} Guilds - ${client.channels.cache.size} Channels - ${client.users.cache.size} Users)`,
  );

    const activities_list = [
    "Kurama || Naruto Uzumaki Best Friend",
    `Kurama || Member of | ${client.guilds.cache.size} Clans`,
    `Kurama || Helping ${client.users.cache.size} users`
  ];
  setInterval(() => {
    const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities 
    client.user.setActivity(activities_list[index]); // sets bot's activities to one of the phrases in the arraylist.
  }, 3000); // Runs this every 10 seconds.
  Dashboard(client);
});

// We listen for message events.

client.on("guildMemberAdd", async (member, guild, message) => {
    autorole.findOne({
        guild: member.guild.id
    }, async (err, data) => {  
      if (data) {
            const joinrole = member.guild.roles.cache.find(role => role.id == data.role);
            if (!joinrole) {
                console.log("Invalid ID")
                return;
            }
            member.roles.add(joinrole.id)

        }
    })
})
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.channel.permissionsFor(message.guild.me).has(Permissions.FLAGS.SEND_MESSAGES)) {
    return;
  }
  let storedSettings = await GuildSettings.findOne({
    guildID: message.guild.id,
  });
  if (!storedSettings) {

    const newSettings = new GuildSettings({
      guildID: message.guild.id,
    });
    await newSettings.save().catch((e) => {
      console.log(e);
    });
    storedSettings = await GuildSettings.findOne({ guildID: message.guild.id });
  }
    const args = message.content.slice(storedSettings.prefix.length).trim().split(/ +/g);
  if (message.mentions.users.has(client.user.id) && !message.author.bot && !args.slice(1).join(" ")) {
       const clientStats = stripIndent`
      ❯ Config bot settings  :: https://kurama.beastcodz.ml/
      ❯ Current Prefix  :: ${storedSettings.prefix}`;
    const embed = new Discord.MessageEmbed() 
        .setColor(`fff`) 
        .setFooter(`Kurama`)
        .setTitle(`${message.guild.name} roles`)
        .addField('Statistics', `\`\`\`asciidoc\n${clientStats}\`\`\``)
        .setThumbnail("https://cdn.discordapp.com/attachments/719435289478692875/891366303783346186/unknown.png")
        .setTimestamp()
   message.channel.send({ embeds: [embed] });
  return
};
  if (message.content.indexOf(storedSettings.prefix) !== 0) return;
  client.config = require('./config');
  const cmd = args.shift().toLowerCase();
  const command = client.commands.get(cmd);
    if (command)
        command.run(client, message, args, player);
        console.log(`Executing ${cmd} in ${message.guild.name}`)
});
// Listening for error & warn events.
client.on("error", console.error);
client.on("warn", console.warn);
const active = new Map();
client.ops = { active }
client.helpCommands = new Collection();
// We login into the bot.
client.login(process.env.LOGIN);