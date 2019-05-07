const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Suggest extends Command {

    constructor (client) {
        super(client, {
            name: "suggest",
            description: (language) => language.get("SUGGEST_DESCRIPTION"),
            usage: "suggest [suggestion]",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            examples: "$suggest A new command",
            adminOnly: false
        });
    }

    async run (message, args, utils) {

        // Gets the suggestion
        var suggestion = args.join(' ');
        if(!suggestion) return message.channel.send(message.language.get("SUGGEST_MISSING_SUGGESTION"));

        var channel = this.client.channels.get(this.client.config.supportGuild.suggestions);

        var sugg_embed = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setDescription(suggestion)
            .setColor(utils.embed.color)
            .setFooter(utils.embed.footer)
            .setTimestamp();
        channel.send(sugg_embed).then(async msg => {
            await msg.react(this.client.emojis.find(e => e.name === "success"));
            await msg.react(this.client.emojis.find(e => e.name === "error"));
        });
        
        message.channel.send(message.language.get("SUGGEST_SUCCESS"));
    }

}

module.exports = Suggest;