const Discord = require('discord.js')
const db = require('quick.db')

exports.run = (client, message, args) => {
if(message.author.id !== '369428477818175490' & message.author.id !== '369428477818175490') return message.channel.send('<:CARRno:524246262191751168> Bu komut yapımcıma / yapımcılara özeldir!')
  var x = args[0]
var id = client.guilds.get(args[1])
if (!x) { 
  return message.reply("<:CARRno:524246262191751168> aktif veya deaktif yazınız.")
}
if (!id) return message.reply("<:CARRno:524246262191751168> Premium hangi sunucuda aktif veya deaktif edilecek! ID olarak yaz canım!")
  
  if (x === 'aktif') {
 db.set(`pre_${id.id}`, "aktif")
     var channel = client.channels.find('id', '538502937882656768')
  message.channel.send('<:CARRyes:524245926358024193> Başarılı! ' + id.id + " ID sine sahip sunucu premium'a sahip.")
    const embed = new Discord.RichEmbed()
    .setAuthor('Premium', message.author.avatarURL)
    .setDescription('<:CARRyes:524245926358024193> Premium aktif edildi! \nEdilen sunucu IDsi: '+ id.id +'\nSunucu adı: '+ id.name +'\nSunucu sahibi: '+ id.owner +'\nAktif eden yetkili: '+ message.author +'')
    .setColor('RANDOM')
    channel.send(embed)
  }

  if (x === 'deaktif') {
    db.delete(`pre_${id.id}`)
     var channel = client.channels.find('id', '538502937882656768')
  message.channel.send('<:CARRyes:524245926358024193> Başarılı! ' + id.id + " ID sine sahip sunucu artık premium'a sahip değil.")
    const embed = new Discord.RichEmbed()
    .setAuthor('Premium', message.author.avatarURL)
    .setDescription('<:CARRyes:524245926358024193> Premium deaktif edildi! \nDeaktif Edilen sunucu IDsi: '+ id.id +'\nSunucu adı: '+ id.name +'\nSunucu sahibi: '+ id.owner +'\nDeaktif eden yetkili: '+ message.author +'')
    .setColor('RANDOM')
    channel.send(embed)
  }
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
  kategori: 'premium',
    permLevel: 0,
}

exports.help = {
    name: 'premium',
    description: 'Premium aktifleştirir veya deaktifleştirir.',
    usage: 'premium [aktif/deaktif] [sunucu ID]'
}