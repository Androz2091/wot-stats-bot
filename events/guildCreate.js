const Discord = require("discord.js");

module.exports = class {
    constructor (client) {
      this.client = client;
    }
    
    async run (guild) {
        
        let usersCount = guild.members.cache.filter((m) => !m.user.bot).size,
        botsCount = guild.members.cache.filter((m) => m.user.bot).size;

        // Sends log embed in the logs channel
        let embed = JSON.stringify(new Discord.MessageEmbed()
            .setAuthor(guild.name, guild.iconURL())
            .setColor("#32CD32")
            .setDescription("**"+guild.name+"**, avec **"+usersCount+"** membres et "+botsCount+" bots"));
        
        this.client.shard.broadcastEval(`
            let embed = JSON.parse('${embed}');
            let channel = this.channels.cache.get(this.config.supportGuild.serversLogs);
            if(channel){
                channel.send({ embed });
                true;
            } else false;
        `);

        if(!guild.owner && new Date(guild.me.joinedTimestamp).getDate() === new Date().getDate()) return;
        const thxEmbed = new Discord.MessageEmbed()
        .setDescription("Hello ! Thank you for adding the WoT Stats bot to your server "+guild.name+".\r\nWorld of Tanks Stats is the only Discord bot allowing you to access your WoT stats from Discord !\r\n\r\nThe list of commands is available by typing \"w!help\" on your server.\r\n\r\nFinally, if you want to be kept informed of the next bot updates, join this server ! \"https:\/\/discord.gg\/QwtPjmQ\".")
        .setColor("#FF0000");
        guild.owner.send(thxEmbed);
    }
};