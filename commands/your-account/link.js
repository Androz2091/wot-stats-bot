const Command = require("../../structures/Command.js"),
Discord = require("discord.js");

class Link extends Command {

    constructor (client) {
        super(client, {
            // The name of the command
            name: "link",
            // Displayed in the help command
            description: (language) => language.get("LINK_DESCRIPTION"),
            usage: (language) => language.get("LINK_USAGE"),
            examples: (languages) => languages.get("LINK_EXAMPLES"),
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
        
        let client = this.client;

        // if an account is already linked
        if(utils.usersData[0].wot !== "unknow"){
            return message.channel.send(message.language.get("LINK_ALREADY_LINKED", utils.guildData.prefix));
        }

        // if no realm is provided
        if(!args[0]){
            return message.channel.send(message.language.get("LINK_REALM"));
        }
        let realm = client.realms.find((r) => r.name === args[0] || r.aliases.includes(args[0]));
        if(!realm){
            return message.channel.send(message.language.get("LINK_BAD_REALM", args[0]));
        }

        // if no nickname is provided
        if(!args[1]){
            return message.channel.send(message.language.get("LINK_NICKNAME"));
        }

        let m = await message.channel.send(message.language.get("LINK_SEARCH"));
        
        client.Wargamer.findPlayer({ search: args.slice(1).join(" "), realm: args[0] }).then((player) => {
            m.edit(message.language.get("LINK_SUCCESS", utils.guildData.prefix));
            return client.databases[0].set(message.author.id+".wot", player);
        }).catch((err) => {
            return m.edit(message.language.get("ACCOUNT_NOT_FOUND", args.slice(1).join(" ")));
        });

    }
    
};

module.exports = Link;