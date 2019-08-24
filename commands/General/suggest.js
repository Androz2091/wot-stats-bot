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
        var suggestion = args.join(" ");
        if(!suggestion){
            return message.channel.send(message.language.get("SUGGEST_MISSING_SUGGESTION"));
        }

        var channel = this.client.channels.get(this.client.config.supportGuild.suggestions);

        var suggEmbed = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setDescription(suggestion)
            .setColor(utils.embed.color)
            .setFooter(utils.embed.footer)
            .setTimestamp();
        channel.send(suggEmbed).then(async (msg) => {
            await msg.react(Discord.Util.parseEmoji(this.client.emojis.success).id);
            await msg.react(Discord.Util.parseEmoji(this.client.emojis.error).id);
            message.channel.send(message.language.get("SUGGEST_SUCCESS"));
        });
    }

};

module.exports = Suggest;