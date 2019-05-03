const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Help extends Command {

    constructor (client) {
        super(client, {
            name: "help",
            description: (language) => language.get("HELP_DESCRIPTION"),
            usage: "help (command)",
            enabled: true,
            guildOnly: false,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            examples: "$help\n$help link",
            owner: false
        });
    }

    async run (message, args, membersdata, guild_data, data) {
        
        // Help command
        
    }

}

module.exports = Help;