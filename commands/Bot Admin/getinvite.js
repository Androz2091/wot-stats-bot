const Command = require("../../structures/Command.js"),
Discord = require("discord.js");

class getInvite extends Command {

    constructor (client) {
        super(client, {
            // The name of the command
            name: "getinvite",
            // Displayed in the help command
            description: (language) => language.get("GETINVITE_DESCRIPTION"),
            usage: (language) => language.get("GETINVITE_USAGE"),
            examples: (languages) => languages.get("GETINVITE_EXAMPLES"),
            // The name of the command folder, to detect the category
            dirname: __dirname,
            // Whether the command is enabled
            enabled: true,
            // The command aliases
            aliases: [],
            // The required permissions (for the bot) to execute the command
            clientPermissions: [ "EMBED_LINKS" ],
            // The level required to execute the command
            permLevel: "Mega",
            // The command cooldown
            cooldown: 2000
        });
    }

    async run (message, args, utils) {

        var ID = args[0];
        if(!ID){
            return message.channel.send(message.language.get("GETINVITE_MISSING_ID"));
        }

        // try to get the guild
        var guild = this.client.guilds.cache.get(ID);
        // if the guild isn't found
        if(!guild){
            return message.channel.send(message.language.get("GETINVITE_GUILD_NOT_FOUND", ID));
        }

        this.client.functions.getInviteURL(guild, {maxAge:0}).then((invite) => {
            message.delete();
            return message.author.send(invite);
        }).catch((err) => {
            return message.channel.send(message.language.get("AN_ERROR_OCCURENCED"));
        });
    }

};

module.exports = getInvite;