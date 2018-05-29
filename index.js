const Discord = require('discord.js');
const bot = new Discord.Client();
const client = new Discord.Client();
bot.login(process.env.TOKEN);


var prefix = ("/")


bot.on('ready', function() {
    bot.user.setGame("Mizu || Serveur");
    console.log("Connect");
});


bot.on('message', message => {

    // /help

    if (message.content === prefix + "help") {
        var help_embed = new Discord.RichEmbed()
        .setColor("#40A497")
        .setTitle("Aide aux commandes.")
        .setDescription("Je suis Mizu-BOT , Voici mes commandes disponible :")
        .addField("/help", "Affiche les commandes du bot !")
        .addField("/staff", "Vous donne les informations sur la personne du staff désirée.")
        .addField("Salut", "Le bot répond !")
        .addField("/8ball [votre question]", "Répond à votre questions.")
        .addField("/xp", "En dévelopemment.")
        .addField("/site", "Vous donneras le lien du site.")
        .addField("/stats", "Le bot vous envoie des informations sur votre profil !")
        .setFooter("Menu d'aide - Mizu")
        message.channel.sendMessage(help_embed);
        console.log("Un utilisateur a effectué la commande d'aide !")      
    }

    ///statistiques
    if (!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0].toLowerCase()) {
        case "stats":

        var userCreateDate = message.author.createdAt.toString().split(" ");
        var msgauthor = message.author.id;

        var stats_embed = new Discord.RichEmbed()

        .setColor("#FCDC12")
        .setTitle(`Statistique de l'utilisateur : ${message.author.username}`)
        .addField(`ID de l'utilisateur :id:`, msgauthor, true)
        .addField("Date de création de l'utilisateur:", userCreateDate[1] + ' ' + userCreateDate[2] + ' ' + userCreateDate[3])
        .setThumbnail(message.author.avatarURL)
        message.reply("Tu peux regarder tes message privés ! Tu vien de recoir tes statistiques !")
        message.author.send({embed: stats_embed});
        break;

    }

    //commande staff pseudo
    if (message.content === prefix + "wonyu"){
        var embed = new Discord.RichEmbed()
                .setTitle("Mizu")
                .addField("Qui est Wonyu ?", "Fondateur et Chef Développeur du serveur", true)
                .setColor("#0174DF")
                .setFooter("Bon moment parmis nous jeune Mizien ! :)")
         message.channel.sendEmbed(embed);  
    }
 
    if (message.content === prefix + "zelgot") {
        var embed = new Discord.RichEmbed()
                .setTitle("Mizu")
                .addField("Qui est zelgot ?", "Fondateur et Chef Buildeur du serveur", true)
                .setColor("#0174DF")
                .setFooter("Bon moment parmis nous jeune Mizien ! :)")
        message.channel.sendEmbed(embed);  
     console.log("Commande Salut");
    }
    
    if (message.content === prefix + "ellyana") {
     message.reply("zelgot est personne :open_mouth:");
     console.log("Commande Salut");
    }

    //commande perso 
    if (message.content === prefix + "site"){
        var embed = new Discord.RichEmbed()
                .setTitle("Mizu")
                .addField("Voici le lien du site :", "(https://www.mizu-mmorpg.fr/)", true)
                .setColor("#0174DF")
                .setFooter("Bon moment parmis nous jeune Mizien ! :)")
         message.channel.sendEmbed(embed);  
    }

})

//infodiscord
bot.on('message', message => {

    if(message.content === prefix + "infodiscord") {
        var embed = new Discord.RichEmbed()
        .setDescription("Infomartion du Discord")
        .addField("Nom du discord", message.guild.name)
        .addField("Crée le", message.guild.createdAt)
        .addField("Tu as rejoint le", message.member.joinedAt)
        .addField("Utilisateurs sur le discord", message.guild.memberCount)
        .setColor("0x0000FF")
    message.channel.sendEmbed(embed)
}})

//message de bienvenue et au revoir
bot.on("guildMemberAdd", member => {
    member.guild.channels.find("name", "bienvenue").send(`Bienvenue ${member} sur le Serveur Mizu \n Si tu à des questions fait /help`)
})

bot.on('guildMemberRemove', member => {
    member.guild.channels.find("name", "bienvenue").send(`Au revoir ${member} :'(`)
})

//8ball(jeux) et ping
bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split(" ");


    switch (args[0].toLowerCase()) { 
        case "8ball": 
        let args = message.content.split(" ").slice(1);
        let tte = args.join(" ")
        if (!tte){
            return message.reply("Merci de poser une question :8ball:")};
            
            var replys = [
                "Oui",
                "Non",
                "Je sais pas",
                "Peut être",
                "Je ne peux pas te répondre."
            ];
            
            let reponse = (replys[Math.floor(Math.random() * replys.length)])
            var bembed = new Discord.RichEmbed()
            .setDescription(":8ball: 8ball")
            .addField("Question :", tte)
            .addField("Réponse :", reponse)
        message.channel.sendEmbed(bembed)
        break;
        case "ping":
        message.channel.sendMessage('Temp de latence avec le serveur:`' + `${message.createdTimestamp - Date.now()}` + ' ms `');
        break;          
}})



//ban et kick
bot.on('message', message => {
    let commande = message.content.split(" ")[0];
    const args = message.content.slice(prefix.length).split(/ +/);
    commande = args.shift().toLowerCase();

    if (commande === "kick") {
        let modRole = message.guild.roles.find("name", "Admins");
        if(!message.member.roles.has(modRole.id)) {
            return message.reply("Tu n'as pas la permission de faire cette commande.").catch(console.error);
        }
        if(message.mentions.users.size === 0) {
            return message.reply("Merci de mentionner l'utilisateur à expluser").catch(console.error);
        }
        let kickMember = message.guild.member(message.mentions.users.first());
        if(!kickMember) {
            return message.reply("Cet utilisateur est introuvable ou impossible à expluser.")
        }
        if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) {
            return message.reply("Je n'ai pas la permissions KICK_MEMBERS pour faire ceci").catch(console.error);
        }
        kickMember.kick().then(member => {
            message.reply(`${member.user.username} a été explusé avec succès.`).catch(console.error);
            message.guild.channels.find("name", "test-mizu-bot").send(`**${member.user.username}** a été expulsé du discord par **${message.author.username}**`)
        }).catch(console.error)    
        
    }

    if (commande === "ban") {
        let modRole = message.guild.roles.find("name", "Admins");
        if(!message.member.roles.has(modRole.id)) {
            return message.reply("Tu n'as pas la permissions de faire cette commande.").catch(console.error);
        }
        const member = message.mentions.members.first();
        if (!member) return message.reply("Merci de mentionner l'utilisateur à bannir.");
        member.ban().then(member => {
            message.reply(`${member.user.username} a été banni avec succès.`).catch(console.error);
            message.guild.channels.find("name", "test-mizu-bot").send(`**${member.user.username}** a été banni du discord par **${message.author.username}**`)
        }).catch(console.error)                            
}})
