const Eris = require("eris");
const bot = new Eris(`Bot ${process.env.BOT_TOKEN}`);
const axios = require("axios");
const prefix = "*"

bot.on("ready", () => {
  console.log("bot is now ready");
  bot.editStatus("online", {
    name: "type '*help' to see the commands",
    type: 0
  })
})

bot.on("error", e => {
  console.log(e)
})

/* Functionalities */

/* WELCOMERS */
function reactToMessages(msg, channelId, messageId, reaction) {
  if (msg.author.bot) return;
  if (msg.content.match(/^hi|^hello|^welcome/ig)) {
    const channelId = `${msg.channel.id}`;
    const messageId = `${msg.id}`;
    const reactions = `${reaction}`;
    return bot.addMessageReaction(channelId, messageId, reactions)
  }
  else return;
}

/*  MUTE FUNCTION */

async function muteMembers(msg) {
  if (msg.author.bot) return;
  if (msg.content.startsWith(`${prefix}mute`) && msg.mentions.length > 0 && msg.member.permissions.has("banMembers")) {
    const userToMute = `${msg.mentions[0].id}`;
    const roleId = "894290132608364544";
    msg.channel.guild.addMemberRole(userToMute, roleId)
      .then(succes => {
        bot.createMessage(msg.channel.id, `<@${userToMute}> is successfully muted`);
      })
      .catch(err => console.log(err));
  }

  if (msg.content.startsWith(`${prefix}mute`) && !msg.member.permissions.has("banMembers") && msg.mentions.length > 0) {
    msg.channel.createMessage({ content: "You don't have a permission to run this command", messageReferenceID: msg.id })
    return;
  }

  if (msg.content.startsWith(`${prefix}mute`) && msg.member.permissions.has("banMembers") && msg.mentions.length === 0) {
    msg.channel.createMessage({ content: "To Mute Someone Just Type `*mute [user]`", messageReferenceID: msg.id })
    return;
  }

};

async function removeMute(msg) {
  if (msg.author.bot) return;
  if (msg.content.startsWith(`${prefix}unmute`) && msg.mentions.length > 0 && msg.member.permissions.has("banMembers")) {
    const userToUnmute = `${msg.mentions[0].id}`;
    const roleId = "894290132608364544";
    msg.channel.guild.removeMemberRole(userToUnmute, roleId)
      .then(success => {
        bot.createMessage(msg.channel.id, `<@${userToUnmute}> is successfully unmuted`)
      })
      .catch(err => console.log(err))
  }

  if (msg.content.startsWith(`${prefix}unmute`) && msg.member.permissions.has("banMembers") && msg.mentions.length === 0) {
    msg.channel.createMessage({ content: "To unmute someone just type `*unmute [user]`", messageReferenceID: msg.id })
  }

  if (msg.content.startsWith(`${prefix}unmute`) && !msg.member.permissions.has("banMembers") && msg.mentions.length > 0) {
    msg.channel.createMessage({ content: "You don't have a permission to run this command", messageReferenceID: msg.id })
    return;
  }
};

/* BAN MEMBERS FUNCTION */

async function banMembers(msg) {
  if (msg.author.bot) return;
  if (msg.content.startsWith(`${prefix}ban`) && msg.mentions.length > 0 && msg.member.permissions.has("banMembers")) {
    const guildId = msg.channel.guild.id;
    const userId = msg.mentions.userId;
    bot.banGuildMember(guildId, userId, 7)
      .then(success => {
        bot.createMessage(msg.channel.id, `<@${msg.mentions[0].id}> is now banned to this server`)
          .catch(err => console.log(err))
      })
  }

  if (msg.content.startsWith(`${prefix}ban`) && msg.member.permissions.has("banMembers") && msg.mentions.length === 0) {
    msg.channel.createMessage({ content: "To ban someone just type `*ban [user]`", messageReferenceID: msg.id })
  }

  if (msg.content.startsWith(`${prefix}ban`) && !msg.member.permissions.has("banMembers") && msg.mentions.length > 0) {
    msg.channel.createMessage({ content: "You don't have a permission to run this command", messageReferenceID: msg.id })
    return;
  }
}

