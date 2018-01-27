const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let bicon = bot.user.displayAvatarURL; //This variable stores the bot's avatar
  let botembed = new Discord.RichEmbed()//Send an embeded message when the command is run
  .setDescription("-----" + "__**Bot Information**__" + "-----")//Embed details
  .setColor("#ff0000")//Embed details
  .setThumbnail(bicon)//Embed details
  .addField("Bot Name", bot.user.username)//Embed details
  .addField("Created On", bot.user.createdAt);//Embed details
  message.channel.send(botembed);//Send the embed to the current text channel the command sender is in
}

module.exports.help = {
  name: "botinfo"//Name of the command for discord. Example, !botinfo
}
