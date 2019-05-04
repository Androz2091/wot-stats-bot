const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Stats extends Command {

    constructor (client) {
        super(client, {
            name: "stats",
            description: (language) => language.get("STATS_DESCRIPTION"),
            usage: "stats (@member/wot-nickname)",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: ["profil"],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            examples: "$stats\n$stats @ThibaudFvrx\n$stats ThibaudFvrx",
            owner: false
        });
    }

    async run (message, args, utils) {
        
        var client = this.client;

        message.channel.send(message.language.get("PLEASE_WAIT")).then(async m => {

            var ID;

            if(message.mentions.users.first()){
                var data = utils.usersData[1];
                if(data.wot === 'unknow'){
                    return m.edit(message.language.get("NOT_LINKED_USER", message.mentions.users.first()));
                } else {
                    ID = data.wot.account_id;
                }
            } else if(args[0]){
                // Search all accounts
                var account = await client.functions.searchAccount(args[0], client).catch(err => {
                    m.edit(message.language.get("ACCOUNT_NOT_FOUND", args[0]));
                });
                ID = account.account_id;
            } else if(!args[0]) {
                var data = utils.usersData[0];
                if(data.wot === 'unknow'){
                    return m.edit(message.language.get("NOT_LINKED", utils.guildData.prefix));
                } else {
                    ID = data.wot.account_id;
                }
            };

            // Gets the stats of the user
            var stats = await client.functions.getStats(ID, client).catch(err => {
                return message.channel.send(message.language.get("ERROR"));
            });

            var embed = new Discord.RichEmbed()
                .setColor(stats.wn8.color)
                .setFooter(utils.embed.footer)
                .setAuthor(stats.nickname, client.user.displayAvatarURL)
                .addField(message.language.get("STATS_HEADERS")[0], "["+stats.nickname+"](https://fr.wot-life.com/eu/player/"+stats.nickname+"-"+ID+")", true)
                .addField(message.language.get("STATS_HEADERS")[1], stats.statistics.all.battles, true)
                .addField(message.language.get("STATS_HEADERS")[2], stats.statistics.all.wins, true)
                .addField(message.language.get("STATS_HEADERS")[3], stats.statistics.all.losses, true)
                .addField(message.language.get("STATS_HEADERS")[4], stats.statistics.all.draws, true)
                .addField(message.language.get("STATS_HEADERS")[5], stats.statistics.all.survived_battles, true)
                .addField(message.language.get("STATS_HEADERS")[6], client.functions.percentage(stats.statistics.all.survived_battles, (stats.statistics.all.battles - stats.statistics.all.survived_battles)), true)
                .addField(message.language.get("STATS_HEADERS")[7], client.functions.percentage(stats.statistics.all.wins, stats.statistics.all.losses), true)
                .addField(message.language.get("STATS_HEADERS")[8], stats.wn8.now, true)
                .addField(message.language.get("STATS_HEADERS")[9],
                    message.language.get("STATS_FIELDS").total[0]+stats.statistics.all.damage_received+"\n"+
                    message.language.get("STATS_FIELDS").total[1]+stats.statistics.all.damage_dealt+"\n"+
                    message.language.get("STATS_FIELDS").total[2]+stats.statistics.all.frags+"\n"+
                    message.language.get("STATS_FIELDS").total[3]+stats.statistics.all.shots,
                    true
                )
                .addField(message.language.get("STATS_HEADERS")[10],
                    message.language.get("STATS_FIELDS").max[0]+stats.statistics.all.max_frags+"\n"+
                    message.language.get("STATS_FIELDS").max[1]+stats.statistics.all.max_damage,
                    true
                )
                .addField(message.language.get("STATS_HEADERS")[11],
                    message.language.get("STATS_FIELDS").wn8[0]+stats.wn8["24h"]+"\n"+
                    message.language.get("STATS_FIELDS").wn8[1]+stats.wn8["7d"]+"\n"+
                    message.language.get("STATS_FIELDS").wn8[2]+stats.wn8["30d"],
                    true
                );

            m.edit(message.language.get("STATS_SUCCESS", stats.nickname), embed);
        });
    }

}

module.exports = Stats;