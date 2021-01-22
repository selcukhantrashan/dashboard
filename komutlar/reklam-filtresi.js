const db = require('quick.db')
const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
  if (!args[0]) return message.channel.sendEmbed(new Discord.RichEmbed().setDescription(`<:CARRno:524246262191751168> Lütfen **aç** veya **kapat** Yazmalısın! Örnek: ${ayarlar.prefix}küfür-filtresi aç`).setColor("RED"));
  if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('`SUNUCUYU_YÖNET` Yetkisine Sahip Olmalısın!')
  
  if (args[0] == 'aç') {
    db.set(`reklam_${message.guild.id}`, 'acik').then(i => {
     return message.channel.sendEmbed(new Discord.RichEmbed().setDescription('<:CARRyes:524245926358024193> Reklam Engel Başarıyla Açıldı! `Üyeleri Yasakla` Yetkisine Sahip Olanların Reklamı Engellenmicektir.').setColor("RANDOM"));
    })
  }
  if (args[0] == 'kapat') {
    db.set(`reklam_${message.guild.id}`, 'kapali').then(i => {
     return message.channel.sendEmbed(new Discord.RichEmbed().setDescription('<:CARRyes:524245926358024193> Reklam Filtresi Başarıyla Kapatıldı.').setColor("RANDOM"));
    })
  }

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['reklamengel'],
  kategori: "ayarlar",
  permLevel: 0
};

exports.help = {
  name: 'reklam-filtresi',
  description: 'Reklam Engelleme Sistemini Açar/Kapatır.',
  usage: 'reklam-filtresi <aç/kapat>'
};