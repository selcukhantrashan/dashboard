const Discord = require('discord.js');
var express = require('express');
const ytdl = require('ytdl-core');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const Jimp = require('jimp');
const ms = require('ms');
const fs = require('fs');
const canvas = require('canvas');
const momenttimezone = require('moment-timezone')
const db = require('quick.db');
const YouTube = require('simple-youtube-api');
const superagent = require("superagent");
const { promisify } = require('util')
const chalk = require('chalk');
const weather = require('weather-js')
const moment = require('moment');
require('./util/eventLoader')(client)
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwMTY3NjM5MzQzMjc0MzkzNiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTQ1NDA5ODYzfQ.UBd4sYZIn0IqfXUV2gdDkyeBBooh_5dWnacHEhWzDOw', client);
//TEŞEKKUR EDİN BARİ
dbl.on('posted', () => {
  console.log('[-] BOT: Server kısmını ayarladım !');
})

dbl.on('error', e => {
 console.log(`Oops! ${e}`);
})

const log = message => {
  console.log(`${message}`);
};

client.on('ready', () => {
  console.log(``);
});


  client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("MANAGE_MESSAGES")) permlvl = 1;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};


var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.on('guildCreate', guild => {
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setTitle('Bir Sunucuya Katıldım;')
  .setDescription(`Bot, 》${guild.name}《 Adlı Sunucuya Katıldı. Sunucu Üye Sayısı: [${guild.memberCount} Üye]!`)
  .setFooter(`${client.user.username}`, client.user.avatarURL)
  .setTimestamp()
  client.channels.get('516633948684550147').send(embed);
});

client.on('guildDelete', guild => {
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setTitle('Bir Sunucudan Ayrıldım;')
  .setDescription(`Bot, 》${guild.name}《 Adlı Sunucudan Atıldı. Sunucu Üye Sayısı: [${guild.memberCount} Üye]!`)
  .setFooter(`${client.user.username}`, client.user.avatarURL)
  .setTimestamp()
  client.channels.get('516633948684550147').send(embed);
});

client.on('guildBanAdd', async (guild, member) => {
const kayitk = await db.fetch(`kayitlar_${member.guild.id}`); 
const kayitk2 = member.guild.channels.find('name', kayitk);
  if (!kayitk2) return;
   const embed = new Discord.RichEmbed()
			.setTitle('Üye yasaklandı.')
			.setAuthor(member.user.tag, member.user.avatarURL)
			.setColor("15158332")
			.setDescription(`<@!${member.user.id}>, ${member.user.tag}`)
			.setThumbnail(member.user.avatarURL)
			.setFooter(`ID: ${member.user.id}`)
			.setTimestamp();
			kayitk2.send({embed});
	});
	
	client.on('guildBanRemove', async (guild, member) => {
    const kayitk = await db.fetch(`kayitlar_${member.guild.id}`); 
    const kayitk2 = member.guild.channels.find('name', kayitk);
    if (!kayitk2) return;
			var embed = new Discord.RichEmbed()
			.setTitle('Üyenin yasaklaması kaldırıldı.')
			.setAuthor(member.user.tag, member.user.avatarURL)
			.setColor(3447003)
			.setDescription(`<@!${member.user.id}>, ${member.user.tag}`)
			.setThumbnail(member.user.avatarURL)
			.setFooter(`ID: ${member.user.id}`)
			.setTimestamp();
			kayitk2.send({embed});
		
	})
	
	client.on('messageDelete', async message => {
    const kayitk = await db.fetch(`kayitlar_${message.guild.id}`); 
    const kayitk2 = message.guild.channels.find('name', kayitk);
    if (!kayitk2) return;
			var embed = new Discord.RichEmbed()
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setColor(15158332)
			.setDescription(`<@!${message.author.id}> tarafından <#${message.channel.id}> kanalına gönderilen mesajı silindi.`)
      .addField("Silinen Mesaj", `\`\`\`${message.content}\`\`\``)
			.setFooter(`ID: ${message.id}`)
			kayitk2.send({embed});
		
	});

	client.on('channelCreate', async channel => {
	  const kayitk = await db.fetch(`kayitlar_${channel.guild.id}`); 
    const kayitk2 = channel.guild.channels.find('name', kayitk);
    if (!kayitk2) return;
			if (channel.type === "text") {
				var embed = new Discord.RichEmbed()
				.setColor(3066993)
				.setAuthor(channel.guild.name, channel.guild.iconURL)
				.setDescription(`<#${channel.id}> Adında Bir **Metin** Kanalı Oluşturuldu!`)
				.setFooter(`Kanal ID: ${channel.id}`)
				kayitk2.send({embed});
			};
			if (channel.type === "voice") {
				var embed = new Discord.RichEmbed()
				.setColor(3066993)
				.setAuthor(channel.guild.name, channel.guild.iconURL)
				.setDescription(`${channel.name} Adında Bir **Sesli** Kanal Oluşturuldu!`)
				.setFooter(`Kanal ID: ${channel.id}`)
				kayitk2.send({embed});
			}
		
	});

		client.on('channelDelete', async channel => {
    const kayitk = await db.fetch(`kayitlar_${channel.guild.id}`); 
    const kayitk2 = channel.guild.channels.find('name', kayitk);
    if (!kayitk2) return;
			if (channel.type === "text") {
				let embed = new Discord.RichEmbed()
				.setColor(3066993)
				.setAuthor(channel.guild.name, channel.guild.iconURL)
				.setDescription(`${channel.name} Adında Bir **Metin** Kanalı Silindi!`)
				.setFooter(`Kanal ID: ${channel.id}`)
				kayitk2.send({embed});
			};
			if (channel.type === "voice") {
				let embed = new Discord.RichEmbed()
				.setColor(3066993)
				.setAuthor(channel.guild.name, channel.guild.iconURL)
				.setDescription(`${channel.name} Adında Bir **Sesli** Kanal Silindi!`)
				.setFooter(`Kanal ID: ${channel.id}`)
				kayitk2.send({embed});
			}
		
	})

