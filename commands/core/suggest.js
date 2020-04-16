const Command = require("../../structures/Command.js"),
Discord = require("discord.js");

module.exports = class extends Command {

    constructor (client) {
        super(client, {
            // The name of the command
            name: "suggest",
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
        let suggestion = args.join(" ");
        if(!suggestion){
            return message.error("core/suggest:MISSING");
        }

        const suggEmbed = JSON.stringify(new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setDescription(suggestion)
            .setColor(utils.embed.color)
            .setFooter(utils.embed.footer)
            .setTimestamp());
        this.client.shard.broadcastEval(`
            let Discord = require("discord.js");
            let embed = JSON.parse('${suggEmbed}');
            let channel = this.channels.cache.get(this.config.supportGuild.suggestions);
            if(channel){
                channel.send('<@&618516606078943252>', { embed }).then(async (m) => {
                    await m.react(Discord.Util.parseEmoji(this.config.emojis.success).id);
                    await m.react(Discord.Util.parseEmoji(this.config.emojis.error).id);
                });
                true;
            } else false;
        `);
        message.success("core/suggest:SENT");
    }

};
