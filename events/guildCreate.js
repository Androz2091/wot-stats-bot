module.exports = class {
    constructor (client) {
      this.client = client;
    }
    
    async run (guild) {
        
        // Loads discord lib
        var Discord = require("discord.js");
        
        // Sends log embed in the logs channel
        var embed = new Discord.RichEmbed().setAuthor(guild.name, guild.iconURL).setColor("#32CD32").setDescription("J'ai rejoint **"+guild.name+"**, avec **"+guild.members.filter((m) => !m.user.bot).size+"** membres (et "+guild.members.filter((m) => m.user.bot).size+" bots)");
        this.client.channels.get(this.client.config.supportGuild.serversLogs).send(embed);
        this.client.channels.get("569976810234707982").send(embed);
    }
};