const serverStats = { // SUNUCU İSTATİSTİK
  guildID: '501124738085683201', //Sunucunun ID'si
  totalUsersID: '527346978582036490', //Toplam kullanıcı sayısının gözükmesini istediğin kanalın ID'si
  memberCountID: '527347216898195467', //Toplam Bot Olmayanların sayısının gözükmesini istediğin kanalın ID'si
  botCountID: '527347123730120715' //Toplam Bot Olanların sayısının gözükmesini istediğin kanalın ID'si
};

client.on('guildMemberAdd', member => {
  if (member.guild.id !== serverStats.guildID) return;
  client.channels.get(serverStats.totalUsersID).setName(`Toplam Kullanıcı Sayısı : ${member.guild.memberCount}`);
  client.channels.get(serverStats.memberCountID).setName(`Üye Sayısı : ${member.guild.members.filter(m => !m.user.bot).size}`);
  client.channels.get(serverStats.botCountID).setName(`Bot Sayısı : ${member.guild.members.filter(m => m.user.bot).size}`);
 
});

client.on('guildMemberRemove', member => {
  if (member.guild.id !== serverStats.guildID) return;
  client.channels.get(serverStats.totalUsersID).setName(`Toplam Kullanıcı Sayısı : ${member.guild.memberCount}`);
  client.channels.get(serverStats.memberCountID).setName(`Üye Sayısı : ${member.guild.members.filter(m => !m.user.bot).size}`);
  client.channels.get(serverStats.botCountID).setName(`Bot Sayısı : ${member.guild.members.filter(m => m.user.bot).size}`);
  
});

