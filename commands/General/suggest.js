const Command = require("../../structures/Command.js"),
Discord = require("discord.js");

class Suggest extends Command {

    constructor (client) {
        super(client, {
            // The name of the command
            name: "suggest",
            // Displayed in the help command
            description: (language) => language.get("SUGGEST_DESCRIPTION"),
            usage: (language) => language.get("SUGGEST_USAGE"),
            examples: (languages) => languages.get("SUGGEST_EXAMPLES"),
            // The name of the command folder, to detect the category
            dirname: __dirname,
            // Whether the command is enabled
            enabled: true,
            // The command aliases
            aliases: [ "sugg", "suggestion" ],
            // The required permissions (for the bot) to execute the command
            clientPermissions: [ "EMBED_LINKS" ],
            // The level required to execute the command
            permLevel: "User",
            // The command cooldown
            cooldown: 2000
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