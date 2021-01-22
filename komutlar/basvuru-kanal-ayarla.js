const Discord = require('discord.js')
const db = require('quick.db');

exports.run = async (client, message, args) => {
  
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`<:CARRno:524246262191751168> Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  

  let bkanal = message.mentions.channels.first()
 
  
  if (!bkanal) {
    message.channel.send(`<:CARRno:524246262191751168> Başvuru kanalını etiketlemelisin.`)
  }
  
  if (!bkanal) return;
  
  db.set(`bkanal1_${message.guild.id}`, bkanal.name)
  
    message.channel.send(`<:CARRyes:524245926358024193> Başvuru kanalı \`${bkanal.name}\` olarak ayarlandı.`)
  
  };

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['başvuru-kanal'],
  kategori: 'ayarlar',
    permLevel: 3
}

exports.help = {
    name: 'başvuru-kanal-ayarla',
    description: 'Yetki Başvurularının Gönderileceği Kanalı Ayarlar.',
    usage: 'başvuru-kanal-ayarla <#kanal>'
}