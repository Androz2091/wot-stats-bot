const Command = require("../../structures/Command.js"),
Discord = require("discord.js");

class Stats extends Command {

    constructor (client) {
        super(client, {
            // The name of the command
            name: "stats",
            // Displayed in the help command
            description: (language) => language.get("STATS_DESCRIPTION"),
            usage: (language) => language.get("STATS_USAGE"),
            examples: (languages) => languages.get("STATS_EXAMPLES"),
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
        
        var client = this.client;

        message.channel.send(message.language.get("PLEASE_WAIT")).then(async (m) => {

            var ID;

            if(message.mentions.users.first()){
                if(utils.usersData[1].wot === "unknow"){
                    return m.edit(message.language.get("NOT_LINKED_USER", message.mentions.users.first()));
                } else {
                    ID = utils.usersData[1].wot.account_id;
                }
            } else if(args[0]){
                // Search all accounts
                var account = await client.functions.searchAccount(args[0], client).catch((err) => {
                    return m.edit(message.language.get("ACCOUNT_NOT_FOUND", args[0]));
                });
                ID = account.account_id;
            } else if(!args[0]) {
                if(utils.usersData[0].wot === "unknow"){
                    return m.edit(message.language.get("NOT_LINKED", utils.guildData.prefix));
                } else {
                    ID = utils.usersData[0].wot.account_id;
                }
            }

            // Gets the stats of the user
            var stats = await client.functions.getStats(ID, client).catch((err) => {
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
                .addField(message.language.get("STATS_HEADERS")[6], client.functions.percentage(stats.statistics.all.survived_battles, stats.statistics.all.battles), true)
                .addField(message.language.get("STATS_HEADERS")[7], client.functions.percentage(stats.statistics.all.wins, stats.statistics.all.battles), true)
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