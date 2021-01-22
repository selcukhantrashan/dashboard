const db = require('quick.db')
const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json');

exports.run = async (bot, message, args) => {
  if (!args[0]) return message.channel.sendEmbed(new Discord.RichEmbed().setDescription(`<:CARRno:524246262191751168> Lütfen **aç** veya **kapat** Yazmalısın! Örnek: ${ayarlar.prefix}küfür-filtresi aç`).setColor("RED"));
  if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('`SUNUCUYU_YÖNET` Yetkisine Sahip Olmalısın!')
  
  if (args[0] == 'aç') {
    db.set(`kufur_${message.guild.id}`, 'acik').then(i => {
     return message.channel.sendEmbed(new Discord.RichEmbed().setDescription('<:CARRyes:524245926358024193> Küfür Engel Başarıyla Açıldı! `Üyeleri Yasakla` Yetkisine Sahip Olanların Küfürü Engellenmicektir.').setColor("RANDOM"));
    })
  }
  if (args[0] == 'kapat') {
    db.set(`kufur_${message.guild.id}`, 'kapali').then(i => {
     return message.channel.sendEmbed(new Discord.RichEmbed().setDescription('<:CARRyes:524245926358024193> Küfür Filtresi Başarıyla Kapatıldı.').setColor("RANDOM"));
    })
  }

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['küfür-engel'],
  kategori: "ayarlar",
  permLevel: 3
};

exports.help = {
  name: 'küfür-filtresi',
  description: 'Küfür Engelleme Sistemini Açar/Kapatır.',
  usage: 'küfür-filtresi <aç/kapat>'
};