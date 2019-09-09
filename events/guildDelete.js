
const Discord = require("discord.js");

module.exports = class {
    constructor (client) {
      this.client = client;
    }
    
    async run (guild) {
        
        let usersCount = guild.members.filter((m) => !m.user.bot).size,
        botsCount = guild.members.filter((m) => m.user.bot).size;

        // Sends log embed in the logs channel
        let embed = JSON.stringify(new Discord.RichEmbed()
            .setAuthor(guild.name, guild.iconURL)
            .setColor("#B22222")
            .setDescription("Quelqu'un m'a expulsé de **"+guild.name+"** avec **"+usersCount+"** membres (et "+botsCount+" bots)"));

        client.shard.broadcastEval(`
            let embed = JSON.parse('${embed}');
            let channel = this.channels.get(this.config.supportGuild.serversLogs);
            if(channel){
                channel.send({ embed });
                true;
            } else false;
        `);
    }
};