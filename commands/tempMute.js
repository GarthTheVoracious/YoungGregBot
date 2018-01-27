const Discord = require("discord.js");
const ms = require("ms");

/* This command lets you temporarily mute someone who is being mean to others in Text Chat! */

module.exports.run = async (bot, message, args) => {
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));//The person you want to mute
  if (!tomute) return message.reply("Couldn't find user.");//If the bot cant find the target user, send a message
  if (tomute.hasPermission("ADMINISTRATOR")) return message.reply("Can't mute them!");//If the person you want to mute has a certain permission, you cant mute them
  let muterole = message.guild.roles.find(`name`, "muted");//Checks to see if there is a 'Mute' role
  if (!muterole) {//if the 'Mute' role doesn't exist, do the following
    try{//Try to:
      muterole = await message.guild.createRole({//Create the role
        name: "muted",//Name of the role, change this if you want
        color: "#2acd00",//Color of the role, change this if you want
        permissions:[]//Leave this blank
      })
      message.guild.channels.forEach(async (channel, id) => { //For each channel,
        await channel.overwritePermissions(muterole, {//Add the mute role to every text channel's channel's permissions,
          SEND_MESSAGES: false,//Set the 'Send Messages' permission to false,
          ADD_REACTIONS: false//and do the same for the 'Add Reactions' permission
        });
      });
    }catch(e){
      console.log(e.stack);//If the bot can't do the above, print an error message in the bot's console
    }
  }
  let mutetime = args[1]; //How long you want to mute the specified user for. Dont change this value!
  if (!mutetime) return message.reply("You didn't specify a time!");//If you forgot to specify a time, tell the user

  await(tomute.addRole(muterole.id));//Add the 'mute' role to the specified user.
  message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`); //Send a message telling you that you muted @User for x seconds, mins, hrs... :)

  setTimeout(function(){//When the time is up, do the following...
    tomute.removeRole(muterole.id);//Remoge the role from the muted user
    message.channel.send(`<@${tomute.id}> has been unmuted!`);//Send a message in chat that @User has been unmuted
  }, ms(mutetime));
}

module.exports.help = {
  name: "tempmute"//Name of the command for Discord. Example, !tempMute
}
