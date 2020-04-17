const Command = require("../../structures/Command.js");

module.exports = class extends Command {

    constructor (client) {
        super(client, {
            // The name of the command
            name: "setprefix",
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

    async run (message, args) {
        
        // Gets the prefix
        const prefix = args[0];
        
        if(!prefix){
            return message.error("admin/setprefix:MISSING");
        } else {
            this.client.databases[1].set(message.guild.id+".prefix", prefix);
            return message.success("admin/setprefix:SUCCESS", prefix);
        }
        
    }

};
