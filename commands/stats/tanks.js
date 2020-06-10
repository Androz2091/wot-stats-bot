const Command = require("../../structures/Command.js"),
Discord = require("discord.js");

const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

module.exports = class extends Command {

    constructor (client) {
        super(client, {
            // The name of the command
            name: "tanks",
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

        let m = await message.sendT("misc:PLEASE_WAIT", null, false, null, "loading");

        let userData;

        if(message.mentions.users.first()){
            if(utils.usersData[1].wot === "unknow"){
                return m.error("account/unlink:NOT_LINKED_USER", {
                    user: message.mentions.users.first().tag
                }, true);
            } else {
                userData = utils.usersData[1].wot;
            }
        } else if(args[0]){
            let realm = client.realms.find((r) => r.name === args[0].toLowerCase() || r.aliases.includes(args[0].toLowerCase()));
            if(!realm) return m.error("account/link:INVALID_REALM", {
                realm: args[0].toLowerCase()
            }, true);
            if(!args[1]) return m.error("account/link:INVALID_NICKNAME", null, true);
            userData = await client.Wargamer.findPlayer({ search: args.slice(1).join(" "), realm: args[0].toLowerCase() }).catch(() => {});
            if(!userData){ 
                return m.error("account/link:ACCOUNT_NOT_FOUND", {
                    search: args.slice(1).join(" ")
                }, true);
            }
        } else if(!args[0]){
            if(utils.usersData[0].wot === "unknow"){
                return m.error("account/unlink:NOT_LINKED", {
                    prefix: utils.guildData.prefix
                }, true);
            } else {
                userData = utils.usersData[0].wot;
            }
        }

        if(!userData) return;
        let stats = await client.Wargamer.getPlayerStats({ realm: userData.realm, ID: userData.ID }, true, true);
        let tanks = stats.tanks;
        let ended = false;

        let embed = new Discord.MessageEmbed()
            .setColor(stats.wn8.color)
            .setFooter(utils.embed.footer, stats.realmData.iconURL)
            .setAuthor(stats.nickname, client.user.displayAvatarURL())
            .setDescription(message.translate("stats/tanks:CHOOSE_TIER"));
        
        let msg = await m.edit(null, { embed });
        let rCollector = msg.createReactionCollector((reaction, user) => user.id === message.author.id, { time: 60000 });
        
        asyncForEach(client.config.emojis.numbers, async (emoji) => {
            let emojiData = Discord.Util.parseEmoji(emoji);
            if(!ended) await msg.react(`${emojiData.name}:${emojiData.id}`);
        });

        rCollector.on("end", (data, reason) => {
            ended = true;
            msg.reactions.removeAll();
            if(reason !== "OK"){
                embed.setTitle("").setDescription(message.translate("stats/tanks:TIMEOUT"));
                msg.edit(null, { embed });
            }
        });

        rCollector.on("collect", async (reaction) => {

            let users = await reaction.users.fetch();
            if(!users.get(client.user.id)) return;
            
            rCollector.stop("OK");

            var tier = reaction._emoji.name.substr(4, reaction._emoji.name.length);
            var toDisplay = tanks.filter(t => t.tier === parseInt(tier, 10)).sort( (a, b) => b.mark_of_mastery - a.mark_of_mastery);
            if(toDisplay.length < 1){
                embed.setDescription(message.translate("stats/tanks:NO_TANKS", {
                    tier
                }));
            } else {
                toDisplay.forEach(tank => {
                    var title = (tank.is_premium ? client.config.emojis.star+" "+tank.short_name : tank.short_name);
                    embed.addField(title,
                        message.translate("stats/tanks:HEADER_BATTLES")+tank.statistics.battles+"\n"+
                        message.translate("stats/tanks:HEADER_MARK")+tank.mark_of_mastery+"\n"+
                        message.translate("stats/tanks:HEADER_NATION")+tank.nation,
                        true
                    );
                });
                embed.setDescription("");
            }
            msg.edit(null, { embed });
        });
    }

};
