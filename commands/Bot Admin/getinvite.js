const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class getInvite extends Command {

    constructor (client) {
        super(client, {
            name: "getinvite",
            description: (language) => language.get("GETINVITE_DESCRIPTION"),
            usage: "getinvite [ID]",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            examples: "$getinvite 467749941658517514",
            adminOnly: true
        });
    }

    async run (message, args, utils) {

        var ID = args[0];
        if(!ID) return message.channel.send(message.language.get("GETINVITE_MISSING_ID"));

        // try to get the guild
        var guild = this.client.guilds.get(ID);
        // if the guild isn't found
        if(!guild) return message.channel.send(message.language.get("GETINVITE_GUILD_NOT_FOUND", ID));

        this.client.functions.getInviteURL(guild, {maxAge:0}).then(invite => {
            message.delete();
            return message.author.send(invite);
        }).catch(err => {
            return message.channel.send(message.language.get("AN_ERROR_OCCURENCED"));
        });
        
    }

}

module.exports = getInvite;