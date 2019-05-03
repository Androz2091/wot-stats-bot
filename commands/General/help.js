const Command = require("../../base/Command.js"),
Discord = require('discord.js');

class Help extends Command {

    constructor (client) {
        super(client, {
            name: "help",
            description: (language) => language.get("HELP_DESCRIPTION"),
            usage: "help (command)",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            examples: "$help\n$help link",
            owner: false
        });
    }

    async run (message, args, utils) {
        
        // if the user wants the help of a specific command
        if(args[0]){
            var command = args[0];
            let cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));
            if(cmd){
                var embed = new Discord.RichEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL)
                    .addField(message.language.get("HELP_HEADERS")[0], cmd.help.category, true)
                    .addField(message.language.get("HELP_HEADERS")[1], cmd.conf.aliases.length > 0 ? cmd.conf.aliases.map(a => "`"+a+"`").join(", ") : message.language.get("HELP_NO_ALIASES"), true)
                    .addField(message.language.get("HELP_HEADERS")[2], utils.guildData.prefix+cmd.help.usage, true)
                    .addField(message.language.get("HELP_HEADERS")[3], cmd.help.examples.replace(/[$_]/g, utils.guildData.prefix), true)
                    .addField(message.language.get("HELP_HEADERS")[4], cmd.help.description(message.language))
                    .setColor(utils.embed.color)
                    .setFooter(utils.embed.footer);
                return message.channel.send(embed);
            } else {
                return message.channel.send(message.language.get("COMMAND_NOT_FOUND", command));
            }
        } else {
            var embed = new Discord.RichEmbed()
                .setAuthor(message.language.get("WELCOME")+", "+message.author.tag, message.author.displayAvatarURL)
                .setDescription(message.language.get("HELP_REMIND"))
                .setColor(utils.embed.color)
                .setFooter(utils.embed.footer)
            
            // Gets an array of all categories
            var categories = [];
            this.client.commands.forEach(cmd => {
                if(!categories.includes(cmd.help.category)){
                    if(cmd.help.category === 'Owner' && message.author.id !== this.client.config.owner) return;
                    categories.push(cmd.help.category);
                }
            });

            // for each categroy, create a string and then add a field to the embed
            categories.forEach(cat => {
                var category = '';
                var commands = this.client.commands.filter(cmd => cmd.help.category === cat);
                commands.forEach(cmd => {
                    category += "**"+utils.guildData.prefix+cmd.help.usage+"** - "+cmd.help.description(message.language)+"\n";
                });
                embed.addField(cat, category);
            });

            message.channel.send(embed);

        }
        
    }

}

module.exports = Help;