async function filterBadWords(msg) {
  const badWords = /nigga|nigger/ig
  if (msg.content.match(badWords)) {
    const channelId = msg.channel.id;
    const messageId = msg.id;
    const successMute = {
      embed: {
        title: "Breaking the Rules",
        description: `<@${msg.member.id}> that message is not allowed here you are now muted for 5 minutes <:pepe_think:892785936633577482>`,
        color: 0xff0000,
        footer: {
          text: "Muted",
          icon_url: "https://raw.githubusercontent.com/Maii2603/chill-house-images/main/20211004_004334_0000.png"
        }
      }
    }
    const userToMute = msg.member.id;
    const roleId = "894290132608364544";
    bot.deleteMessage(channelId, messageId)
      .then(success => {
        bot.createMessage(channelId, successMute);
      })
    msg.channel.guild.addMemberRole(userToMute, roleId);
    setTimeout(() => {
      doneMute(msg, userToMute, roleId)
    }, 300000);
  }
}

function doneMute(msg, user, channelId) {
  msg.channel.guild.removeMemberRole(user, channelId)
    .then(success => {
      bot.createMessage(msg.channel.id, `<@${user}> is now unmuted`)
    })
}

/* WAIFU FUNCTIONS */

async function animatedWaifu(url, titleText, footerText) {
  const fetchAnimatedWaifu = axios.get(url)
  const animatedWaifus = await fetchAnimatedWaifu
  const embedSrc = {
    title: titleText,
    image: {
      url: String(animatedWaifus.data.url)
    },
    footer: {
      text: footerText
    }
  }
  return embedSrc
}

async function animatedWaifuStatement(msg, action, url) {
  if (msg.content.startsWith(`${prefix}${action}`) && msg.mentions.length === 0) {
    bot.createMessage(msg.channel.id, {
      embed: await animatedWaifu(url, `${action.toUpperCase()}`, `Here Some ${action}`)
    })
  }

  if (msg.content.startsWith(`${prefix}${action}`) && msg.mentions.length > 0) {
    bot.createMessage(msg.channel.id, {
      embed: await animatedWaifu(url, `${action.toUpperCase()} ${msg.mentions[0].username}`, `Here some ${action} for you`)
    })
  }
}

async function fetchnsfwWaifu(msg, url) {
  const getWaifu = await axios.get(url)
  const nsfwWaifu = await getWaifu.data.url
  const embeddedWaifu = {
    embed: {
      title: "NSFW",
      image: {
        url: String(nsfwWaifu)
      },
      color: 0xff0000
    }
  }
  bot.createMessage(msg.channel.id, embeddedWaifu)
}

async function nsfwWaifuStatement(msg) {
  if (msg.author.bot) return;
  if (msg.content.startsWith(`${prefix}hwaifu`) || msg.content.startsWith(`${prefix}hw`) && msg.channel.nsfw === true) {
    await fetchnsfwWaifu(msg, "https://api.waifu.pics/nsfw/waifu")
  }

  if (msg.content.startsWith(`${prefix}hneko`) || msg.content.startsWith(`${prefix}hn`) && msg.channel.nsfw === true) {
    await fetchnsfwWaifu(msg, "https://api.waifu.pics/nsfw/neko")
  }

  if (msg.content.startsWith(`${prefix}hblowjob`) || msg.content.startsWith(`${prefix}hbj`) && msg.channel.nsfw === true) {
    await fetchnsfwWaifu(msg, "https://api.waifu.pics/nsfw/blowjob")
  }
}

