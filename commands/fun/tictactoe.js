const { tictactoe } = require('reconlx')
const Discord = require("discord.js");

module.exports = {
    name: "tictactoe",
    category: "fun",
    description: "test",
    run: async (client, message, args) => {    
const member = message.mentions.members.first() 
            if(!member)  return  message.channel.send('Please specify a member')
                new tictactoe({
            player_two: member, 
            message: message
        })
    }
}