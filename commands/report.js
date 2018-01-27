const Discord = require("discord.js");

/* This command lets members report users that are misbehaving */

module.exports.run = async (bot, message, args) => {
  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));//The user you want to report
  let reason = args.join(" ").slice(22);//Reason why you want to report the person
  if(!rUser) return message.channel.send("Couldn't find user.");//If the user doesn't exist, send a message

  let reportEmbed = new Discord.RichEmbed()//Embeded Message
  .setDescription("Reports")//Embed details
  .setColor("#01bfbf")//Embed details
  .addField("Reported User", `${rUser} with ID: ${rUser.id}`)//Embed details
  .addField("Reported By", `${message.author} with ID: ${message.author.id}`)//Embed details
  .addField("Channel", message.channel)//Embed details
  .addField("Time", message.createdAt)//Embed details
  .addField("Reason", reason);//Embed details

  let reportsChannel = message.guild.channels.find(`name`, "example-reported-users-channel");//Change the "example-reported-users-channel" to the channel you want the embeded message to go
  if(!reportsChannel) return message.channel.send("Couldn't find reports channel.");//If the bot cant find the reported users channel, notify the user

  message.delete().catch(O_o=>{});//Delete the "!report @exampleUser reason" message right after you send it
  reportsChannel.send(reportEmbed);//Tells the bot to send the embeded message to specified reported users channel
}

module.exports.help = {
  name: "report"//Name of the command for discord. Example: !report
}
