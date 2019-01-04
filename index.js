const Commando = require('discord.js-commando');
const discord = require('discord.js');
const bot = new Commando.Client();
const TOKEN = 'NTI5Nzk5MTcxMzAxOTY1ODI4.Dw7Kgw.iYjo-nHZyLGonNfaSx7-vm-bMfI'

bot.registry.registerGroup('simple', 'Simple');
bot.registry.registerGroup('music', 'Music');
bot.registry.registerGroup('team', 'Team');
bot.registry.registerGroup('mods', 'Mods');
bot.registry.registerGroup('image', 'Image');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');

global.currentTeamMembers = [];
global.servers = {};

bot.on('ready', function(){
    console.log("Ready");
    bot.user.setActivity('!commands | With Nicheen', {type: "PLAYING"});
});

bot.on("guildMemberAdd", function(member) {
    let welcomeEmbed = new discord.RichEmbed()
        .setTitle("Welcome " + member.user.username + "!")
        .setColor("#ff0000")
        .setField("This server might be trash but.. yes.. have fun with the shitposting.")
        .setField("Thanks for Joining The Other " + (member.guild.memberCount).toString() + " Of Us!")
        .setField("Sincerly your friend, Patrol.")
        if(member.user.avatarURL != null){
            welcomeEmbed.setImage(member.user.avatarURL);
        }
        else{
            welcomeEmbed.setImage(bot.user.displayAvatarURL);
        }
});

bot.on('guildMemberRemove', async member => {
    bot.send(member + ", it's a shame you had to leave us. We'll miss you :(");
})

bot.on('message', function(message){

	if(message.content == 'Hello')
	{
		message.channel.sendMessage('Hello' + message.author + ', how are you?');
	}
  else if(message.content == "What's the current team?")
  {
    var teamInfo = new discord.RichEmbed()
        .setTitle("Current Team Members")
    for(var i = 0; i < currentTeamMembers.length; i++)
    {
        teamInfo.addField("Member " + (i+1).toString(),currentTeamMembers[i].username);
    }
    message.channel.send(teamInfo);
  }
});

bot.login(TOKEN);