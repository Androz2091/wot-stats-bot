const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Unlink extends Command {

    constructor (client) {
        super(client, {
            name: "unlink",
            description: (language) => language.get("UNLINK_DESCRIPTION"),
            usage: "unlink",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            examples: "$unlink",
            adminOnly: false
        });
    }

    async run (message, args, utils) {

        // if an account is already linked
        if(utils.usersData[0].wot === "unknow"){
            return message.channel.send(message.language.get("NOT_LINKED"));
        }

        // Updates database
        this.client.databases[0].set(message.author.id+".wot", "unknow");

        // Send a success message
        message.channel.send(message.language.get("UNLINK_SUCCESS"));
        
    }

}

module.exports = Unlink;