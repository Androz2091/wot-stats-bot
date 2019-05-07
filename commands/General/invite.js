const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Invite extends Command {

    constructor (client) {
        super(client, {
            name: "invite",
            description: (language) => language.get("INVITE_DESCRIPTION"),
            usage: "invite",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            examples: "$invite",
            adminOnly: false
        });
    }

    async run (message, args, utils) {
        var embed = new Discord.RichEmbed()
            .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL)
            .addField(message.language.get("INVITE_HEADERS")[0], await this.client.generateInvite(2146958847))
            .addField(message.language.get("INVITE_HEADERS")[1], await this.client.functions.getInviteURL(this.client.guilds.get(this.client.config.supportGuild.ID), {maxAge:0}, this.client))
            .setColor(utils.embed.color)
            .setFooter(utils.embed.footer);

        message.channel.send(embed);
    }

}

module.exports = Invite;