const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {
    let pre = await db.fetch(`pre_${message.guild.id}`)
  let preYazi;
  if (pre == null) preYazi = '<:CARRno:524246262191751168> Bu Sunucuda Premium Aktif Değil!'
  if (pre == 'aktif') preYazi = '<:CARRyes:524245926358024193> Bu Sunucuda Premium Aktif!'
  if (pre == 'deaktif') preYazi = '<:CARRno:524246262191751168> Bu Sunucuda Premium Deaktif!'
  const embed = new Discord.RichEmbed()
  .setTitle('Premium Kontrol')
   .setColor(0x36393E)
  .setDescription(preYazi)
  message.channel.send(embed)
  }
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
  kategori: 'premium',
    permLevel: 0,
}

exports.help = {
    name: 'premium-kontrol',
    description: 'Premium Kontrol Eder.',
    usage: 'premium-kontrol'
}