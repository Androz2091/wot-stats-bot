module.exports = class {
    constructor (client) {
      this.client = client;
    }
    
    async run (guild) {
        
        // Loads discord lib
        var Discord = require('discord.js');

        // Fetch the guild owner
        this.client.fetchUser(guild.ownerID).then(owner => {

            // Sends log embed in the logs channel
            var embed = new Discord.RichEmbed().setAuthor(guild.name, guild.iconURL).setColor("#B22222").setDescription("Someone has kicked me from **"+guild.name+"** with **"+guild.members.filter(m => !m.user.bot)+"** members (and "+guild.members.filter(m => m.user.bot)+" bots)");
            this.client.channels.get(this.client.config.supportGuild.serversLogs).send(embed);
        });

    }
}