function helpCommands(msg) {
  if (msg.content === `${prefix}help`) {
    const embedCommands = {
      embed: {
        title: "BOT COMMANDS",
        description: "this is a list of command that bot can do",
        image: {
          url: "https://raw.githubusercontent.com/Maii2603/chill-house-images/main/GIF-211007_085406.gif"
        },
        thumbnail: {
          url: "https://raw.githubusercontent.com/Maii2603/chill-house-images/main/standard%20(1).gif"
        },
        fields: [{
          name: "🟥 prefix",
          value: "*"
         }, {
          name: "🟥 FUN COMMANDS",
          value: "av,nitro,pat,wave,wink,hug,lick,bonk,kiss,kill,bully,awoo,bite,cringe,dance,highfive,handhold,slap"
         }, {
          name: "🟥 ANIME COMMANDS",
          value: "anime,quote"
         }, {
          name: "🟥 NSFW COMMANDS",
          value: "hwaifu,hneko,hblowjob"
         }, {
          name: "🟥 MODERATION",
          value: "ban,mute,unmute,kick"
         }],
        color: 0xff0000,
        footer: {
          text: "COMMANDS",
          icon_url: "https://raw.githubusercontent.com/Maii2603/chill-house-images/main/static.png"
        }
      }
    }
    bot.createMessage(msg.channel.id, embedCommands)
  }
}

async function kickSomeone(msg) {
  if (msg.content === `${prefix}kick` && msg.member.permissions.has("banMembers")) {
    msg.channel.createMessage({ content: "To kick someone use `*kick [user]`", messageReferenceID: msg.id })
    console.log(bot.kickGuildMember)
  }

  if (msg.content.startsWith(`${prefix}kick`) && msg.mentions.length > 0 && msg.member.permissions.has("banMembers")) {
    const userToKick = msg.mentions[0].id;
    const guildId = msg.channel.guild.id;
    bot.kickGuildMember(guildId, userToKick)
      .then(success => {
        bot.createMessage(msg.channel.id, "<@${userToKick}> has been kicked")
      })
  }
}

async function deleteSwearMessages(msg) {
  if (msg.author.bot) return;
  const swearMessages = /fuck\s?you|putang\s?ina|https\:\/\/discord\.gg\/[\w\W\d\D]+|gago+|w?tf|bobo|tangina|puking\s?ina/ig
  if(msg.content.match(swearMessages) && msg.member.permissions.has("banMembers")){
    return;
  }
  if (msg.content.match(swearMessages)) {
    bot.deleteMessage(msg.channel.id, msg.id)
  }
  if (msg.content.length >= 200) {
    bot.deleteMessage(msg.channel.id, msg.id)
      .then(deleted => {
        bot.createMessage(msg.channel.id, "Too Many Characters")
      })
  }
}

/* WELCOME MESSAGES */

bot.on("messageCreate", msg => {
  reactToMessages(msg, msg.channel.id, msg.id, "Pepe_Crown:892783785656074241");
  reactToMessages(msg, msg.channel.id, msg.id, "👋");
  reactToMessages(msg, msg.channel.id, msg.id, "ZeroTwo_heartlove:893519792194084915");
})


/* BAD WORDS */

bot.on("messageCreate", async msg => {
  muteMembers(msg)
  removeMute(msg)
  banMembers(msg)
  filterBadWords(msg)
  helpCommands(msg)
  kickSomeone(msg)
  deleteSwearMessages(msg)
  await nsfwWaifuStatement(msg)
})

/* FUN COMMANDS */

