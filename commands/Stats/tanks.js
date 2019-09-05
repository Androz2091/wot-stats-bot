const Command = require("../../structures/Command.js"),
Discord = require("discord.js");

const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

class Tanks extends Command {

    constructor (client) {
        super(client, {
            // The name of the command
            name: "tanks",
            // Displayed in the help command
            description: (language) => language.get("TANKS_DESCRIPTION"),
            usage: (language) => language.get("TANKS_USAGE"),
            examples: (languages) => languages.get("TANKS_EXAMPLES"),
            // The name of the command folder, to detect the category
            dirname: __dirname,
            // Whether the command is enabled
            enabled: true,
            // The command aliases
            aliases: [ "tank" ],
            // The required permissions (for the bot) to execute the command
            clientPermissions: [ "EMBED_LINKS" ],
            // The level required to execute the command
            permLevel: "User",
            // The command cooldown
            cooldown: 2000
        });
    }

    async run (message, args, utils) {
        
        let client = this.client;

        let m = await message.channel.send(message.language.get("PLEASE_WAIT"));

        let userData;

        if(message.mentions.users.first()){
            if(utils.usersData[1].wot === "unknow"){
                return m.edit(message.language.get("NOT_LINKED_USER", message.mentions.users.first()));
            } else {
                userData = utils.usersData[1].wot;
            }
        } else if(args[0]){
            let realm = client.realms.find((r) => r.name === args[0].toLowerCase() || r.aliases.includes(args[0].toLowerCase()));
            if(!realm) return m.edit(message.language.get("LINK_BAD_REALM", args[0].toLowerCase()));
            if(!args[1]) return m.edit(message.language.get("VALID_NICKNAME"));
            userData = await client.Wargamer.findPlayer({ search: args.slice(1).join(" "), realm: args[0].toLowerCase() }).catch((err) => {
                return m.edit(message.language.get("ACCOUNT_NOT_FOUND", args.slice(1).join(" ")));
            });
        } else if(!args[0]){
            if(utils.usersData[0].wot === "unknow"){
                return m.edit(message.language.get("NOT_LINKED", utils.guildData.prefix));
            } else {
                userData = utils.usersData[0].wot;
            }
        }

        if(!userData) return;
        let stats = await client.Wargamer.getPlayerStats({ realm: userData.realm, ID: userData.ID }, true, true);
        let tanks = stats.tanks;

        let embed = new Discord.RichEmbed()
            .setColor(stats.wn8.color)
            .setFooter(utils.embed.footer, stats.realmData.iconURL)
            .setAuthor(stats.nickname, client.user.displayAvatarURL)
            .setDescription(message.language.get("TANKS_CHOOSE_TIER"));
        
        let msg = await m.edit(embed);
        let rCollector = msg.createReactionCollector((reaction, user) => user.id === message.author.id, { time: 60000 });
        
        await asyncForEach(client.config.emojis.numbers, async (emoji) => {
            await msg.react(Discord.Util.parseEmoji(emoji).id);
        });

        rCollector.on("end", (data, reason) => {
            msg.clearReactions();
            if(reason !== "OK"){
                embed.setTitle("").setDescription(message.language.get("TANKS_TIMEOUT"));
                msg.edit(embed);
            }
        });

        rCollector.on("collect", async (reaction) => {

            let users = await reaction.fetchUsers();
            if(!users.get(client.user.id)) return;
            
            rCollector.stop("OK");

            var tier = reaction._emoji.name.substr(4, reaction._emoji.name.length);
            var toDisplay = tanks.filter(t => t.tier === parseInt(tier, 10)).sort( (a, b) => b.mark_of_mastery - a.mark_of_mastery);
            if(toDisplay.length < 1){
                embed.setDescription(message.language.get("NO_TANKS", tier));
            } else {
                toDisplay.forEach(tank => {
                    var title = (tank.is_premium ? client.config.emojis.star+" "+tank.short_name : tank.short_name);
                    embed.addField(title,
                        message.language.get("TANKS_FIELDS")[0]+tank.statistics.battles+"\n"+
                        message.language.get("TANKS_FIELDS")[1]+tank.mark_of_mastery+"\n"+
                        message.language.get("TANKS_FIELDS")[2]+tank.nation,
                        true
                    );
                });
                embed.setDescription("");
            }
            msg.edit(embed);
        });
    }

};

module.exports = Tanks;