const Command = require("../../structures/Command.js"),
Discord = require("discord.js");

class Infos extends Command {

    constructor (client) {
        super(client, {
            // The name of the command
            name: "infos",
            // Displayed in the help command
            description: (language) => language.get("INFOS_DESCRIPTION"),
            usage: (language) => language.get("INFOS_USAGE"),
            examples: (languages) => languages.get("INFOS_EXAMPLES"),
            // The name of the command folder, to detect the category
            dirname: __dirname,
            // Whether the command is enabled
            enabled: true,
            // The command aliases
            aliases: [ "info" ],
            // The required permissions (for the bot) to execute the command
            clientPermissions: [ "EMBED_LINKS" ],
            // The level required to execute the command
            permLevel: "User",
            // The command cooldown
            cooldown: 2000
        });
    }

    async run (message, args, utils) {

        const infosHeaders = message.language.get("INFOS_HEADERS", this.client);

        let guildsCounts = await this.client.shard.fetchClientValues("guilds.cache.size");
        let guildsCount = guildsCounts.reduce((p, count) => p+count);
        let usersCounts = await this.client.shard.fetchClientValues("users.cache.size");
        let usersCount = usersCounts.reduce((p, count) => p+count);
        
        let results = await this.client.shard.broadcastEval(`
            [
                Math.round((process.memoryUsage().heapUsed / 1024 / 1024)),
                this.guilds.cache.size,
                this.shard.ids[0],
                Math.round(this.ws.ping)
            ]
        `);

        let embed = new Discord.MessageEmbed()
            .setColor(utils.embed.color)
            .setFooter(utils.embed.footer)
            .setAuthor(infosHeaders[0]+this.client.user.tag)

            .setDescription(this.client.user.username+message.language.get("INFOS_HEADERS")[1])        

            .addField(infosHeaders[2], 
                message.language.get("INFOS_FIELDS", null, guildsCount, usersCount)[0]
            , true)
            .addField(infosHeaders[3], 
                "`Discord.js: v"+Discord.version+"`\n`Nodejs: v"+process.versions.node+"`"
            , true)
            .addField(infosHeaders[6],
                message.language.get("INFOS_FIELDS", "https://discord.gg/Vu4tb4t")[2]
            )
            .addBlankField();
            let emojis = this.client.config.emojis;
            results.forEach((shard) => {
                let title = this.client.shard.ids.includes(shard[2]) ? emojis.online+" Shard ("+message.language.get("CURRENT")+") #"+(shard[2]+1) : emojis.dnd+" Shard #"+(shard[2]+1);
                embed.addField(title, message.language.get("FORMAT_SHARD", shard), true);
            });


            message.channel.send(embed);
        
    }

}

module.exports = Infos;