  /* VIP RULES */
  /*if(msg.content === "*vip" && msg.author.id === "763635514158350356"){
    const vipRules ={
      embed:{
        title:"VIP Rules", 
        description:"ššŖš”ššØ\n\n\n\nš„ 1 ššš£š š«šš„ š”šš£š š©š¤š£š š¢šš š§šŖš”ššØ š£š š©š¤š, š¬šš”š ššš„šš© š£šš šš šš”šš¢ š šššš© š£š ššØš ššš©š¤ šØš ššš§š«šš§!!ac\n\n\n\nš„ 2 š„š¬ššš š£š®š¤š£š š„šš šŖšØšš„šš£ ššš©š¤ šØš ššš„ š§š¤š¤š¢ š®šŖš£š š¢šš š£šššššš£šš„ š£š ššØšØššŖš šØš š¢šš šššš£š ššš§š«šš§...\n\n\n\nš„ 3 ššš š®šŖš£š š¤š¬š£šš§ š¤š§ š®šŖš£š š¢šš šššš£š šØš©ššš šš® ššš£ššš®šš£ š šš®š¤ š£š šš§ššššš¤ š¤š§ š©ššØš , š„š”šØšØ ššš¬šš£ š£š®š¤ š ššØš šš¢š„š¤š§š©šš£š©š š®šŖš£ šššššš...\n\n\n\nš„ 4 šš š§ššØš„ššš©ššŖš” š©š¤ š¤š©ššš§šØ šš£š šš¤š£'š© šš š©š¤š­šš...\n\n\n\nš„ 5 ššŖš£š šØšš£š¤ š¢šš£ š£šš šØššš šØš šššš£š š¢šš¢ššš§ š šŖš£š š£šššššš£šš„ ššš©š¤, š š¬šš”š” ššš£ š®š¤šŖ šš¤š§ 24š...", color:0xff0000
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