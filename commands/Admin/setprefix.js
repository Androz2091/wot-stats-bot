const Command = require("../../structures/Command.js"),
Discord = require("discord.js");

class SetPrefix extends Command {

    constructor (client) {
        super(client, {
            // The name of the command
            name: "setprefix",
            // Displayed in the help command
            description: (language) => language.get("SETPREFIX_DESCRIPTION"),
            usage: (language) => language.get("SETPREFIX_USAGE"),
            examples: (languages) => languages.get("SETPREFIX_EXAMPLES"),
            // The name of the command folder, to detect the category
            dirname: __dirname,
            // Whether the command is enabled
            enabled: true,
            // The command aliases
            aliases: [],
            // The required permissions (for the bot) to execute the command
            clientPermissions: [ "EMBED_LINKS" ],
            // The level required to execute the command
            permLevel: "Admin",
            // The command cooldown
            cooldown: 2000
        });
    }

    async run (message, args, utils) {
        
        // Gets the prefix
        var prefix = args[0];
        
        if(!prefix){
            return message.channel.send(message.language.get("SETPREFIX_MISSING_PREFIX"));
        } else {
            this.client.databases[1].set(message.guild.id+".prefix", prefix);
            return message.channel.send(message.language.get("SETPREFIX_SUCCESS", prefix));
        }
        
    }

}

module.exports = SetPrefix;