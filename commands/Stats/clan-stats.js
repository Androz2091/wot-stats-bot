const Command = require("../../structures/Command.js"),
Discord = require("discord.js");

class ClanStats extends Command {

    constructor (client) {
        super(client, {
            // The name of the command
            name: "clan-stats",
            // Displayed in the help command
            description: (language) => language.get("CLANSTATS_DESCRIPTION"),
            usage: (language) => language.get("CLANSTATS_USAGE"),
            examples: (languages) => languages.get("CLANSTATS_EXAMPLES"),
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

        let m = await message.channel.send(message.language.get("PLEASE_WAIT"));

        let clanData;

        if(message.mentions.users.first()){
            if(utils.usersData[1].wot === "unknow"){
                return m.edit(message.language.get("NOT_LINKED_USER", message.mentions.users.first()));
            } else {
                let userStats = await client.Wargamer.getPlayerStats({ realm: utils.userData[1].wot.realm, ID: utils.userData[1].wot.ID }, false);
                if(!userStats.clan_id){
                    return m.edit(message.language.get("NO_CLAN_USER", message.mentions.users.first().tag));
                }
                clanData = { realm: utils.usersData[1].wot.realm, ID: userStats.clan_id };
            }
        } else if(args[0]){
            let realm = client.realms.find((r) => r.name === args[0].toLowerCase() || r.aliases.includes(args[0].toLowerCase()));
            if(!realm) return m.edit(message.language.get("LINK_BAD_REALM", args[0]));
            if(!args[1]) return m.edit(message.language.get("VALID_CLAN"));
            clanData = await client.Wargamer.findClan({ search: args.slice(1).join(" "), realm: args[0].toLowerCase() }).catch((err) => {
                return m.edit(message.language.get("CLAN_NOT_FOUND", args.slice(1).join(" ")));
            });
        } else if(!args[0]){
            if(utils.usersData[0].wot === "unknow"){
                return m.edit(message.language.get("NOT_LINKED", utils.guildData.prefix));
            } else {
                let userStats = await client.Wargamer.getPlayerStats({ realm: utils.usersData[0].wot.realm, ID: utils.usersData[0].wot.ID }, false);
                if(!userStats.clan_id){
                    return m.edit(message.language.get("NO_CLAN_USER", message.mentions.users.first().tag));
                }
                clanData = { realm: utils.usersData[0].wot.realm, ID: userStats.clan_id };
            }
        }

        if(!clanData) return;
        // Gets the stats of the clan
        let clanStats = await client.Wargamer.getClanStats({ realm: clanData.realm, ID: clanData.ID });

        let embed = new Discord.MessageEmbed()
            .setColor(clanStats.wn8.color)
            .setFooter(utils.embed.footer, clanStats.realmData.iconURL)
            .setAuthor(clanStats.name, clanStats.emblems.x195.portal)
            .addField(message.language.get("CLANSTATS_HEADERS")[0], "["+clanStats.name+"](https://eu.wargaming.net/clans/wot/"+clanData.clan_id+"/)\n\n"+message.language.get("CLANSTATS_TITLES")[0], true);

        let ranks = { "10":"X", "8":"VIII", "6":"VI" }

        for(let rank in ranks){
            if ({}.hasOwnProperty.call(ranks, rank)) {
                let title = message.language.get("CLANSTATS_RANKS")[ranks[rank]];
                let newTitle = ((rank === Object.keys(ranks)[Object.keys(ranks).length - 1]) ? ("\n\n"+message.language.get("CLANSTATS_TITLES")[1]) : "");
                embed.addField(title,
                    message.language.get("CLANSTATS_FIELDS")[0][0]+
                    ((clanStats.skirmish_statistics["last_time_"+rank] === 0) ? message.language.get("NO_RECENT_BATTLE") : message.language.printDate(new Date(clanStats.skirmish_statistics["last_time_"+rank]*1000)))+"\n"+
                    message.language.get("CLANSTATS_FIELDS")[0][1]+
                    (clanStats.skirmish_statistics["total_"+rank]+" ("+clanStats.skirmish_statistics["win_"+rank]+" "+message.language.get("WINS")+")")+"\n"+
                    message.language.get("CLANSTATS_FIELDS")[0][2]+
                    (clanStats.skirmish_statistics["total_"+rank+"_in_28d"]+" ("+clanStats.skirmish_statistics["win_"+rank+"_in_28d"]+" "+message.language.get("WINS")+")")+"\n"+
                    message.language.get("CLANSTATS_FIELDS")[0][3]+
                    ((clanStats.skirmish_statistics["win_"+rank] === 0) ? "0%" : client.functions.percentage(clanStats.skirmish_statistics["win_"+rank], clanStats.skirmish_statistics["lose_"+rank]))+"\n"+
                    message.language.get("CLANSTATS_FIELDS")[0][4]+
                    ((clanStats.skirmish_statistics["win_"+rank+"_in_28d"] === 0) ? "0%" : client.functions.percentage(clanStats.skirmish_statistics["win_"+rank+"_in_28d"], clanStats.skirmish_statistics["total_"+rank+"_in_28d"]-clanStats.skirmish_statistics["win_"+rank+"_in_28d"]))+newTitle
                );
            }
        }

        embed.addField(message.language.get("CLANSTATS_HEADERS")[1],
            message.language.get("CLANSTATS_FIELDS")[1][0]+
            (clanStats.stronghold_buildings_level)+"\n"+
            message.language.get("CLANSTATS_FIELDS")[1][1]+
            (clanStats.stronghold_level)+"\n"+
            message.language.get("CLANSTATS_FIELDS")[1][2]+
            ((clanStats.battles_for_strongholds_statistics.last_time_10 === 0) ? message.language.get("NO_RECENT_BATTLE") : message.language.printDate(new Date(clanStats.battles_for_strongholds_statistics.last_time_10*1000)))+"\n"+
            message.language.get("CLANSTATS_FIELDS")[1][3]+
            (clanStats.battles_for_strongholds_statistics.total_10)+"\n"+
            message.language.get("CLANSTATS_FIELDS")[1][4]+
            (clanStats.battles_for_strongholds_statistics.total_10_in_28d)+"\n"+
            message.language.get("CLANSTATS_FIELDS")[1][5]+
            ((clanStats.battles_for_strongholds_statistics.win_10 === 0) ? "0%" : client.functions.percentage(clanStats.battles_for_strongholds_statistics.win_10, clanStats.battles_for_strongholds_statistics.lose_10))+"\n"+
            message.language.get("CLANSTATS_FIELDS")[1][6]+
            ((clanStats.battles_for_strongholds_statistics.win_10_in_28d === 0) ? "0%" : client.functions.percentage(clanStats.battles_for_strongholds_statistics.win_10_in_28d, clanStats.battles_for_strongholds_statistics.total_10_in_28d-clanStats.battles_for_strongholds_statistics.win_10_in_28d))+"\n\n"+message.language.get("CLANSTATS_TITLES")[2]
        );

        embed.addField(clanStats.wn8.now, "\u200B");

        if(clanStats.motto){
            embed.setDescription(clanStats.motto);
        }

        m.edit(message.language.get("CLANSTATS_SUCCESS", clanStats.name), embed);
    }

};

module.exports = ClanStats;