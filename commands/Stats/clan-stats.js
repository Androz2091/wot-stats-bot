const Command = require("../../structures/Command.js"),
Discord = require("discord.js");

const dateAndTime = require("date-and-time");
const pattern = date.compile('MMM D YYYY');

module.exportds = class extends Command {

    constructor (client) {
        super(client, {
            // The name of the command
            name: "clan-stats",
            // The name of the command folder, to detect the category
            dirname: __dirname,
            // Whether the command is enabled
            enabled: true,
            // The command aliases
            aliases: [ "clanstats" ],
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

        let clanData;

        if(message.mentions.users.first()){
            if(utils.usersData[1].wot === "unknow"){
                return m.error("account/link:NOT_LINKED_USER", {
                    user: message.mentions.users.first().tag
                }, true);
            } else {
                let userStats = await client.Wargamer.getPlayerStats({
                    realm: utils.userData[1].wot.realm,
                    ID: utils.userData[1].wot.ID
                }, false);
                if(!userStats.clan_id){
                    return m.error("stats/clan-stats:NO_CLAN_USER", {
                        user: message.mentions.users.first().tag
                    }, true);
                }
                clanData = {
                    realm: utils.usersData[1].wot.realm,
                    ID: userStats.clan_id
                };
            }
        } else if(args[0]){
            let realm = client.realms.find((r) => r.name === args[0].toLowerCase() || r.aliases.includes(args[0].toLowerCase()));
            if(!realm) return m.error("account/link:INVALID_REALM", {
                realm: args[0]
            }, true);
            if(!args[1]) return m.error("stats/clan-stats:MISSING_CLAN", true);
            clanData = await client.Wargamer.findClan({ search: args.slice(1).join(" "), realm: args[0].toLowerCase() }).catch((_err) => {
                return m.error("stats/clan-stats:CLAN_NOT_FOUND", {
                    search: args.slice(1).join(" ")
                });
            });
        } else if(!args[0]){
            if(utils.usersData[0].wot === "unknow"){
                return m.error("account/unlink:NOT_LINKED", {
                    prefix: utils.guildData.prefix
                });
            } else {
                let userStats = await client.Wargamer.getPlayerStats({ realm: utils.usersData[0].wot.realm, ID: utils.usersData[0].wot.ID }, false);
                if(!userStats.clan_id){
                    return m.error("stats/clan-stats:NO_CLAN_USER", {
                        user: message.mentions.users.first().tag
                    });
                }
                clanData = {
                    realm: utils.usersData[0].wot.realm,
                    ID: userStats.clan_id
                };
            }
        }

        if(!clanData) return;
        // Gets the stats of the clan
        let clanStats = await client.Wargamer.getClanStats({
            realm: clanData.realm,
            ID: clanData.ID
        });

        let embed = new Discord.MessageEmbed()
            .setColor(clanStats.wn8.color)
            .setFooter(utils.embed.footer, clanStats.realmData.iconURL)
            .setAuthor(clanStats.name, clanStats.emblems.x195.portal)
            .addField(message.translate("common:NAME"),
                "["+clanStats.name+"](https://eu.wargaming.net/clans/wot/"+clanData.clan_id+"/)\n\n"+message.translate("stats/clan-stats:TITLE_SKIRMISH")
            , true);

        const ranks = {
            "10": "X",
            "8": "VIII",
            "6": "VI"
        };

        dateAndTime.locale(message.guild.language.substr(0, 2));

        for(let rank in ranks){
            if ({}.hasOwnProperty.call(ranks, rank)) {
                let title = message.translate("stats/clan-stats:RANK_"+ranks[ranks]);
                let newTitle = ((rank === Object.keys(ranks)[Object.keys(ranks).length - 1]) ? ("\n\n"+message.translate("stats/clan-stats:TITLE_BASTION")) : "");
                embed.addField(title,
                    message.translate("stats/clan-stats:LAST_BATTLE")+
                    ((clanStats.skirmish_statistics["last_time_"+rank] === 0) ? message.translate("stats/clan-stats:NO_RECENT_BATTLE") : dateAndTime.format(new Date(clanStats.skirmish_statistics["last_time_"+rank]*1000), pattern))+"\n"+
                    message.translate("stats/clan-stats:TOTAL_BATTLES")+
                    (clanStats.skirmish_statistics["total_"+rank]+" ("+clanStats.skirmish_statistics["win_"+rank]+" "+message.translate("common:WINS").toLowerCase()+")")+"\n"+
                    message.translate("stats/clan-stats:TOTAL_BATTLES_28")+
                    (clanStats.skirmish_statistics["total_"+rank+"_in_28d"]+" ("+clanStats.skirmish_statistics["win_"+rank+"_in_28d"]+" "+message.translate("common:WINS").toLowerCase()+")")+"\n"+
                    message.translate("stats/clan-stats:WIN_RATE")+
                    ((clanStats.skirmish_statistics["win_"+rank] === 0) ? "0%" : client.functions.percentage(clanStats.skirmish_statistics["win_"+rank], clanStats.skirmish_statistics["lose_"+rank]))+"\n"+
                    message.translate("stats/clan-stats:WIN_RATE_28")+
                    ((clanStats.skirmish_statistics["win_"+rank+"_in_28d"] === 0) ? "0%" : client.functions.percentage(clanStats.skirmish_statistics["win_"+rank+"_in_28d"], clanStats.skirmish_statistics["total_"+rank+"_in_28d"]-clanStats.skirmish_statistics["win_"+rank+"_in_28d"]))+newTitle
                );
            }
        }

        embed.addField(message.language.get("CLANSTATS_HEADERS")[1],
            message.translate("stats/clan-stats:BASTION_TOTAL_LEVEL")+
            (clanStats.stronghold_buildings_level)+"\n"+
            message.translate("stats/clan-stats:BASTION_LEVEL")+
            (clanStats.stronghold_level)+"\n"+
            message.translate("stats/clan-stats:LAST_BATTLE")+
            ((clanStats.battles_for_strongholds_statistics.last_time_10 === 0) ? message.translate("stats/clan-stats:NO_RECENT_BATTLE") : dateAndTime.format(new Date(clanStats.battles_for_strongholds_statistics.last_time_10*1000), pattern))+"\n"+
            message.translate("stats/clan-stats:TOTAL_BATTLES")+
            (clanStats.battles_for_strongholds_statistics.total_10)+"\n"+
            message.translate("stats/clan-stats:TOTAL_BATTLES_28")+
            (clanStats.battles_for_strongholds_statistics.total_10_in_28d)+"\n"+
            message.translate("stats/clan-stats:WIN_RATE")+
            ((clanStats.battles_for_strongholds_statistics.win_10 === 0) ? "0%" : client.functions.percentage(clanStats.battles_for_strongholds_statistics.win_10, clanStats.battles_for_strongholds_statistics.lose_10))+"\n"+
            message.translate("stats/clan-stats:WIN_RATE_28")+
            ((clanStats.battles_for_strongholds_statistics.win_10_in_28d === 0) ? "0%" : client.functions.percentage(clanStats.battles_for_strongholds_statistics.win_10_in_28d, clanStats.battles_for_strongholds_statistics.total_10_in_28d-clanStats.battles_for_strongholds_statistics.win_10_in_28d))+"\n\n"+message.language.get("CLANSTATS_TITLES")[2]
        );

        embed.addField(clanStats.wn8.now, "\u200B");

        if(clanStats.motto){
            embed.setDescription(clanStats.motto);
        }

        message.channel.send(message.translate("stats/clan-stats:CONTENT", {
            name: clanStats.name
        }), embed);
    }

};
