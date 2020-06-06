const Command = require("../../structures/Command.js");
const languages = [
    {
        "name": "en-US",
        "aliases": [
            "english",
            "en"
        ]
    },
    {
        "name": "fr-FR",
        "aliases": [
            "french",
            "fr"
        ]
    },
    {
        "name": "de-DE",
        "aliases": [
            "german",
            "ge"
        ]
    }
];

module.exports = class extends Command {

    constructor (client) {
        super(client, {
            // The name of the command
            name: "setlang",
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
        
        const lang = args[0];
        if(!languages.some((language) => language.name === lang || language.aliases.includes(lang))){
            return message.error("admin/setlang:INVALID_LANGUAGE")
        }
        
        const languageName = languages.find((language) => language.name === lang || language.aliases.includes(lang)).name;
        message.guild.language = languageName;
        
        message.success("admin/setlang:SUCCESS");

        this.client.databases[1].set(message.guild.id+".lang", languageName);
        
    }

};
