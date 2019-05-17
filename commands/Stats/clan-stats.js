const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class ClanStats extends Command {

    constructor (client) {
        super(client, {
            name: "clan-stats",
            description: (language) => language.get("CLANSTATS_DESCRIPTION"),
            usage: "clan-stats (@member/clan-name)",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            examples: "$clan-stats\n$clan-stats @ThibaudFvrx\n$clan-stats Zira",
            adminOnly: false
        });
    }

    async run (message, args, utils) {
        
        var client = this.client;

        message.channel.send(message.language.get("PLEASE_WAIT")).then(async m => {

            var clanID;

            if(message.mentions.users.first()){
                var data = utils.usersData[1];
                if(data.wot === 'unknow'){
                    return m.edit(message.language.get("NOT_LINKED_USER", message.mentions.users.first()));
                } else {
                    var clanData = await client.functions.getClan(data.wot.account_id, client).catch(err => {
                        return m.edit(message.language.get("NO_CLAN_USER", message.mentions.users.first().tag));
                    });
                    clanID = clanData.clan_id;
                }
            } else if(args[0]){
                // Search all clans
                var clanData = await client.functions.searchClan(args.join(' '), client).catch(err => {
                    return m.edit(message.language.get("CLAN_NOT_FOUND", args.join(' ')));
                });
                clanID = clanData.clan_id;
            } else if(!args[0]) {
                var data = utils.usersData[0];
                if(data.wot === 'unknow'){
                    return m.edit(message.language.get("NOT_LINKED", utils.guildData.prefix));
                } else {
                    clanData = await client.functions.getClan(data.wot.account_id, client).catch(err => {
                        return m.edit(message.language.get("NO_CLAN"));
                    });
                    clanID = clanData.clan_id;
                }
            };

            if(clanID){
                // Gets the stats of the clan
                var clanStats = await client.functions.getClanStats(clanID, client);
                var clanWN8 = await client.functions.getClanWN8(clanID, clanStats.tag);

                console.log(clanStats);

                var embed = new Discord.RichEmbed()
                    .setColor(clanWN8.color)
                    .setFooter(utils.embed.footer)
                    .setAuthor(clanStats.name, clanStats.emblems.x195.portal)
                    .addField(message.language.get("CLANSTATS_HEADERS")[0], "["+clanStats.name+"](https://eu.wargaming.net/clans/wot/"+clanID+"/)\n\n"+message.language.get("CLANSTATS_TITLES")[0], true)

                var ranks = {
                    "10":"X",
                    "8":"VIII",
                    "6":"VI"
                }

                for(var rank in ranks){
                    var title = message.language.get("CLANSTATS_RANKS")[ranks[rank]];
                    var newTitle = ((rank === Object.keys(ranks)[Object.keys(ranks).length - 1]) ? ('\n\n'+message.language.get("CLANSTATS_TITLES")[1]) : '');
                    embed.addField(title,
                        message.language.get("CLANSTATS_FIELDS")[0][0]+
                        ((clanStats.skirmish_statistics["last_time_"+rank] === 0) ? message.language.get("NO_RECENT_BATTLE") : message.language.printDate(new Date(clanStats.skirmish_statistics["last_time_"+rank]*1000)))+"\n"+
                        message.language.get("CLANSTATS_FIELDS")[0][1]+
                        (clanStats.skirmish_statistics["total_"+rank]+" ("+clanStats.skirmish_statistics["win_"+rank]+" "+message.language.get("WINS")+")")+"\n"+
                        message.language.get("CLANSTATS_FIELDS")[0][2]+
                        (clanStats.skirmish_statistics["total_"+rank+"_in_28d"]+" ("+clanStats.skirmish_statistics["win_"+rank+"_in_28d"]+" "+message.language.get("WINS")+")")+"\n"+
                        message.language.get("CLANSTATS_FIELDS")[0][3]+
                        ((clanStats.skirmish_statistics["win_"+rank] === 0) ? '0%' : client.functions.percentage(clanStats.skirmish_statistics["win_"+rank], clanStats.skirmish_statistics["lose_"+rank]))+"\n"+
                        message.language.get("CLANSTATS_FIELDS")[0][4]+
                        ((clanStats.skirmish_statistics["win_"+rank+"_in_28d"] === 0) ? '0%' : client.functions.percentage(clanStats.skirmish_statistics["win_"+rank+"_in_28d"], clanStats.skirmish_statistics["total_"+rank+"_in_28d"]-clanStats.skirmish_statistics["win_"+rank+"_in_28d"]))+newTitle
                    )
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
                    ((clanStats.battles_for_strongholds_statistics.win_10 === 0) ? '0%' : client.functions.percentage(clanStats.battles_for_strongholds_statistics.win_10, clanStats.battles_for_strongholds_statistics.lose_10))+"\n"+
                    message.language.get("CLANSTATS_FIELDS")[1][6]+
                    ((clanStats.battles_for_strongholds_statistics.win_10_in_28d === 0) ? '0%' : client.functions.percentage(clanStats.battles_for_strongholds_statistics.win_10_in_28d, clanStats.battles_for_strongholds_statistics.total_10_in_28d-clanStats.battles_for_strongholds_statistics.win_10_in_28d))+"\n\n"+message.language.get("CLANSTATS_TITLES")[2]
                )   

                embed.addField(clanWN8.now, "\u200B");

                if(clanStats.motto) embed.setDescription(clanStats.motto);

                m.edit(message.language.get("CLANSTATS_SUCCESS", clanStats.name), embed);
            }
            
        });
    }

}

module.exports = ClanStats;