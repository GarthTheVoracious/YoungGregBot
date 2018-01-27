const Discord = require("discord.js");

/* This command tells you all about the server you are in! */

module.exports.run = async (bot, message, args) => {
  let sicon = message.guild.iconURL; //Gets the server icon
  let serverembed = new Discord.RichEmbed()//Stores an embeded message
  .setDescription("-----" + "__**Server Information**__" + "-----")//embed details
  .setColor("#ffd500")//embed details
  .setThumbnail(sicon)//embed details
  .addField("Server Name", message.guild.name)//embed details
  .addField("Created On", message.guild.createdAt)//embed details
  .addField("You Joined", message.member.joinedAt)//embed details
  .addField("Total Members", message.guild.memberCount - 4);//embed details
  message.channel.send(serverembed);//Send the embeded message to the current text channel the command sender is in.
}

module.exports.help = {
  name: "serverinfo"//Name of the command for discord. Example: !serverinfo
}
