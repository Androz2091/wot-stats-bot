const Command = require("../../structures/Command.js"),
Discord = require("discord.js");

class Setlang extends Command {

    constructor (client) {
        super(client, {
            // The name of the command
            name: "setlang",
            // Displayed in the help command
            description: (language) => language.get("SETLANG_DESCRIPTION"),
            usage: (language) => language.get("SETLANG_USAGE"),
            examples: (languages) => languages.get("SETLANG_EXAMPLES"),
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
        
        var lang = args[0];
        if(!lang || (lang !== "en" && lang !== "fr")){
            return message.channel.send(message.language.get("SETLANG_VALID_LANGUAGES"));
        }

        var tlang = new(require("../../languages/"+lang+".js"));

        message.channel.send(tlang.get("SETLANG_SUCCESS"));

        this.client.databases[1].set(message.guild.id+".lang", lang);
        
    }

}

module.exports = Setlang;