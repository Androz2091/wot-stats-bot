const Command = require("../../structures/Command.js");

module.exports = class extends Command {

    constructor (client) {
        super(client, {
            // The name of the command
            name: "unlink",
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

        // if an account is already linked
        if(utils.usersData[0].wot === "unknow"){
            return message.error("account/unlink:NOT_LINKED");
        }

        // Updates datastructures
        this.client.databases[0].set(message.author.id+".wot", "unknow");

        // Send a success message
        message.success("account/unlink:SUCCESS");
        
    }

};
