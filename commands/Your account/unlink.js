const Command = require("../../structures/Command.js"),
Discord = require("discord.js");

class Unlink extends Command {

    constructor (client) {
        super(client, {
            // The name of the command
            name: "unlink",
            // Displayed in the help command
            description: (language) => language.get("UNLINK_DESCRIPTION"),
            usage: (language) => language.get("UNLINK_USAGE"),
            examples: (languages) => languages.get("UNLINK_EXAMPLES"),
            // The name of the command folder, to detect the category
            dirname: __dirname,
            // Whether the command is enabled
            enabled: true,
            // The command aliases
            aliases: [],
            // The required permissions (for the bot) to execute the command
            clientPermissions: [ "EMBED_LINKS" ],
            // The level required to execute the command
            permLevel: "User",
            // The command cooldown
            cooldown: 2000
        });
    }

    async run (message, args, utils) {

        // if an account is already linked
        if(utils.usersData[0].wot === "unknow"){
            return message.channel.send(message.language.get("NOT_LINKED"));
        }

        // Updates datastructures
        this.client.databases[0].set(message.author.id+".wot", "unknow");

        // Send a success message
        message.channel.send(message.language.get("UNLINK_SUCCESS"));
        
    }

}

module.exports = Unlink;