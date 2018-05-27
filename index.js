const Discord = require('discord.js');
const bot = new Discord.Client();

var prefix = ("/")

bot.on('ready', function() {
    bot.user.setGame("Développement en cours...");
    console.log("Connectç");
});

bot.login("NDUwMzU0ODI0NDg4Mjg4MjU2.DeyBJQ.wA6CMz-SZgZOSOmZGNJBxV_2_Uo");


bot.on('message', message => {
    if (message.content === prefix + "help") {
        message.channel.sendMessage("Liste des commandes: \n -/help");
    }
    
   if (message.content === "Salut") {
       message.reply("Bien le bonjour. :smirk:");
       console.log("Commande Salut");
   } 
}); 