client.on("guildMemberAdd", async member => {
  let prefix = await db.fetch(`prefix_${member.guild.id}`);
if (prefix == null) prefix = 's?'
  let sayac = await db.fetch(`sayac_${member.guild.id}`);
  let skanal = await db.fetch(`sayacK_${member.guild.id}`);
  if (!skanal) return;
  const skanal2 = member.guild.channels.find('name', skanal)
  const sayacgmesaj = await db.fetch(`sayacgm_${member.guild.id}`)
  skanal2.send(sayacgmesaj ? sayacgmesaj.replace('{kullanıcı}', `${member.user}`) .replace('{toplam}', `${sayac}`) .replace('{kalan}', `${sayac - member.guild.members.size}`) : `:inbox_tray: \`${member.user.tag}\` adlı kullanıcı sunucuya katıldı. \`${sayac}\` kullanıcı olmaya \`${sayac - member.guild.members.size}\` kullanıcı kaldı. (\`${prefix}sayaç-giriş-mesaj\` komutu ile değiştirilebilir.)`)

if (member.guild.members.size == sayac) {
    skanal2.send(`:tada: Sunucu \`${sayac}\` kullanıcıya ulaştı. Sayaç sıfırlandı.`)
    .then(db.delete(`sayac_${member.guild.id}`))
    .then(db.delete(`sayacK_${member.guild.id}`))
  }
});

client.on("guildMemberRemove", async member => {
  let prefix = await db.fetch(`prefix_${member.guild.id}`);
if (prefix == null) prefix = 's?'
  let sayac = await db.fetch(`sayac_${member.guild.id}`);
  let skanal = await db.fetch(`sayacK_${member.guild.id}`);
  if (!skanal) return;
  const skanal2 = member.guild.channels.find('name', skanal)
  const sayaccmesaj = await db.fetch(`sayaccm_${member.guild.id}`)
 skanal2.send(sayaccmesaj ? sayaccmesaj.replace('{kullanıcı}', `${member.user.tag}`) .replace('{sayı}', `${sayac}`) .replace('{kalan}', `${sayac - member.guild.members.size}`) : `:inbox_tray: \`${member.user.tag}\` adlı kullanıcı sunucudan ayrıldı. \`${sayac}\` kullanıcı olmaya \`${sayac - member.guild.members.size}\` kullanıcı kaldı. (\`${prefix}sayaç-çıkış-mesaj\` komutu ile değiştirilebilir.)`)
});