bot.on("messageCreate", async msg => {
  if (msg.author.bot) return;
  if (msg.content === prefix) return;
  await animatedWaifuStatement(msg, "pat", "https://api.waifu.pics/sfw/pat")

  await animatedWaifuStatement(msg, "hug", "https://api.waifu.pics/sfw/hug")

  await animatedWaifuStatement(msg, "kiss", "https://api.waifu.pics/sfw/kiss")

  await animatedWaifuStatement(msg, "bully", "https://api.waifu.pics/sfw/bully")

  await animatedWaifuStatement(msg, "cuddle", "https://api.waifu.pics/sfw/cuddle")

  await animatedWaifuStatement(msg, "awoo", "https://api.waifu.pics/sfw/awoo")

  await animatedWaifuStatement(msg, "lick", "https://api.waifu.pics/sfw/lick")

  await animatedWaifuStatement(msg, "smug", "https://api.waifu.pics/sfw/smug")

  await animatedWaifuStatement(msg, "bonk", "https://api.waifu.pics/sfw/bonk")

  await animatedWaifuStatement(msg, "blush", "https://api.waifu.pics/sfw/blush")

  await animatedWaifuStatement(msg, "highfive", "https://api.waifu.pics/sfw/highfive")

  await animatedWaifuStatement(msg, "smile", "https://api.waifu.pics/sfw/smile")

  await animatedWaifuStatement(msg, "wave", "https://api.waifu.pics/sfw/wave")

  await animatedWaifuStatement(msg, "handhold", "https://api.waifu.pics/sfw/handhold")

  await animatedWaifuStatement(msg, "bite", "https://api.waifu.pics/sfw/bite")

  await animatedWaifuStatement(msg, "slap", "https://api.waifu.pics/sfw/slap")

  await animatedWaifuStatement(msg, "kill", "https://api.waifu.pics/sfw/kill")

  await animatedWaifuStatement(msg, "kick", "https://api.waifu.pics/sfw/kick")

  await animatedWaifuStatement(msg, "cringe", "https://api.waifu.pics/sfw/cringe")

  await animatedWaifuStatement(msg, "wink", "https://api.waifu.pics/sfw/wink")

  await animatedWaifuStatement(msg, "dance", "https://api.waifu.pics/sfw/dance")
})

bot.on("messageCreate", async msg => {
  if (msg.content.startsWith(`${prefix}av`) && msg.mentions.length > 0 || msg.content.startsWith(`${prefix}avatar`) && msg.mentions.length > 0) {
    const userMentionAvatar = msg.mentions[0].dynamicAvatarURL("", 4096)
    const mentionEmbed = {
      embed: {
        title: "AVATAR",
        description: `${msg.mentions[0].username}#${msg.mentions[0].discriminator}`,
        image: {
          url: userMentionAvatar
        },
        color: 0xff0000
      }
    }
    bot.createMessage(msg.channel.id, mentionEmbed)
  }

  if (msg.content === `${prefix}av` || msg.content === `${prefix}avatar`) {
    const memberAvatar = msg.member.user.dynamicAvatarURL("", 4096);
    const userEmbed = {
      embed: {
        title: "AVATAR",
        description: `${msg.member.username}#${msg.member.discriminator}`,
        image: {
          url: memberAvatar
        },
        color: 0xff0000
      }
    }
    bot.createMessage(msg.channel.id, userEmbed)
  }
})

bot.on("messageCreate", async msg => {
  if (msg.author.bot) return;
  if (msg.content === `${prefix}nitro`) {
    const dmChannel = await bot.getDMChannel(msg.author.id)
    bot.createMessage(dmChannel.id, "https://dlscord.life/Bf6YyOCKeQiquIjf")
    return msg.channel.createMessage({
      embed: {
        title: "Nitro Gift",
        description: "Nitro has been successfully sent to your account check your DM's and have fun",
        color: 0xff0000,
        image: {
          url: "https://cdn.dribbble.com/users/1029769/screenshots/3238009/nitro_cut_dribbble.gif"
        },
        thumbnail: {
          url: "https://www.digiseller.ru/preview/257605/p1_2959781_897bd14c.png"
        },
        footer: {
          text: "Nitro",
          icon_url: "https://sakurakyo.com/wp-content/uploads/2019/11/discord-nitro.png"
        },
        color: 0xff0000
      }
    })
  }
})

