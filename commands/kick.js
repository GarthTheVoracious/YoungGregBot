const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));//The user you want to kick
  if(!kUser) return message.channel.send("Can't find user!");//If the user you want to kick doesn't exist in your server, send a message saying so
  let kReason = args.join(" ").slice(22);//There must be a reason why you want to kick the person.
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");//If a member doesn't have a certain permission, they cant use the command
  if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");//If the member you want to kick has a certain permission, you cant kick them

  let kickEmbed = new Discord.RichEmbed()//creates an embeded message
  .setDescription("~Kick~")//Embed details
  .setColor("#e56b00")//Embed details
  .addField("Kicked User", `${kUser} with ID ${kUser.id}`)//Embed details
  .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)//Embed details
  .addField("Kicked In", message.channel)//Embed details
  .addField("Tiime", message.createdAt)//Embed details
  .addField("Reason", kReason);//Embed details

  let kickChannel = message.guild.channels.find(`name`, "example-kicks-and-bans-channel");//change the "example-kicks-and-bans-channel" to the channel you want all of the embeds to go.
  if(!kickChannel) return message.channel.send("Can't find incidents channel.");//If the bot cant find your kicks and bans channel, inform the user

  message.guild.member(kUser).kick(kReason);//Tells the bot to kick the specified user and send the embeded message
  kickChannel.send(kickEmbed);//Tells the bot to send the embeded message to the specified kicks and bans channel
}

module.exports.help = {
  name: "kick"//Name of the command for discord. Example, !kick
}
