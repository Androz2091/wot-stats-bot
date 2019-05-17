const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Link extends Command {

    constructor (client) {
        super(client, {
            name: "link",
            description: (language) => language.get("LINK_DESCRIPTION"),
            usage: "link [nickname]",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            examples: "$link xxWotPlayerxx__",
            adminOnly: false
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
                // Updates database
                return client.databases[0].set(message.author.id+".wot", account);
            }).catch((err) => {
                // if no account was found
                return m.edit(message.language.get("ACCOUNT_NOT_FOUND", args[0])); // edit the message
            });
        });
    }
    
};

module.exports = Link;