bot.on("messageCreate", msg => {
  if (msg.content === `${prefix}invite`) {
    const embedInvite = {
      embed: {
        title: "CHILL HOUSE INVITE LINK",
        description: "This is the permanent invite link of the server use this to invite someone.",
        fields: [{
          name: "Invite Link",
          value: "https://discord.gg/Su2pJnkfHK"
          }, {
          name: "LOOKING FOR FRIENDS TO TALK TO",
          value: "Hello there people! I'd like to present you our discord server, The CHILL HOUSE. We have a lot and different kinds of specimen here, everyone is welcome!! You can do anything you want to be in here as long as you don't hurt other people. \nCome join me and help to grow our server! "
        }, {
          name: "WE HAVE",
          value: "-COOL BOTS\n\n-FRIENDLY ADMIN AND MODS\n\n-SUGGESTION CHANNEL\n\n-AND MORE"
        }, {
          name: "OTHER INFO",
          value: "-NOT A NSFW SERVER\n\n-WE ARE ONLY ACCEPTING 13 y/o AND ABOVE\n\n-WE HAVE FILIPINO MEMBERS\n\n-WE ARE DOING PARTNERSHIPS"
        }],
        image: {
          url: "https://raw.githubusercontent.com/Maii2603/chill-house-images/main/standard%20(1).gif"
        },
        footer: {
          text: "Server Info And Invite Link",
          icon_url: "https://raw.githubusercontent.com/Maii2603/chill-house-images/main/static.png"
        },
        color: 0xff0000
      }
    }
    bot.createMessage(msg.channel.id, embedInvite)
  }
})

bot.on("messageCreate", async msg => {
  if (msg.author.bot) return;
  if (msg.content === `${prefix}quote`) {
    const getQoute = await axios.get("https://animechan.vercel.app/api/random");
    const qoutes = await getQoute.data;
    const embededQoute = {
      embed: {
        title: `${qoutes.anime}\n\n\n${qoutes.character}\n\n\n`,
        description: `${qoutes.quote}`,
        color: 0xff0000,
        footer: {
          text: "anime quotes"
        }
      }
    }

    bot.createMessage(msg.channel.id, embededQoute)
  }
})

bot.on("messageCreate", async msg => {
  if (msg.content.startsWith(`${prefix}anime`)) {
    let animeTitle = msg.content.split(" ");
    animeTitle.shift()
    animeTitle = animeTitle.join(" ")
    /*const unscappedCharachters = /[\@\#\_\-\.\?\&\₱\$\®\¿\~\™\+\! \/\*\=\¢\;\`\[\] \{\} \<\>\^\¡\¿\€\¢\§\×\¶\°\¬\:\;\§]/ig
    if (animeTitle.match(unscappedCharachters)) {
      msg.channel.createMessage({ content: "No Anime Found", messageReferenceID: msg.id })
      return;
    }*/
    const fetchAnime = await axios.get(`https://kitsu.io/api/edge/anime?filter[text]=${animeTitle}`);
    if (fetchAnime.data.data.length === 0) {
      msg.channel.createMessage({ content: "No Anime Found", messageReferenceID: msg.id })
      return;
    }

    const animes = fetchAnime.data.data[0].attributes;
    const ageRatings = animes.ageRatingGuide === null || undefined || '' ? `NULL` : animes.ageRatingGuide.length === 0 ? "NULL" : animes.ageRatingGuide;
    const episodes = animes.episodeCount === null || undefined ? "Null" : animes.episodeCount;

    const show = animes.showType === null || undefined || '' ? `NULL` : animes.showType.length === 0 ? "NULL" : animes.showType;

    const status = animes.status === null || undefined || '' ? `NULL` : animes.status.length === 0 ? "NULL" : animes.status;

    const animeEmbed = {
      embed: {
        title: animes.canonicalTitle,
        description: animes.description,
        image: {
          url: animes.posterImage.large
        },
        thumbnail: {
          url: animes.posterImage.medium
        },
        fields: [{
          name: "🟥  EPISODE COUNT",
          value: episodes
      }, {
          name: "🟥  SHOW TYPE",
          value: show
      }, {
          name: "🟥  STATUS",
          value: status
      }, {
          name: "🟥  AGE RATING",
          value: ageRatings
      }, {
          name: "🟥  AVERAGE RATING",
          value: `${animes.averageRating}⭐`
      }],
        footer: {
          text: "Anime Info",
          icon_url: animes.posterImage.small
        },
        color: 0xff0000
      }
    }
    bot.createMessage(msg.channel.id, animeEmbed)
  }

})

