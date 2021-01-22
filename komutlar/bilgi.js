const Discord = require("discord.js")
const { version } = require("discord.js");
const moment = require("moment");
const m = require("moment-duration-format");
let os = require('os')
let cpuStat = require("cpu-stat")
const ms = require("ms")
const ayarlar = require('../ayarlar.json');

exports.run = (client, message) => {
   let cpuLol;
    cpuStat.usagePercent(function(err, percent, seconds) {
        if (err) {
            return console.log(err);
        }
  const duration = moment.duration(client.uptime).format(" D [Gün], H [Saat], m [Dakika], s [Saniye]");
	const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(client.user.username, client.user.avatarURL)
	.addField("<:ownertag:516985843978600449> ● Yapımcılar", `<@369428477818175490>`, true)
  .addField("<:KEEGANram:513036331660607494> ● Bellek Kullanımı", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
  .addField("<:botinf:516988516106895360> ● Sunucu Sayısı", `${client.guilds.size}`, true)
  .addField("<:botinf:516988516106895360> ● Kullanıcı Sayısı", `${client.users.size}`, true)
  .addField("<:botinf:516988516106895360> ● Kanal Sayısı", `${client.channels.size}`, true)
  .addField("<a:loadingkeegann:513039577607569431> ● Çalışma Süresi", `${duration}`, true)
  .addField("<:pingk:516994196742209558> ● Ping", `${Math.round(client.ping)}ms`, true)
  .addField("<:dcjskeegan:513040529349410816> ● Discord.js Sürümü", `v${version}`, true)
  .addField("<:cpuKEEGAN:513041247460655106> ● İşletim Sistemi", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
	.addField("<:davetk:516992487449952266> ● Bot Davet", "[Davet Et](https://discordapp.com/oauth2/authorize?client_id=501676393432743936&scope=bot&permissions=2146958847)", )
  .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.avatarURL)
	.setThumbnail();
    return message.channel.send(embed)
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['i', 'bilgi', 'botbilgi'],
  kategori: "bot",
  permLevel: 0
};

exports.help = {
  name: 'istatistikler',
  description: 'Bot İstatistiklerini Görüntüler.',
  usage: 'bilgi'
};
