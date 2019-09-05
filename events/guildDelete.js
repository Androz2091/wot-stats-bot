
const Discord = require("discord.js");

module.exports = class {
    constructor (client) {
      this.client = client;
    }
    
    async run (guild) {
        
        let usersCount = guild.members.filter((m) => !m.user.bot).size,
        botsCount = guild.members.filter((m) => m.user.bot).size;

        // Sends log embed in the logs channel
        let embed = new Discord.RichEmbed()
            .setAuthor(guild.name, guild.iconURL)
            .setColor("#B22222")
            .setDescription("Quelqu'un m'a expulsé de **"+guild.name+"** avec **"+usersCount+"** membres (et "+botsCount+" bots)");
        let channel = this.client.channels.get(this.client.config.supportGuild.serversLogs);
        channel.send(embed);
    }
};