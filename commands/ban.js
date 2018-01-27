const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0])); //The user you want to ban
  if (!bUser) return message.channel.send("Can't find user!");//If your bot cant find the user you want to ban, say this...
  let bReason = args.join(" ").slice(22);//You must have a reason why you wanted to ban that person.
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("No can do pal!");//If a member tries to ban someone without a certain permission, send a message that says they can't ban them
  if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be banned!");//If the user you want to ban has a certain permission, send a message saying they cant be banned

  let banEmbed = new Discord.RichEmbed()//When you ban someone, send an embeded message with the ban details
  .setDescription("~Ban~")//The title of the embed
  .setColor("#ff0000")//the color of the embed; change this if you want :)
  .addField("Banned User", `${bUser} with ID ${bUser.id}`)//The user that was banned
  .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)//Who was the user banned by?
  .addField("Banned In", message.channel)//What channel was the user banned in?
  .addField("Time", message.createdAt)//When was the user banned?
  .addField("Reason", bReason);//Why was the user banned?

  let banChannel = message.guild.channels.find(`name`, "example-kicks-and-bans-channel");//Change the "example-kicks-and-bans-channel" to the channel where you want all of the embeds to go.
  if (!banChannel) return message.channel.send("Cand find the server's kicks and bans channel!");//If the bot can't find the kicks and bans chanel, tell the user

  message.guild.member(bUser).ban(bReason);//Tells the bot to ban the specified user
  banChannel.send(banEmbed);//Send the embeded ban message and details to the specified kicks and bans channel
}

module.exports.help = {
  name: "ban"//This is the name of the command for discord. Example, !ban
}
