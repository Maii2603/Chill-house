const Eris = require("eris");
const bot = new Eris(`Bot ${process.env.BOT_TOKEN}`,{
    intents: [
  "guilds",
  "guildMessages",
  "guildMessageReactions",
  "guildPresences",
  "guildMembers",
  "directMessages",
  "guildMembers",
  "guildBans"
  ]
});
const axios = require("axios");
const prefix = "*"

bot.on("ready", () => {
  console.log("bot is now ready");
  bot.editStatus("online", {
    name: "type *help to see the commands",
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
  if (msg.content.match(/^(hi)$|^(hello)$|^(welcome)$/ig)) {
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
  if(msg.content.match(swearMessages) && msg.member.permissions.has("banMembers") || msg.channel.id === "894443135818670092"){
    return;
  }
  if (msg.content.match(swearMessages)) {
    bot.deleteMessage(msg.channel.id, msg.id)
  }
  if(msg.content.length >= 200 && msg.member.permissions.has("banMembers") || msg.channel.id === "894443135818670092"){
    return;
  }
  if(msg.content.length >= 200 && msg.channel.id === "897078283471061052" || msg.content.length >= 200 && msg.channel.id === "898573321661210644"){
    return;
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
  if(msg.author.id === "276060004262477825" && msg.channel.id === "885734911187779585"){
    bot.createMessage(msg.channel.id,`<@&898390009210621962> Let's welcome our new member in <#885495865781944360>`)
  }
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
  
  /* VIP RULES */
  /*if(msg.content === "*vip" && msg.author.id === "763635514158350356"){
    const vipRules ={
      embed:{
        title:"VIP Rules", 
        description:"𝙍𝙪𝙡𝙚𝙨\n\n\n\n🟥 1 𝙋𝙖𝙣𝙜 𝙫𝙞𝙥 𝙡𝙖𝙣𝙜 𝙩𝙤𝙣𝙜 𝙢𝙜𝙖 𝙧𝙪𝙡𝙚𝙨 𝙣𝙖 𝙩𝙤𝙝, 𝙬𝙖𝙡𝙖 𝙙𝙖𝙥𝙖𝙩 𝙣𝙖𝙠𝙖𝙠𝙖𝙡𝙖𝙢 𝙠𝙖𝙝𝙞𝙩 𝙣𝙞 𝙞𝙨𝙖 𝙙𝙞𝙩𝙤 𝙨𝙖 𝙎𝙚𝙧𝙫𝙚𝙧!!ac\n\n\n\n🟥 2 𝙥𝙬𝙚𝙙𝙚 𝙣𝙮𝙤𝙣𝙜 𝙥𝙖𝙜 𝙪𝙨𝙖𝙥𝙖𝙣 𝙙𝙞𝙩𝙤 𝙨𝙖 𝙑𝙞𝙥 𝙧𝙤𝙤𝙢 𝙮𝙪𝙣𝙜 𝙢𝙜𝙖 𝙣𝙖𝙜𝙖𝙜𝙖𝙣𝙖𝙥 𝙣𝙖 𝙞𝙨𝙨𝙚𝙪𝙚 𝙨𝙖 𝙢𝙜𝙖 𝙞𝙗𝙖𝙣𝙜 𝙎𝙚𝙧𝙫𝙚𝙧...\n\n\n\n🟥 3 𝙋𝙖𝙜 𝙮𝙪𝙣𝙜 𝙤𝙬𝙣𝙚𝙧 𝙤𝙧 𝙮𝙪𝙣𝙜 𝙢𝙜𝙖 𝙞𝙗𝙖𝙣𝙜 𝙨𝙩𝙖𝙛𝙛 𝙖𝙮 𝙗𝙞𝙣𝙞𝙜𝙮𝙖𝙣 𝙠𝙖𝙮𝙤 𝙣𝙜 𝙏𝙧𝙖𝙗𝙖𝙝𝙤 𝙤𝙧 𝙩𝙖𝙨𝙠, 𝙥𝙡𝙨𝙨 𝙜𝙖𝙬𝙞𝙣 𝙣𝙮𝙤 𝙠𝙖𝙨𝙚 𝙞𝙢𝙥𝙤𝙧𝙩𝙖𝙣𝙩𝙚 𝙮𝙪𝙣 𝙃𝙚𝙝𝙚𝙝𝙚...\n\n\n\n🟥 4 𝙗𝙚 𝙧𝙚𝙨𝙥𝙚𝙘𝙩𝙛𝙪𝙡 𝙩𝙤 𝙤𝙩𝙝𝙚𝙧𝙨 𝙖𝙣𝙙 𝙙𝙤𝙣'𝙩 𝙗𝙚 𝙩𝙤𝙭𝙞𝙘...\n\n\n\n🟥 5 𝙆𝙪𝙣𝙜 𝙨𝙞𝙣𝙤 𝙢𝙖𝙣 𝙣𝙖𝙜 𝙨𝙖𝙗𝙚 𝙨𝙖 𝙞𝙗𝙖𝙣𝙜 𝙢𝙚𝙢𝙗𝙚𝙧 𝙠𝙪𝙣𝙜 𝙣𝙖𝙜𝙖𝙜𝙖𝙣𝙖𝙥 𝙙𝙞𝙩𝙤, 𝙞 𝙬𝙞𝙡𝙡 𝙗𝙖𝙣 𝙮𝙤𝙪 𝙛𝙤𝙧 24𝙝...", color:0xff0000
      }, 
    }
    bot.createMessage(msg.channel.id,vipRules)
  }*/
  
  if(msg.content === "*serverRules" && msg.author.id === "763635514158350356"){
    const serverRules = {
      embed:{
        title:"Server Rules (Section 1-General Server Rules)", 
        fields:[{
          name:"1.1", 
          value:"This server is a Filipino-based server, so please refrain from speaking in any other languages."
        },{
          name:"1.2",
          value:"Swearing and posting NSFW content is not allowed. Bypassing filters, using abbreviations/acronyms, or using the Discord spoiler feature to get your message across is also not allowed."
        },{
          name:"1.3",
          value:"Please be respectful to everyone on this server. Name-calling, harassing, and arguing, or causing unnecessary altercations is strictly prohibited."
        },{
          name:"1.4",
          value:"All forms of racist, discriminatory, and offensive jokes are not allowed."
        },{
          name:"1.5", 
          value:"Targeting someone in order to provoke them is forbidden. "
        },{
          name:"1.6", 
          value:"Pinging anyone without a valid reason is prohibited."
        },{
          name:"1.7",
          value:"Advertising/selling in the server and indirect messages is strictly forbidden. This includes groups, games, servers, social media accounts, etc. "
        },{
          name:"1.8",
          value:"Impersonation of other server members is not allowed and will result in an immediate ban."
        },{
          name:"1.9",
          value:"Posting private or identifying information (personal photos, addresses, real names, etc.) Unless about a particular server member or yourself is strictly prohibited and may result in a ban."
        },{
          name:"1.10", 
          value:"Listen to what moderators and administrators tell you. They have the final say when it comes to moderation."
        }], 
        color:0xff0000
      }
    }
    bot.createMessage(msg.channel.id,serverRules)
  }
  if(msg.content === "*serverRules2" && msg.author.id === "763635514158350356"){
    const secondCategory = {
      embed:{
        title:"Server Rules (Section 2 - Voice Channel Rules)", 
        fields:[{
          name:"2.1",
          value:"All general/chat rules apply to voice channels."
        },{
          name:"2.2",
          value:"Screaming through your mic or having too much background noise may cause you to be muted for some time."
        },{
          name:"2.3",
          value:"Playing music through your mic could result in you being kicked or muted."
        }], 
        color:0xff0000
      }
    }
    bot.createMessage(msg.channel.id,secondCategory)
  }
  if(msg.content === "*serverRules3" && msg.author.id === "763635514158350356"){
    const thirdCategory = {
      embed:{
        title:"Server Information",
        description:"On the 15th of September, Ashy started this server. Chill House is a fun community to be a part of. We hope it remains non-toxic and a safe environment for everyone..", 
        color:0xff0000
      }
    }
    bot.createMessage(msg.channel.id,thirdCategory)
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
  /* Gaming Roles

@PUBG Mobile Ping 
@Roblox Ping 
@Valorant Ping 
@League of Legends Ping 
@Axie Infinity Ping 
@COD Mobile Ping 
@Dota 2 Ping 
@Genshin Impact Ping 
@Grand Theft Auto V Ping 
@Grand Theft Auto San Andreas Ping 
@Minecraft Ping 
@Mobile Legends BB Ping 
@Pokemon Unite Ping*/
  if (msg.content.startsWith(`${prefix}gamingroles`) && msg.author.id === "763635514158350356"){
    const roleEmbed = {
      embed: {
        title: "GAMING ROLES",
        fields: [{
          name: `GTA V`,
          value: `<:gta_v:895142405265829899> | <@&895306958414970951>`
        }, {
          name: "GTA SAN ANDREAS",
          value: `<:gta_SA:895297858373300316> | <@&895307121653059654>`
        },{
          name:"MOBILE LEGENDS",
          value:"<:MLBB:889921096122515527> | <@&889922908569341983>"
        },{
          name:"VALORANT", 
          value:"<:valorant_logo:889921259012493372> | <@&889922818215669780>"
        },{
          name:"ROBLOX", 
          value:"<:Roblox:889921903769313352> | <@&890049588516503632>"
        },{
          name:"LEAGUE OF LEGENDS", 
          value:"<:bettermissingping:889919620289540126> | <@&889922633347498025>"
        },{
          name:"WILDRIFT", 
          value:"<:WildRift:889920375520124988> | <@&889922692805984257>"
        },{
          name:"CALL OF DUTY MOBILE", 
          value:"<:CODM:889920764428558437> | <@&889922862381678642>"
        },{
          name:"DOTA 2",
          value:"<:DOTA2:889925865192968272> | <@&889922748489547837>"
        },{
          name:"AXIE INFINITY", 
          value:"<:AxieInfinity:889921393884553247> | <@&889923058675105822>"
        },{
          name:"GENSHIN IMPACT", 
          value:"<:emoji_86:903278831991935088> | <@&889923119190536253>"
        },{
          name:"POKÉMON UNITE", 
          value:"<:Cat_sip:894497557026316290> | <@&895309063028604969>"
        }],
        color: 0xff0000
      }
    }
    bot.createMessage(msg.channel.id,roleEmbed)
  }
  
  if(msg.content.startsWith(`${prefix}pronounsRoles`) && msg.author.id === "763635514158350356"){
    const pronounsRoles = {
    embed:{
      title:"PRONOUNS", 
      fields:[{
        name:"SHE/HER", 
        value:"👱‍♀️ | <@&889871355732979763>"
      },{
        name:"HE/HIM", 
        value:"👨‍🦱 | <@&889871191324639282>"
      },{
        name:"THEY/THEM", 
        value:"👤 | <@&889871907745300521>"
      }], 
      color:0xff0000
     } 
    }
    bot.createMessage(msg.channel.id,pronounsRoles)
  }
  
  if(msg.content.startsWith(`${prefix}`))
  
  if(msg.content.startsWith(`${prefix}ageRoles`) && msg.author.id === "763635514158350356"){
    const ageRoles = {
      embed:{
        title:"AGE", 
        fields:[{
          name:"17-", 
          value:"🟥 | <@&889871195435044915>"
        },{
          name:"18+",
          value:"🟩 | <@&889870943642607616>"
        }], 
        color:0xff0000
      }
    }
    bot.createMessage(msg.channel.id,ageRoles)
  }
  
  if(msg.content.startsWith(`${prefix}locationRoles`) && msg.author.id === "763635514158350356"){
    const locationEmbed = {
      embed:{
        title:"LOCATION", 
        fields:[{
          name:"LUZON", 
          value:"🏙️ | <@&889913442444660796>"
        },{
          name:"VISAYAS", 
          value:"🌄 | <@&889914220362215434>"
        },{
          name:"MINDANAO", 
          value:"🏖️ | <@&889914300758646814>"
        }], 
        color:0xff0000
      }
    }
    bot.createMessage(msg.channel.id,locationEmbed)
  }
  
  if(msg.content.startsWith(`${prefix}optionalRoles`) && msg.author.id === "763635514158350356"){
    const optionalPing = {
      embed:{
        title:"OPTIONAL ROLES", 
        fields:[{
          name:"PARTNERSHIP PING", 
          value:"🤝 | <@&898387716050386985>"
        },{
          name:"CHAT REVIVE PING", 
          value:"❗| <@&899893543034839111>"
        },{
          name:"GIVEAWAY PING", 
          value:"🎁 | <@&903482470828228639>"
        },{
          name:"WELCOME PING", 
          value:"🎉 | <@&898390009210621962>"
        },{
          name:"EVENT PING", 
          value:"🎀 | <@&903482516013453333>"
        },{
          name:"MOVIE PING", 
          value:"🍿 | <@&899930374698848276>"
        }], 
        color:0xff0000
      }
    }
    bot.createMessage(msg.channel.id,optionalPing)
  }
  
  if(msg.content.startsWith(`${prefix}arcadeRoles`) && msg.author.id === "763635514158350356"){
    const arcadeEmbed = {
      embed:{
        title:"ARCADE ROLES", 
        fields:[{
          name:"ARCADE GAMES", 
          value:"🎮 | <@&889915918061297795>"
        },{
          name:"CASINO", 
          value:"🎰 | <@&899699491958063124>"
        }], 
        color:0xff0000
      }
    }
    bot.createMessage(msg.channel.id,arcadeEmbed)
  }
  
  if(msg.content.startsWith(`${prefix}announcement`) && msg.author.id === "763635514158350356"){
    const announcementEmbed = {
      embed:{
        fields:[{
          title:"ANNOUNCEMENT", 
          name:"ANNOUNCEMENT PING", 
          value:"📢 | <@&904741121031286805>"
        }], 
        color:0xff0000
      }
    }
    bot.createMessage(msg.channel.id,announcementEmbed)
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
  
  if(msg.content.startsWith(`${prefix}partnership`) && msg.author.id === "763635514158350356"){
    const requirementsEmbed = {
      embed:{
        title:"REQUIREMENTS FOR PARTNERSHIP", 
        thumbnail:{
          url:"https://raw.githubusercontent.com/Maii2603/chill-house-images/main/standard%20(1).gif"
        }, 
        description:"• Must have 250 members above\n- Must have the certain amount of people who is active & bots must be excluded in the member count.\n\n• Friendly for any types of people & Nsfw\n- Must be friendly and no bad things in your server and if we saw one we will cancel our partnership with you.\n\n• Follow our Event or Give away Channels\n- Must follow our Event or Give away channels and we will do the same as you did.\n\n•Please dm our <@&896654701955788862> for partnerships", 
        image:{
          url:"https://media.discordapp.net/attachments/894877379619598346/903964767247544320/acf4e57bd778d573200d48ff9d52f5ae.gif"
        }, 
        color:0xff0000
      }
    }
    bot.createMessage(msg.channel.id,requirementsEmbed)
  }
  
})

bot.on("messageReactionAdd", (msg, emoji, reactor) => {
  if (emoji.name === "gta_v" && msg.channel.id === "887161392988311612") {
    bot.addGuildMemberRole(msg.channel.guild.id, reactor.id, "895306958414970951")
  }

  if (emoji.name === "gta_SA" && msg.channel.id === "887161392988311612") {
    bot.addGuildMemberRole(msg.channel.guild.id, reactor.id, "895307121653059654")
  }
  
  if (emoji.name === "MLBB" && msg.channel.id === "887161392988311612") {
    bot.addGuildMemberRole(msg.channel.guild.id, reactor.id, "889922908569341983")
  }

  if (emoji.name === "valorant_logo" && msg.channel.id === "887161392988311612") {
    bot.addGuildMemberRole(msg.channel.guild.id, reactor.id, "889922818215669780")
  } 
  
    if (emoji.name === "Roblox" && msg.channel.id === "887161392988311612") {
    bot.addGuildMemberRole(msg.channel.guild.id, reactor.id, "890049588516503632")
  }

  if (emoji.name === "bettermissingping" && msg.channel.id === "887161392988311612") {
    bot.addGuildMemberRole(msg.channel.guild.id, reactor.id, "889922633347498025")
  }
  
    if (emoji.name === "CODM" && msg.channel.id === "887161392988311612") {
    bot.addGuildMemberRole(msg.channel.guild.id, reactor.id, "889922862381678642")
  }

  if (emoji.name === "WildRift" && msg.channel.id === "887161392988311612") {
    bot.addGuildMemberRole(msg.channel.guild.id, reactor.id, "889922692805984257")
  }
  
    if (emoji.name === "DOTA2" && msg.channel.id === "887161392988311612") {
    bot.addGuildMemberRole(msg.channel.guild.id, reactor.id, "889922748489547837")
  }

  if (emoji.name === "AxieInfinity" && msg.channel.id === "887161392988311612") {
    bot.addGuildMemberRole(msg.channel.guild.id, reactor.id, "889923058675105822")
  }
  
    if (emoji.name === "Cat_sip" && msg.channel.id === "887161392988311612") {
    bot.addGuildMemberRole(msg.channel.guild.id, reactor.id, "895309063028604969")
  }

  if (emoji.name === "emoji_86" && msg.channel.id === "887161392988311612") {
    bot.addGuildMemberRole(msg.channel.guild.id, reactor.id, "889923119190536253")
  }
  
    if (emoji.name === "👱‍♀️" && msg.channel.id === "887161392988311612") {
    bot.addGuildMemberRole(msg.channel.guild.id, reactor.id, "889871355732979763")
  }

  if (emoji.name === "👨‍🦱" && msg.channel.id === "887161392988311612") {
    bot.addGuildMemberRole(msg.channel.guild.id, reactor.id, "889871191324639282")
  }
  
    if (emoji.name === "👤" && msg.channel.id === "887161392988311612") {
    bot.addGuildMemberRole(msg.channel.guild.id, reactor.id, "889871907745300521")
  }
  
    if (emoji.name === "🟥" && msg.channel.id === "887161392988311612") {
    bot.addGuildMemberRole(msg.channel.guild.id, reactor.id, "889871195435044915")
  }

  if (emoji.name === "🟩" && msg.channel.id === "887161392988311612") {
    bot.addGuildMemberRole(msg.channel.guild.id, reactor.id, "889870943642607616")
  }
  
  if (emoji.name === "🏙️" && msg.channel.id === "887161392988311612") {
    bot.addGuildMemberRole(msg.channel.guild.id, reactor.id, "889913442444660796")
  }

  if (emoji.name === "🌄" && msg.channel.id === "887161392988311612") {
    bot.addGuildMemberRole(msg.channel.guild.id, reactor.id, "889914220362215434")
  }
  
 if (emoji.name === "🏖️" && msg.channel.id === "887161392988311612") {
    bot.addGuildMemberRole(msg.channel.guild.id, reactor.id, "889914300758646814")
  }
  
   if (emoji.name === "🤝" && msg.channel.id === "887161392988311612") {
    bot.addGuildMemberRole(msg.channel.guild.id, reactor.id, "898387716050386985")
  }
  
 if (emoji.name === "❗" && msg.channel.id === "887161392988311612") {
    bot.addGuildMemberRole(msg.channel.guild.id, reactor.id, "899893543034839111")
  }
  
   if (emoji.name === "🎁" && msg.channel.id === "887161392988311612") {
    bot.addGuildMemberRole(msg.channel.guild.id, reactor.id, "903482470828228639")
  }
  
 if (emoji.name === "🎉" && msg.channel.id === "887161392988311612") {
    bot.addGuildMemberRole(msg.channel.guild.id, reactor.id, "898390009210621962")
  }
  
   if (emoji.name === "🎀" && msg.channel.id === "887161392988311612") {
    bot.addGuildMemberRole(msg.channel.guild.id, reactor.id, "903482516013453333")
  }
  
   if (emoji.name === "🎮" && msg.channel.id === "887161392988311612") {
    bot.addGuildMemberRole(msg.channel.guild.id, reactor.id, "889915918061297795")
  }
  
 if (emoji.name === "🎰" && msg.channel.id === "887161392988311612") {
    bot.addGuildMemberRole(msg.channel.guild.id, reactor.id, "899699491958063124")
  }
  
   if (emoji.name === "🍿" && msg.channel.id === "887161392988311612") {
    bot.addGuildMemberRole(msg.channel.guild.id, reactor.id, "899930374698848276")
  }
  
  if (emoji.name === "📢" && msg.channel.id === "887161392988311612") {
    bot.addGuildMemberRole(msg.channel.guild.id, reactor.id, "904741121031286805")
  }
})

bot.on("messageReactionRemove", (msg, emoji, reactor) => {
  /*if (emoji.name === "gta_v" && msg.channel.id === "887161392988311612") {
    bot.removeGuildMemberRole(msg.channel.guild.id, userId, "895306958414970951")
  }

  if (emoji.name === "gta_SA" && msg.channel.id === "887161392988311612") {
    bot.removeGuildMemberRole(msg.channel.guild.id, userId, "895307121653059654")
  }*/
    if (emoji.name === "gta_v" && msg.channel.id === "887161392988311612") {
    bot.removeGuildMemberRole(msg.channel.guild.id, reactor, "895306958414970951")
  }

  if (emoji.name === "gta_SA" && msg.channel.id === "887161392988311612") {
    bot.removeGuildMemberRole(msg.channel.guild.id, reactor, "895307121653059654")
  }
  
  if (emoji.name === "MLBB" && msg.channel.id === "887161392988311612") {
    bot.removeGuildMemberRole(msg.channel.guild.id, reactor, "889922908569341983")
  }

  if (emoji.name === "valorant_logo" && msg.channel.id === "887161392988311612") {
    bot.removeGuildMemberRole(msg.channel.guild.id, reactor, "889922818215669780")
  } 
  
    if (emoji.name === "Roblox" && msg.channel.id === "887161392988311612") {
    bot.removeGuildMemberRole(msg.channel.guild.id, reactor, "890049588516503632")
  }

  if (emoji.name === "bettermissingping" && msg.channel.id === "887161392988311612") {
    bot.removeGuildMemberRole(msg.channel.guild.id, reactor, "889922633347498025")
  }
  
    if (emoji.name === "CODM" && msg.channel.id === "887161392988311612") {
    bot.removeGuildMemberRole(msg.channel.guild.id, reactor, "889922862381678642")
  }

  if (emoji.name === "WildRift" && msg.channel.id === "887161392988311612") {
    bot.addGuildMemberRole(msg.channel.guild.id, reactor, "889922692805984257")
  }
  
    if (emoji.name === "DOTA2" && msg.channel.id === "887161392988311612") {
    bot.removeGuildMemberRole(msg.channel.guild.id, reactor, "889922748489547837")
  }

  if (emoji.name === "AxieInfinity" && msg.channel.id === "887161392988311612") {
    bot.removeGuildMemberRole(msg.channel.guild.id, reactor, "889923058675105822")
  }
  
    if (emoji.name === "Cat_sip" && msg.channel.id === "887161392988311612") {
    bot.removeGuildMemberRole(msg.channel.guild.id, reactor, "895309063028604969")
  }

  if (emoji.name === "emoji_86" && msg.channel.id === "887161392988311612") {
    bot.removeGuildMemberRole(msg.channel.guild.id, reactor, "889923119190536253")
  }
  
    if (emoji.name === "👱‍♀️" && msg.channel.id === "887161392988311612") {
    bot.removeGuildMemberRole(msg.channel.guild.id, reactor, "889871355732979763")
  }

  if (emoji.name === "👨‍🦱" && msg.channel.id === "887161392988311612") {
    bot.removeGuildMemberRole(msg.channel.guild.id, reactor, "889871191324639282")
  }
  
    if (emoji.name === "👤" && msg.channel.id === "887161392988311612") {
    bot.removeGuildMemberRole(msg.channel.guild.id, reactor, "889871907745300521")
  } 
      if (emoji.name === "🟥" && msg.channel.id === "887161392988311612") {
    bot.removeGuildMemberRole(msg.channel.guild.id, reactor, "889871195435044915")
  }

  if (emoji.name === "🟩" && msg.channel.id === "887161392988311612") {
    bot.removeGuildMemberRole(msg.channel.guild.id, reactor, "889870943642607616")
  }
  
   if (emoji.name === "🌄" && msg.channel.id === "887161392988311612") {
    bot.removeGuildMemberRole(msg.channel.guild.id, reactor, "889914220362215434")
  }
  
 if (emoji.name === "🏖️" && msg.channel.id === "887161392988311612") {
    bot.removeGuildMemberRole(msg.channel.guild.id, reactor, "889914300758646814")
  }
  
   if (emoji.name === "🤝" && msg.channel.id === "887161392988311612") {
    bot.removeGuildMemberRole(msg.channel.guild.id, reactor, "898387716050386985")
  }
  
 if (emoji.name === "❗" && msg.channel.id === "887161392988311612") {
    bot.removeGuildMemberRole(msg.channel.guild.id, reactor, "899893543034839111")
  }
  
   if (emoji.name === "🎁" && msg.channel.id === "887161392988311612") {
    bot.removeGuildMemberRole(msg.channel.guild.id, reactor, "903482470828228639")
  }
  
 if (emoji.name === "🎉" && msg.channel.id === "887161392988311612") {
    bot.removeGuildMemberRole(msg.channel.guild.id, reactor, "898390009210621962")
  }
  
   if (emoji.name === "🎀" && msg.channel.id === "887161392988311612") {
    bot.removeGuildMemberRole(msg.channel.guild.id, reactor, "903482516013453333")
  }
  
  if (emoji.name === "🎮" && msg.channel.id === "887161392988311612") {
    bot.removeGuildMemberRole(msg.channel.guild.id, reactor, "889915918061297795")
  }
  
 if (emoji.name === "🎰" && msg.channel.id === "887161392988311612") {
    bot.removeGuildMemberRole(msg.channel.guild.id, reactor, "899699491958063124")
  }
  
 if (emoji.name === "🍿" && msg.channel.id === "887161392988311612") {
    bot.removeGuildMemberRole(msg.channel.guild.id, reactor, "899930374698848276")
  }
  
  if (emoji.name === "📢" && msg.channel.id === "887161392988311612") {
    bot.removeGuildMemberRole(msg.channel.guild.id, reactor, "904741121031286805")
  }
})

/*bot.on("guildMemberAdd",(guild,member) => {
 const welcomeEmbed = {
   embed:{
     author:{
       name:`${member.username}#${member.discriminator}`, 
       icon_url:member.avatarURL
     }, 
     thumbnail:{
       url:guild.iconURL
     },
     description:`<@${member.id}> Welcome to ${guild.name}\nEnjoy your stay here and have fun talking with us in <#885495865781944360> or join us in VC`, 
     fields:[{
       name:"RULES", 
       value:"<a:emoji_1:906996043051303034> Read the server rules in <#886591125866049597>"
     },{
       name:"ROLES", 
       value:"<a:emoji_1:906996043051303034> Get your roles in <#887161392988311612>"
     },{
       name:"INTRODUCTION", 
       value:"<a:emoji_1:906996043051303034> Introduce yourself in <#898573321661210644>"
     }], 
     image:{
       url:"https://raw.githubusercontent.com/Maii2603/chill-house-images/main/GlowingPurpleLine-1-1.gif"
     }, 
     color:0xff0000
   }
 }
 bot.createMessage("885495865781944360",welcomeEmbed)
})*/

bot.connect();