const Command = require("../../structures/Command.js"),
Discord = require("discord.js");

module.exports = class extends Command {

    constructor (client) {
        super(client, {
            // The name of the command
            name: "stats",
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
                search: args[0]
            }, true);
            if(!args[1]) return m.error("stats/profile:MISSING_NICKNAME", null, true);
            userData = await client.Wargamer.findPlayer({
                search: args.slice(1).join(" "),
                realm: args[0].toLowerCase()
            }).catch((_err) => {
                return m.error("account/link:ACCOUNT_NOT_FOUND", {
                    search: args.slice(1).join(" ")
                }, true);
            });
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
        let stats = await client.Wargamer.getPlayerStats({
            realm: userData.realm,
            ID: userData.ID
        }, true, false);
            
        let embed = new Discord.MessageEmbed()
            .setColor(stats.wn8.color)
            .setFooter(utils.embed.footer, stats.realmData.iconURL)
            .setAuthor(stats.nickname, client.user.displayAvatarURL())
            .addField(message.translate("stats/profile:HEADER_NICKNAME"), "["+stats.nickname+"](https://fr.wot-life.com/eu/player/"+stats.nickname+"-"+userData.ID+")", true)
            .addField(message.translate("stats/stats:HEADER_BATTLES"), stats.statistics.all.battles, true)
            .addField(message.translate("common:WINS"), stats.statistics.all.wins, true)
            .addField(message.translate("common:LOSSES"), stats.statistics.all.losses, true)
            .addField(message.translate("stats/stats:HEADER_EQUALITIES"), stats.statistics.all.draws, true)
            .addField(message.translate("stats/stats:HEADER_SURV_BATTLES"), stats.statistics.all.survived_battles, true)
            .addField(message.translate("stats/stats:HEADER_SURV_BATTLES_RATIO"), client.functions.percentage(stats.statistics.all.survived_battles, stats.statistics.all.battles), true)
            .addField(message.translate("stats/profile:HEADER_WIN_RATE"), client.functions.percentage(stats.statistics.all.wins, stats.statistics.all.battles), true)
            .addField(message.translate("stats/profile:HEADER_WN8"), stats.wn8.now, true)
            .addField(message.translate("common:TOTAL"),
                message.translate("stats/stats:FIELD_DAMAGE_R")+stats.statistics.all.damage_received+"\n"+
                message.translate("stats/stats:FIELD_DAMAGE_I")+stats.statistics.all.damage_dealt+"\n"+
                message.translate("stats/stats:FIELD_DESTROYED")+stats.statistics.all.frags+"\n"+
                message.translate("stats/stats:FIELD_SHOTS")+stats.statistics.all.shots,
                true
            )
            .addField(message.translate("stats/stats:HEADER_MAX_GAME"),
                message.translate("stats/stats:FIELD_DESTROYED")+stats.statistics.all.max_frags+"\n"+
                message.translate("stats/stats:FIELD_DAMAGE_I")+stats.statistics.all.max_damage,
                true
            )
            .addField(message.translate("stats/profile:HEADER_WN8_HISTORY"),
                message.translate("stats/stats:WN8_24")+stats.wn8["24h"]+"\n"+
                message.translate("stats/stats:WN8_7")+stats.wn8["7d"]+"\n"+
                message.translate("stats/stats:WN8_30")+stats.wn8["30d"],
                true
            );

        m.edit(message.translate("stats/stats:CONTENT", {
            nickname: stats.nickname
        }), embed);
    }

};
