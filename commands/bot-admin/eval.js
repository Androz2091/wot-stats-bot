const Command = require("../../structures/Command.js"),
Discord = require("discord.js");

class Eval extends Command {

    constructor (client) {
        super(client, {
            // The name of the command
            name: "eval",
            // Displayed in the help command
            description: (language) => language.get("EVAL_DESCRIPTION"),
            usage: (language) => language.get("EVAL_USAGE"),
            examples: (languages) => languages.get("EVAL_EXAMPLES"),
            // The name of the command folder, to detect the category
            dirname: __dirname,
            // Whether the command is enabled
            enabled: true,
            // The command aliases
            aliases: [],
            // The required permissions (for the bot) to execute the command
            clientPermissions: [ "EMBED_LINKS" ],
            // The level required to execute the command
            permLevel: "Mega",
            // The command cooldown
            cooldown: 2000
        });
    }

    async run (message, args, utils) {

        const content = message.content.split(" ").slice(1).join(" ");
        const result = new Promise((resolve, reject) => resolve(eval(content)));
        
        return result.then((output) => {
            if(typeof output !== "string"){
                output = require("util").inspect(output, { depth: 0 });
            }
            if(output.includes(message.client.token)){
                output = output.replace(message.client.token, "T0K3N");
            }
            message.channel.send(output, {
                code: "js"
            });
        }).catch((err) => {
            err = err.toString();
            if(err.includes(message.client.token)){
                err = err.replace(message.client.token, "T0K3N");
            }
            message.channel.send(err, {
                code: "js"
            });
        });
        
    }

};

module.exports = Eval;