const Command = require("../../structures/Command.js"),
Discord = require("discord.js");

module.exports = class extends Command {

    constructor (client) {
        super(client, {
            // The name of the command
            name: "invite",
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
        const embed = new Discord.MessageEmbed()
            .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL())
            .addField(message.translate("core/invite:TITLE_INVITE"), await this.client.generateInvite(2146958847))
            .addField(message.translate("core/invite:TITLE_SUPPORT"), "https://discord.gg/Vu4tb4t")
            .setColor(utils.embed.color)
            .setFooter(utils.embed.footer);

        message.channel.send(embed);
    }

};
