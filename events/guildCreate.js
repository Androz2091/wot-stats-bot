module.exports = class {
    constructor (client) {
      this.client = client;
    }
    
    async run (guild) {
        
        // Loads discord lib
        var Discord = require('discord.js');
        
        // Sends log embed in the logs channel
        var embed = new Discord.RichEmbed().setAuthor(guild.name, guild.iconURL).setColor("#32CD32").setDescription("I'm on a new server, **"+guild.name+"** with **"+guild.members.filter(m => !m.user.bot)+"** members (and "+guild.members.filter(m => m.user.bot)+" bots)");
        this.client.channels.get(this.client.config.supportGuild.serversLogs).send(embed);
    }
}  