const botconfig = require("./botconfig.json");//Variable that stores the bots prefix and token
const Discord = require("discord.js");//Lets you program with discord.js
const fs = require("fs");//Helps read files
const bot = new Discord.Client({disableEveryone: true});//Variable that makes the bot work
bot.commands = new Discord.Collection();//Helps load the bot's commands

//Reads the command files and loads them
fs.readdir("./commands", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands");
    return;
  }

  //Loads the Command Files for the Bot
  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });

});


bot.on("ready", async () => { //When the bot is ready, do the things below
  console.log(`${bot.user.username} is online!`);//Tells you that the bot has successfully started
  bot.user.setActivity("Example Game", {type: "WATCHING"});//You can change what you bot is doing with this command! :D Types: STREAMING, WATCHING, PLAYING...
});

bot.on("message", async message => {//If a message is recieved, do the following...
  if(message.author.bot) return; //When the bot detects when IT sends a message, do nothing.
  if(message.channel.type === "dm") return; //If you try to directly send the bot a command, do nothing.

  //Bot Setup Variables
  let prefix = botconfig.prefix; //Gets the bot's prefix from the botconfig.json file
  let messageArray = message.content.split(" ");//Makes making commands easier
  let cmd = messageArray[0];//Use this to make new commands
  let args = messageArray.slice(1);//I forgot what this does.

  let commandFile = bot.commands.get(cmd.slice(prefix.length));//Matches the command files with their corresponding commands
  if (commandFile) commandFile.run(bot,message,args);//If a command is run, find its corresponding command file and run the code inside of it
});

bot.login(botconfig.token);//Helps the bot login to your server
