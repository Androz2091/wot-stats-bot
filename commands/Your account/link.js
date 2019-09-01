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
        
        var client = this.client;

        // if an account is already linked
        if(utils.usersData[0].wot !== "unknow"){
            return message.channel.send(message.language.get("LINK_ALREADY_LINKED", utils.guildData.prefix));
        }

        // if no nickname is provided
        if(!args[0]){
            return message.channel.send(message.language.get("LINK_NICKNAME"));
        }

        // Send a waiting message
        message.channel.send(message.language.get("LINK_SEARCH")).then((m) => {
            // Search all accounts
            this.client.functions.searchAccount(args[0], this.client).then((account) => {
                // if an account was found
                m.edit(message.language.get("LINK_SUCCESS", utils.guildData.prefix)); // edit the message
                // Updates datastructures
                return client.databases[0].set(message.author.id+".wot", account);
            }).catch((err) => {
                console.log(err)
                // if no account was found
                return m.edit(message.language.get("ACCOUNT_NOT_FOUND", args[0])); // edit the message
            });
        });
    }
    
};

module.exports = Link;