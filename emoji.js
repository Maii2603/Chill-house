function staticEmojis(msg,bot,title,state){
  const getStaticEmojis = msg.channel.guild.emojis;
  const filterStaticEmojis = getStaticEmojis.filter(emojis => emojis.animated === state);
  let emojiS = filterStaticEmojis.map(emojis => {
    if(emojis.animated === true){
     // console.log(`a:${emojis.name}:${emojis.id}`)
      return `${emojis.name}:${emojis.id}`
    }
    if(emojis.animated === false){
     // console.log(`<:${emojis.name}:${emojis.id}>`)
      return `${emojis.name}:${emojis.id}`
    }
  });
  emojiS = emojiS.join(" ");
  
  const embedStaticEmojis = {
    embed:{
      title:title, 
      description:emojiS, 
      color:0xff0000
    }
  }
  bot.createMessage(msg.channel.id,embedStaticEmojis)
}


function getEmoji(msg,bot,prefix){
  if(msg.content === `${prefix}static-emojis`){
    staticEmojis(msg,bot,"STATIC EMOJIS",false)
  }
  if(msg.content ===`${prefix}animated-emojis`){
    staticEmojis(msg,bot,"ANIMATED EMOJIS",true)
  }
}

module.exports = getEmoji