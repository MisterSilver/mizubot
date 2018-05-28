const Discord = require('discord.js');
const bot = new Discord.Client();
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const client = new Discord.Client();
bot.login(process.env.TOKEN);

const adapter = new FileSync('database.json');
const db = low(adapter);

db.defaults({ histoires: [], xp: []}).write()

var prefix = ("/")


bot.on('ready', function() {
    bot.user.setGame("Développement en cours...");
    console.log("Connectç");
});


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
            message.guild.channels.find("name", "logs-bot").send(`**${member.user.username} a été expulsé du discord par **${message.author.username}**`)
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
            message.guild.channels.find("name", "logs-bot").send(`**${member.user.username}** a été banni du discord par **${message.author.username}**`)
        }).catch(console.error) 

}})

bot.on('message', message => {

    // /help

    if (message.content === prefix + "help") {
        message.channel.sendMessage("Liste des commandes: \n -/help");
    }

    //xp
    var msgauthor = message.author.id;

    if(message.author.bot)return;

    if(!db.get("xp").find({user: msgauthor}).value()){
        db.get("xp").push({user: msgauthor, xp: 1}).write();
    }else{
        var userxpdb = db.get("xp").filter({user: msgauthor}).find('xp').value();
        console.log(userxpdb);
        var userxp = Object.values(userxpdb)
        console.log(userxp)
        console.log(`Nombre d'xp: ${userxp[1]}`)
        
        db.get("xp").findKey({user: msgauthor}).assign({user: msgauthor, xp: userxp[1] += 1}).write();

    if (message.content === prefix + "xp"){
        var xp = db.get("xp").filter({user: msgauthor}).find('xp').value()
        var xpfinal = Object.values(xp);
        var xp_embed = new Discord.RichEmbed()
            .setTitle(`Stat des XP de ${message.author.username}`)
            .setColor('#F4D03F')
            .setDescription("Affichage des XP")
            .addField("XP:", `${xpfinal[1]} xp`)
            .setFooter("Mizu")
        message.channel.send({embed: xp_embed});
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
     message.reply("zelgot est personne :open_mouth:");
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

}})


bot.on('message', message => {

    //sondage
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


bot.on("guildMemberAdd", member => {
    member.guild.channels.find("name", "bienvenue").send(`Bienvenue ${member} sur le Serveur Mizu \n Si tu à des questions fait /help`)
})

bot.on('guildMemberRemove', member => {
    member.guild.channels.find("name", "bienvenue").send(`Au revoir ${member} :'(`)
})


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
                "Peut être"
            ];
            
            let reponse = (replys[Math.floor(Math.random() * replys.length)])
            var bembed = new Discord.RichEmbed()
            .setDescription(":8ball: 8ball")
            .addField("Question", tte)
            .addField("Réponse", reponse)
        message.channel.sendEmbed(bembed)
}})        
