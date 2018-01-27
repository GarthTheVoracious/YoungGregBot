const Discord = require("discord.js");

/* This command tells you what all the basic commands for the bot are */

module.exports.run = async (bot, message, args) => {
  let helpembed = new Discord.RichEmbed()//Store an embed
  .setDescription("__**Commands**__")//Embed details
  .setColor("#ff0000")//Embed details
  .addField("~serverinfo", "Tells you information about the server you are in.")//Embed details
  .addField("~botinfo", "Tells you all about me! The bot!")//Embed details
  .addField("~tempmute", "Mute anyone without the Admin permission for a specified period of time.")//Embed details
  .addField("~report", "Report a misbehaving member to the staff.")//Embed details
  .addField("~kick", "Kick someone from the server. **STAFF ONLY!**")//Embed details
  .addField("~ban", "Ban someone from the server. **STAFF ONLY!**")//Embed details
  .addField("~commands", "Tells you what all of the basic commands are and what they do.");//Embed details
  message.channel.send(helpembed);//Send the embeded message to the current text channel the command sender is
}

module.exports.help = {
  name: "commands"//Name of the command for discord. Example, !commands
}
