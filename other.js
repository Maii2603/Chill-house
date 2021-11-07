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