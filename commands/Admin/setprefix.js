const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class SetPrefix extends Command {

    constructor (client) {
        super(client, {
            name: "setprefix",
            description: (language) => language.get("SETPREFIX_DESCRIPTION"),
            usage: "setprefix [prefix]",
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            examples: "$setprefix !",
            owner: false
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