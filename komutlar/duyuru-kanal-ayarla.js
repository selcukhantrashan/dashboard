const Discord = require("discord.js");
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`<:CARRno:524246262191751168> Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);

      let prefix = await db.fetch(`prefix_${message.guild.id}`);
    if (prefix == null) prefix = 's?' 
  
let dkanal = message.mentions.channels.first()
  
    if (!dkanal) {
        return message.channel.send(`<:CARRno:524246262191751168> Duyuru kanalı olarak ayarlamak istediğin kanalı etiketlemelisin.`)
    }
  
  if (!dkanal) return;
  
    db.set(`duyuruk_${message.guild.id}`, dkanal.name)
    message.channel.send(`<:CARRyes:524245926358024193> Duyuru kanalı başarıyla \`#${dkanal.name}\` olarak ayarlandı.`)
  
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['duyuru-kanal'],
  kategori: 'ayarlar',
    permLevel: 3
}

exports.help = {
    name: 'duyuru-kanal-ayarla',
    description: 'Duyuru kanalını ayarlar.',
    usage: 'duyuru-kanal-ayarla <#kanal>'
}