bot.on("messageCreate", async msg => {
  if (msg.content.startsWith(`${prefix}echo`) && msg.member.permissions.has("banMembers")) {
    let mesage = msg.content.split(" ")
    mesage.shift()
    mesage = mesage.join(" ")
    bot.createMessage("885495865781944360", mesage)
  }
  if (msg.content.startsWith(`${prefix}roles`) && msg.member.permissions.has("banMembers") && msg.channel.id === "887161392988311612") {
    const roleEmbed = {
      embed: {
        title: "REACTION ROLRS",
        description: "React to this message to get Roles",
        fields: [{
          name: `GTA V`,
          value: `React <:gta_v:895142405265829899> to get\n<@&895306958414970951> role`
        }, {
          name: "GTA SAN ANDREAS",
          value: `React to get\n<:gta_SA:895297858373300316> <@&895307121653059654> role`
        }],
        color: 0xff0000
      }
    }
    bot.createMessage("887161392988311612", roleEmbed)
  }

  if (msg.content.startsWith(`${prefix}addRole`) && msg.mentions.length > 0 && msg.member.permissions.has("banMembers") && msg.roleMentions > 0) {
    const roleToAdd = msg.roleMentions[0];
    const userToAddRole = msg.mentions[0].id;
    bot.addGuildMemberRole(msg.channel.guild.id, userToAddRole, roleToAdd)
      .then(added => {
        bot.createMessage(msg.channel.id, "Role is now added")
      })
      .catch(err => console.log(err))
  }

  if (msg.content.startsWith(`${prefix}addRole`) && msg.mentions.length === 0 && msg.member.permissions.has("banMembers")) {
    msg.channel.createMessage({ content: "```\nto add a role to a member just type\n '*addRole [role] [user]'\n```" })
  }

  if (msg.content.startsWith(`${prefix}removeRole`) && msg.mentions.length > 0 && msg.member.permissions.has("banMembers") && msg.roleMentions > 0) {
    const roleToRemove = msg.roleMentions[0];
    const userToRemoveRole = msg.mentions[0].id;
    bot.removeGuildMemberRole(msg.channel.guild.id, userToRemoveRole, roleToRemove)
      .then(removed => {
        bot.createMessage(msg.channel.id, "Role is now Removed")
      })
      .catch(err => console.log(err))
  }

  if (msg.content.startsWith(`${prefix}removeRole`) && msg.mentions.length === 0 && msg.member.permissions.has("banMembers")) {
    msg.channel.createMessage({ content: "```\nto remove a role just type\n'*removeRole [role] [user]'```", MessageReferenceID: msg.id })
  }
  
  if(msg.content.startsWith(`${prefix}apply`) && msg.member.permissions.has("banMembers")){
    
   const succesApply = {
     embed:{
       title:"LOOKING FOR INTERVIEWER", 
       description:"Hello Guys! Me and the Admins talked About Recruiting some Interviewer  in this Server, if you want to be an Interviewer just DM me or the other Admins.", 
       fields:[{
         name:"REQUIREMENTS", 
         value:"🟥 Full Name\n\n🟥 Age\n\n🟥 Location\n\n🟥 How often do you use a discord\n\n🟥 Your reason on why do you want to Apply as an Interviewer in this Server"
       }], 
       color:0xff0000,
       footer:{
         text:"CHILL HOUSE"
       }
     }
   }
   
  bot.createMessage(msg.channel.id,succesApply)
  }
})

bot.on("messageReactionAdd", (msg, emoji, reactor) => {
  if (emoji.name === "gta_v" && msg.channel.id === "887161392988311612") {
    bot.addGuildMemberRole(msg.channel.guild.id, reactor.id, "895306958414970951")
  }

  if (emoji.name === "gta_SA" && msg.channel.id === "887161392988311612") {
    bot.addGuildMemberRole(msg.channel.guild.id, reactor.id, "895307121653059654")
  }

})

bot.on("messageReactionRemove", (msg, emoji, userId) => {
  if (emoji.name === "gta_v" && msg.channel.id === "887161392988311612") {
    bot.removeGuildMemberRole(msg.channel.guild.id, userId, "895306958414970951")
  }

  if (emoji.name === "gta_SA" && msg.channel.id === "887161392988311612") {
    bot.removeGuildMemberRole(msg.channel.guild.id, userId, "895307121653059654")
  }
})

bot.connect();