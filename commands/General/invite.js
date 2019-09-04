const Command = require("../../structures/Command.js"),
Discord = require("discord.js");

class Invite extends Command {

    constructor (client) {
        super(client, {
            // The name of the command
            name: "invite",
            // Displayed in the help command
            description: (language) => language.get("INVITE_DESCRIPTION"),
            usage: (language) => language.get("INVITE_USAGE"),
            examples: (languages) => languages.get("INVITE_EXAMPLES"),
            // The name of the command folder, to detect the category
            dirname: __dirname,
            // Whether the command is enabled
            enabled: true,
            // The command aliases
            aliases: [ "add" ],
            // The required permissions (for the bot) to execute the command
            clientPermissions: [ "EMBED_LINKS" ],
            // The level required to execute the command
            permLevel: "User",
            // The command cooldown
            cooldown: 2000
        });
    }

    async run (message, args, utils) {
        var embed = new Discord.RichEmbed()
            .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL)
            .addField(message.language.get("INVITE_HEADERS")[0], await this.client.generateInvite(2146958847))
            .addField(message.language.get("INVITE_HEADERS")[1], "https://discord.gg/Vu4tb4t")
            .setColor(utils.embed.color)
            .setFooter(utils.embed.footer);

        message.channel.send(embed);
    }

}

module.exports = Invite;