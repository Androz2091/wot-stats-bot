const Command = require("../../structures/Command.js"),
Discord = require("discord.js");

class Help extends Command {

    constructor (client) {
        super(client, {
            // The name of the command
            name: "help",
            // The name of the command folder, to detect the category
            dirname: __dirname,
            // Whether the command is enabled
            enabled: true,
            // The command aliases
            aliases: [ "aide" ],
            // The required permissions (for the bot) to execute the command
            clientPermissions: [ "EMBED_LINKS" ],
            // The level required to execute the command
            permLevel: "User",
            // The command cooldown
            cooldown: 2000
        });
    }

    async run (message, args, utils) {
        
        // if the user wants the help of a specific command
        if(args[0]){
            const cmd = this.client.commands.get(args[0]) || this.client.commands.get(this.client.aliases.get(args[0]));
            if(cmd){
                const commandEmbed = new Discord.MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .addField(message.translate("core/help:TITLE_CATEGORY"), cmd.help.category, true)
                    .addField(message.translate("core/help:TITLE_ALIAS"), cmd.conf.aliases.length > 0 ? cmd.conf.aliases.map((a) => "`"+a+"`").join(", ") : message.language.get("HELP_NO_ALIASES"), true)
                    .addField(message.translate("core/help:TITLE_USAGE"), utils.guildData.prefix+message.translate(`${cmd.help.category}/${cmd.help.name}:USAGE`), true)
                    .addField(message.translate("core/help:TITLE_EXAMPLES"), message.translate(`${cmd.help.category}/${cmd.help.name}:EXAMPLES`).replace(/[$_]/g, utils.guildData.prefix), true)
                    .addField(message.translate("core/help:TITLE_DESCRIPTION"), message.translate(`${cmd.help.category}/${cmd.help.name}:DESCRIPTION`))
                    .setColor(utils.embed.color)
                    .setFooter(utils.embed.footer);
                return message.channel.send(commandEmbed);
            } else {
                return message.error("core/help:COMMAND_NOT_FOUND", {
                    search: args[0]
                });
            }
        } else {
            const commandsEmbed = new Discord.MessageEmbed()
                .setAuthor(message.translate("core/help:TITLE", {
                    user: message.author.tag
                }), message.author.displayAvatarURL())
                .setDescription(message.translate("core/help:TIP"))
                .setColor(utils.embed.color)
                .setFooter(utils.embed.footer);
            
            // Gets an array of all categories
            let categories = [];
            this.client.commands.forEach((cmd) => {
                if(!categories.includes(cmd.help.category)){
                    if(cmd.help.category === "bot-admin" && !this.client.config.owners.includes(message.author.id)) return;
                    categories.push(cmd.help.category);
                }
            });
            categories.sort();

            // for each categroy, create a string and then add a field to the embed
            categories.forEach((cat) => {
                let category = "";
                let commands = this.client.commands.filter((cmd) => cmd.help.category === cat);
                commands.forEach((cmd) => {
                    category += "**"+utils.guildData.prefix+cmd.help.usage(message.language)+"** - "+cmd.help.description(message.language)+"\n";
                });
                commandsEmbed.addField(cat, category);
            });

            message.channel.send(commandsEmbed);
        }
    }

};

module.exports = Help;