client.on("message", async msg => {  
 let kufur = await db.fetch(`_${msg.guild.id}`)
    if (kufur == 'acik') {
        const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "şerefsiz", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq",];
        if (kufur.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();
                          
          
        msg.channel.send(`Bu sunucuda küfürler **${client.user.username}** tarafından engellenmektedir! Küfür etmene izin vermeyeceğim!`).then(msg => msg.delete(5000));
            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    else if (kufur == 'kapali') {
      
    }
    if (!kufur) return;
});

client.on("message", async msg => {
  let reklam = await db.fetch(`reklam_${msg.guild.id}`)
      if (reklam == 'acik') {
          const reklam = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party", "discord.gg", "discordapp", "discord.app",];
          if (reklam.some(word => msg.content.includes(word))) {
            try {
              if (!msg.member.hasPermission("BAN_MEMBERS")) {
                    msg.delete();
                    msg.channel.send(`Bu sunucuda reklamlar **${client.user.username}** tarafından engellenmektedir! Reklam yapmana izin vermeyeceğim!`).then(msg => msg.delete(5000));
                        }              
                      } catch(err) {
                        console.log(err);
                      }
                    }
                }
                else if (reklam == 'kapali') {
                  
                }
                if (!reklam) return;
              });

client.on('message', async msg => {
  let komut = await db.fetch(`sunucuKomut_${msg.guild.id}`);
  let komutYazi;
  if (komut == null) komutYazi = 'ashahsgahgsjgasjhagsjhagsa'
  else komutYazi = ''+ komut +''
  if (msg.content.toLowerCase() === `${komutYazi}`) {
      let mesaj = await db.fetch(`sunucuMesaj_${msg.guild.id}`);
  let mesajYazi;
  if (mesaj == null) mesajYazi = 'Viçuğğğğ!!'
  else mesajYazi = ''+ mesaj +''
    msg.channel.send(mesajYazi)
  }
});

client.on("message", async msg => {
 let sa = await db.fetch(`saas_${msg.guild.id}`)
    if (sa == 'acik') {
      if (msg.content.toLowerCase() == 'sa' || msg.content.toLowerCase() == 'sea' || msg.content.toLowerCase() == 'selamun aleyküm') {
          try {

                  return msg.reply('Aleyküm Selam')
          } catch(err) {
            console.log(err);
          }
      }
    }
    else if (sa == 'kapali') {
      
    }
    if (!sa) return;
  });

client.on("message", async message => {
    let afk_kullanici = message.mentions.users.first() || message.author;
    if(message.content.startsWith("s?afk")) return; //! yazan yeri kendi botunuzun prefixi ile değiştirin.
  if (message.author.bot === true) return;
    if(message.content.includes(`<@${afk_kullanici.id}>`))
        if(await db.fetch(`afks_${afk_kullanici.id}`)) {
                message.channel.send(`**${client.users.get(afk_kullanici.id).tag}** adlı kullanıcı şuanda AFK! \n**Sebep:** \n${await db.fetch(`afks_${afk_kullanici.id}`)}`)
        }
        if(await db.fetch(`afks_${message.author.id}`)) {
                message.reply("başarıyla AFK modundan çıktın!")
            db.delete(`afks_${message.author.id}`)
        }
});

client.on('guildMemberAdd', async member => {
  
  let rol = await db.fetch(`otorol_${member.guild.id}`);
  let rol2 = member.guild.roles.find('name', rol);
  
  const rolk = await db.fetch(`rolK_${member.guild.id}`);
  if(!rolk) return;
  const rolk2 = member.guild.channels.find('name', rolk)
  const otorolmesaj = await db.fetch(`otorolm_${member.guild.id}`)
  
  member.addRole(rol2);
  rolk2.send(otorolmesaj ? otorolmesaj.replace('{kullanıcı}', `${member.user}`) .replace('{rol}',`${rol2.name}`) : `<:CARRyes:524245926358024193> \`${member.user.tag}\` adlı kullanıcıya \`${rol2.name}\` rolü verildi.`)
});

client.on("guildMemberAdd", async member => {
  let prefix = await db.fetch(`prefix_${member.guild.id}`);
if (prefix == null) prefix = 's?'
  let mkanal = await db.fetch(`mgcK_${member.guild.id}`);
  if (!mkanal) return;
  const mkanal2 = member.guild.channels.find('name', mkanal)
  const gmesaj = await db.fetch(`girism_${member.guild.id}`)
  mkanal2.send(gmesaj ? gmesaj.replace('{kullanıcı}', `${member.user}`) .replace('{sunucu}', `${member.guild.name}`) : `\`${member.user.tag}\` Adlı Kullanıcı \`${member.guild.name}\` Adlı Sunucuya Katıldı. (\`${prefix}giriş-mesaj\` komutu ile değiştirilebilir.)`)
});

client.on("guildMemberRemove", async member => {
  let prefix = await db.fetch(`prefix_${member.guild.id}`);
if (prefix == null) prefix = 's?'
  let mkanal = await db.fetch(`mgcK_${member.guild.id}`);
  if (!mkanal) return;
  const mkanal2 = member.guild.channels.find('name', mkanal)
  const cmesaj = await db.fetch(`cikism_${member.guild.id}`)
 mkanal2.send(cmesaj ? cmesaj.replace('{kullanıcı}', `${member.user.tag}`) .replace('{sunucu}', `${member.guild.name}`) : `\`${member.user.tag}\` Adlı Kullanıcı \`${member.guild.name}\`Adlı Sunucudan Ayrıldı. (\`${prefix}çıkış-mesaj\` komutu ile değiştirilebilir.)`)
});

client.config = require("./config.js")
client.logger = console
client.wait = promisify(setTimeout)
client.ayar = db

String.prototype.toProperCase = function() {
  return this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

Array.prototype.random = function() {
  return this[Math.floor(Math.random() * this.length)];
};

process.on("uncaughtException", (err) => {
  const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
  console.error("Uncaught Exception: ", errorMsg);
  process.exit(1);
});

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: ", err);
});

client.login(ayarlar.token)