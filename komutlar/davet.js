const Discord = require('discord.js');

exports.run = (client, message, args) => {
  const embed = new Discord.RichEmbed()
  
.setColor("RANDOM")
.setAuthor(client.user.username, client.user.avatarURL)
.setDescription("[Beni Sunucuna Almak İçin Tıkla](https://discordapp.com/oauth2/authorize?client_id=501676393432743936&scope=bot&permissions=2146958847) | [Destek Sunucuma Gitmek İçin Tıkla](https://discord.gg/S5xYjZk)")
.setFooter(`${message.author.username} Tarafından İstendi.`, message.author.displayAvatarURL)
  
  
  return message.channel.send(embed);
};


exports.conf = {
  enabled: true,
  aliases: ['invite'],
  kategori: "bot",
  permLevel: 0,
};    

exports.help = {
  name: "davet",
  description: "Bot Davet Linkini Gösterir",
  usage: "davet"
};