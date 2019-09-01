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

        var stats_headers = message.language.get("INFOS_HEADERS", this.client);

        var embed = new Discord.RichEmbed()
            .setColor(utils.embed.color)
            .setFooter(utils.embed.footer)
            .setAuthor(message.language.get("INFOS_HEADERS")[0]+this.client.user.tag)

            .setDescription(this.client.user.username+message.language.get("INFOS_HEADERS")[1])

            .addField(message.language.get("INFOS_HEADERS", this.client)[2], 
                message.language.get("INFOS_FIELDS", null, this.client.guilds.size, this.client.users.size)[0]
            , true)
            .addField(message.language.get("INFOS_HEADERS", this.client)[3], 
                "`Discord.js: v"+Discord.version+"`\n`Nodejs: v"+process.versions.node+"`"
            , true)
            .addField(message.language.get("INFOS_HEADERS", this.client)[4], 
                "`"+(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)+"MB`"
            ,true)
            .addField(message.language.get("INFOS_HEADERS", this.client)[5], 
                message.language.get("INFOS_FIELDS", message.language.convertMs(this.client.uptime))[1]
            )
            .addField(message.language.get("INFOS_HEADERS", this.client)[6],
                message.language.get("INFOS_FIELDS", await this.client.functions.getInviteURL(this.client.guilds.get(this.client.config.supportGuild.ID), {maxAge:0}, this.client))[2]
            );


            message.channel.send(embed);
        
    }

}

module.exports = Infos;