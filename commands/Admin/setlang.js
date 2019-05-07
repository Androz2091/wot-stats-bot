const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Setlang extends Command {

    constructor (client) {
        super(client, {
            name: "setlang",
            description: (language) => language.get("SETLANG_DESCRIPTION"),
            usage: "setlang [fr/en]",
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [],
            permission: "MANAGE_GUILD",
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            examples: "$setlang fr\n$setlang en",
            adminOnly: false
        });
    }

    async run (message, args, utils) {
        
        var lang = args[0];
        if(!lang || (lang !== "en" && lang !== "fr")) return message.channel.send(message.language.get("SETLANG_VALID_LANGUAGES"));

        var tlang = new(require("../../languages/"+lang+".js"));

        message.channel.send(tlang.get("SETLANG_SUCCESS"));

        this.client.databases[1].set(message.guild.id+".lang", lang);
        
    }

}

module.exports = Setlang;